from bs4 import BeautifulSoup
import requests
import re
import json
from PIL import Image

#############
# Custom Data
#############

# Goodreads URL. Must have:
# ... most popular cover
# ... ISBN numbers!
bookUrl = ""

# list of lists with str:readers and int:ratings
readersAndRating = {"Tyler": 5}
descAuthor = "Tyler"
# Can include HTML tags like <b> or <cite>
desc = ""
# Amazon doesn't use ISBN so can't generate automatically
amazonUrl = ""
seriesLength = None  # Use string ("4") or None if not series

#########
# Tags
#########
# Uncomment to add tags
tags = []
# tags.append("Adventure")
# tags.append("Back in my day")
# tags.append("Big Ideas")
# tags.append("Fantasy")
# tags.append("Fascinating")
# tags.append("Food and Drink")
# tags.append("Funny")
# tags.append("Games")
# tags.append("Graphic Novel")
# tags.append("Historical Fiction")
# tags.append("It's all in your head")
# tags.append("Judge this book by it's great cover")
# tags.append("Left-leaning")
# tags.append("Literary Fiction")
# tags.append("Looooong")
# tags.append("Memoir")
# tags.append("Mystery")
# tags.append("Must Listen")
# tags.append("Nonfiction")
# tags.append("Out at Sea")
# tags.append("Picture Book")
# tags.append("Politics and Economics")
# tags.append("Puzzle")
# tags.append("Quirky")
# tags.append("Science")
# tags.append("Series")
# tags.append("Short")
# tags.append("Short Stories")
# tags.append("Space")
# tags.append("Thriller")
# tags.append("Young Adult")
# tags.append("Where we're going we don't need roads")

####################
# Variables for JSON
####################
title = ""
subtitle = ""
authors = []
illustrators = []
translators = []
pages = None
pubYear = None
isbn10 = ""
isbn13 = ""
seriesTitle = ""
seriesIndex = ""

##############################
# Collect relavent information
##############################
page = requests.get(bookUrl)
soup = BeautifulSoup(page.content, 'html.parser')
# Contains pub year and pub date
detailsSection = soup.find(id="details")
# Contains description list of title, ISBNs, editions, characters, awards...
descListSection = detailsSection.find(class_="buttons")

# Splits title into title and subtitle
titleAndSubtitleList = soup.find(id="bookTitle").text.strip().split(":")
title = titleAndSubtitleList[0]
if len(titleAndSubtitleList) > 1:
    subtitle = titleAndSubtitleList[1][1:]

# Parses authors into authors, illustrators, and translators
authorsList = soup.find_all("div", class_="authorName__container")
for author in authorsList:
    author = author.text.strip()

    # Finds "(" and subtracts 1 for space
    sliceIndex = author.find("(") - 1
    if sliceIndex < 0:
        # Move index to end if no "("
        sliceIndex = len(author)
    # removes trailing comma
    if author[sliceIndex - 1] == ",":
        sliceIndex -= 1

    # Sorts contributors into author, illustrator, and translator lists
    if "Translator" in author:
        translators.append(author[:sliceIndex])
    elif "Illustrator" in author or "Illustrations" in author:
        illustrators.append(author[:sliceIndex])
    else:
        authors.append(author[:sliceIndex])


# Pages in book
pages = detailsSection.find("span", itemprop="numberOfPages").text.strip()[:-6]

# First pub year
pubHTML = detailsSection.contents[3]
pubYearList = re.findall('\d{4}', str(pubHTML))
pubYear = int(min(pubYearList))

# ISBNs, and series info
descListRows = descListSection.find_all(class_="clearFloats")
for child in descListRows:
    titleDiv = child.find(class_="infoBoxRowTitle").text.strip()
    if titleDiv == "ISBN":
        # Makes list of child tags
        data = child.find(class_="infoBoxRowItem").contents
        isbn10 = data[0].strip()
        # Returns first group of 13 digits
        isbn13 = re.search('\d{13}', data[1].text).group(0)
    elif titleDiv == "Series":
        # Some books fall under multiple series. This only uses the first
        seriesStr = child.find("a").text
        indexIndex = seriesStr.find("#")
        seriesTitle = seriesStr[:indexIndex - 1]
        seriesIndex = seriesStr[indexIndex + 1:]


##########################
# Save Cover IMG to folder
##########################

# Cover IMG URL
imgUrl = soup.find(id="coverImage")['src']

# Save to covers folder
img_data = requests.get(imgUrl).content
imgName = authors[0].split(" ")[-1] + "-" + title.replace(" ", "-") + ".jpg"
with open('./src/covers/' + imgName, 'wb') as handler:
    handler.write(img_data)

# Get the height and width of the image
coverImage = Image.open('./src/covers/' + imgName)
width, height = coverImage.size
heightDividedByWidth = height / width
coverImgInfo = {
    "width": width,
    "height": height,
    "heightDividedByWidth": heightDividedByWidth
}

#############################
# Add JSON Data to Book Lists
#############################
# Generate new JSON to add


# Open data file
with open('./src/books.json', 'r+') as file:
    data = json.load(file)
    # Creates new ID number based on count of current books + 1
    bookID = 1 + len(data)
    # Add new book to dict version of the JSON
    data[bookID] = {
        "id": bookID,
        "title": title,
        "subtitle": subtitle,
        "seriesTitle": seriesTitle,
        "seriesIndex": seriesIndex,
        "seriesLength": seriesLength,
        "authors": authors,
        "illustrators": illustrators,
        "translators": translators,
        "pages": pages,
        "pubYear": pubYear,
        "isbn10": isbn10,
        "isbn13": isbn13,
        "extLinks": {
            "Amazon": amazonUrl,
            "GoodReads": bookUrl,
            "IndieBound": "https://www.indiebound.org/book/" + isbn13,
            "AbeBooks": "https://www.abebooks.com/servlet/SearchResults?sts=t&cm_sp=SearchF-_-home-_-Results&kn=&an=&tn=&isbn=" + isbn13,
            "Library": "https://www.worldcat.org/search?q=" + isbn13,
        },
        "coverImgFileName": imgName,
        "desc": desc,
        "descAuthor": descAuthor,
        "ratings": readersAndRating,
        "tags": tags,
        "coverImgInfo": coverImgInfo
    }
    # Go to the start of JSON file
    file.seek(0)
    # Dumps the data at the start of the JSON file
    json.dump(data, file, indent=4)
    # Removes any extra JSON after the dump.
    # Though this shouldn't be necessary, I've left it here as a reference
    # in case this approach is used in the future
    file.truncate()
