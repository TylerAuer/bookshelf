#!/usr/bin/python3
from bs4 import BeautifulSoup
import requests
import re

#############
# Custom Data
#############

# Should be hardcover where available

# Fire and Blood
# bookUrl = "https://www.goodreads.com/book/show/39943621-fire-blood?ac=1&from_search=true&qid=h9pHLLo8VW&rank=1"

# Talking to Strangers
# bookUrl = "https://www.goodreads.com/book/show/43848929-talking-to-strangers?ac=1&from_search=true&qid=gWUQar3bfI&rank=2#"

# Three-Body Problem
bookUrl = "https://www.goodreads.com/book/show/20518872-the-three-body-problem?from_search=true&from_srp=true&qid=69eZnTcpEu&rank=1"

# The Boy Who Loved Math
# bookUrl = "https://www.goodreads.com/book/show/16002003-the-boy-who-loved-math?ac=1&from_search=true&qid=NQi6MWr8KT&rank=1"

readersAndRating = [["Tyler", 5]]  # list of lists with reader and rating
desc = ""  # Can include HTML tags like <b>Bold text</b>
descAuth = "Tyler"

##############################
# Collect relavent information
##############################
page = requests.get(bookUrl)
soup = BeautifulSoup(page.content, 'html.parser')

# Splits title into title and subtitle
titleAndSubtitleList = soup.find(id="bookTitle").text.strip().split(":")
title = titleAndSubtitleList[0]
if len(titleAndSubtitleList) > 1:
    subtitle = titleAndSubtitleList[1][1:]

# TODO: Need to remove "," from list
# Parses authors into authors, illustrators, and translators
authorsList = soup.find_all("div", class_="authorName__container")
authors = []
illustrators = []
translators = []
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

#
# Details Section - <div> with lots of info: publisher, pages, ISBNs, Awards
#
detailsSection = soup.find(id="details")

# pages in book
pages = detailsSection.find("span", itemprop="numberOfPages").text.strip()[:-6]

# First pub year
pubHTML = detailsSection.contents[3]
pubYearList = re.findall('\d{4}', str(pubHTML))
pubYear = int(min(pubYearList))


# ISBNs
# Cover IMG URL
# Series Title
# Series Index
# Series Length
# All blank JSON values

##########################
# Save Cover IMG to folder
##########################

# Download cover image
# Save to folder with useful name
# Reference in JSON output


##################
# Export JSON Data
##################
