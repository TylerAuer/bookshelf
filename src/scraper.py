#!/usr/bin/python3
from bs4 import BeautifulSoup
import requests
import re

#############
# Custom Data
#############

# Should be hardcover where available

# Fire and Blood
bookUrl = "https://www.goodreads.com/book/show/39943621-fire-blood?ac=1&from_search=true&qid=h9pHLLo8VW&rank=1"

# Talking to Strangers
# bookUrl = "https://www.goodreads.com/book/show/43848929-talking-to-strangers?ac=1&from_search=true&qid=gWUQar3bfI&rank=2#"

# Three-Body Problem
# bookUrl = "https://www.goodreads.com/book/show/20518872-the-three-body-problem?from_search=true&from_srp=true&qid=69eZnTcpEu&rank=1"

# The Boy Who Loved Math
# bookUrl = "https://www.goodreads.com/book/show/16002003-the-boy-who-loved-math?ac=1&from_search=true&qid=NQi6MWr8KT&rank=1"

# list of lists with str:readers and int:ratings
readersAndRating = [["Tyler", 5]]
descAuth = "Tyler"
desc = ""  # Can include HTML tags like <b>Bold text</b>
amazonUrl = ""
seriesLength = ""

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
    title = child.find(class_="infoBoxRowTitle").text.strip()
    if title == "ISBN":
        # Makes list of child tags
        data = child.find(class_="infoBoxRowItem").contents
        isbn10 = data[0].strip()
        # Returns first group of 13 digits
        isbn13 = re.search('\d{13}', data[1].text).group(0)
    elif title == "Series":
        # Some books fall under multiple series. This only uses the first
        seriesStr = child.find("a").text
        indexIndex = seriesStr.find("#")
        seriesTitle = seriesStr[:indexIndex - 2]
        seriesIndex = seriesStr[indexIndex + 1:]


##########################
# Save Cover IMG to folder
##########################

# Cover IMG URL
# Download cover image
# Save to folder with useful name
# Reference in JSON output


##################
# Export JSON Data
##################

#########
# Testing
#########

print("title: %s" % title)
print("subtitle: %s" % subtitle)
print("authors: %s" % authors)
print("illustrators: %s" % illustrators)
print("translators: %s" % translators)
print("pages: %s" % pages)
print("pubYear: %s" % pubYear)
print("isbn10: %s" % isbn10)
print("isbn13: %s" % isbn13)
print("seriesTitle: %s" % seriesTitle)
print("seriesIndex: %s" % seriesIndex)
print("seriesLength: %s" % seriesLength)
