#!/usr/bin/python3
from bs4 import BeautifulSoup
import requests
import re
import json

#############
# Custom Data
#############

# Goodreads URL for the English hardcover version of the book where available
bookUrl = "https://www.goodreads.com/book/show/39943621-fire-blood"

# list of lists with str:readers and int:ratings
readersAndRating = [{"Tyler": 3}]
descAuthor = "Tyler"
# Can include HTML tags like <b> or <cite>
desc = "The first of two volumes (I'll believe it when I see it, George), Fire and Blood tells the story of the Targaryens from Aegon the Conqueror's landing in Westeros through the Dance of the Dragons up until Aegon III comes of age. <cite>Fire and Blood</cite> feels encyclopedic. The writing is terse and matter of fact, though Martin's clever prose sneak through. Really though, this book is just for fans in love with the World of Ice and Fire who crave more epic worldbuilding."
# Amazon doesn't use ISBN so can't generate automatically
amazonUrl = "https://www.amazon.com/Fire-Blood-Thrones-Targaryen-History/dp/152479628X"
seriesLength = "2"  # Can't scrape from Goodreads
bookID = 1

#######################
# Tags ################
#######################
# Uncomment to add tags
tags = []
# tags.append("Big Ideas")
# tags.append("Diverse Authors")
tags.append("Fantasy")
# tags.append("Fascinating")
# tags.append("Food and Drink")
# tags.append("Funny")
# tags.append("Games")
# tags.append("Graphic Novel")
# tags.append("Great Cover")
# tags.append("Historical Fiction")
# tags.append("History")
# tags.append("Left-leaning")
# tags.append("Literary Fiction")
tags.append("Loooooooong")
# tags.append("Memoir")
# tags.append("Must Listen")
# tags.append("Nonfiction")
# tags.append("Out at Sea")
# tags.append("Picture Book")
# tags.append("Politics and Economics")
# tags.append("Psychology")
# tags.append("Quirky")
# tags.append("Science")
# tags.append("Science Fiction")
tags.append("Series")
# tags.append("Short")
# tags.append("Short Stories")
# tags.append("Short Story")
# tags.append("Social Science")
# tags.append("Space")
# tags.append("Thriller")
# tags.append("Tyler's Fave")
# tags.append("Young Adult")

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

# TODO: Need to remove "," from list
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
# TODO: Switch to "covers" folder when ready to run for real
with open('./src/covers-test/' + imgName, 'wb') as handler:
    handler.write(img_data)

# Reference in JSON output


#############################
# Add JSON Data to Book Lists
#############################
# Generate new JSON to add


# Open data file
# TODO: Switch to "book-data.json" when ready to run for real
with open('./src/book-data-new.json', 'r+') as f:
    data = json.load(f)
    # Creates new ID number based on count of current books + 1
    bookID = str(1 + len(data))
    # Add new book to dict version of the JSON
    data[bookID] = {
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
    }
    # Go to the start of JSON file
    f.seek(0)
    # Dumps the data at the start of the JSON file
    json.dump(data, f, indent=4)
    # Removes any extra JSON after the dump.
    # Though this shouldn't be necessary, I've left it here as a reference
    # in case this approach is used in the future
    f.truncate()
