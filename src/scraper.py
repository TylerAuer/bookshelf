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
# bookUrl = "https://www.goodreads.com/book/show/20518872-the-three-body-problem?from_search=true&from_srp=true&qid=69eZnTcpEu&rank=1"

# The Boy Who Loved Math
bookUrl = "https://www.goodreads.com/book/show/16002003-the-boy-who-loved-math?ac=1&from_search=true&qid=NQi6MWr8KT&rank=1"

readersAndRating = [["Tyler", 5]]  # list of lists with reader and rating
desc = ""  # Can include HTML tags like <b>Bold text</b>
descAuth = "Tyler"

##############################
# Collect relavent information
##############################
page = requests.get(bookUrl)
soup = BeautifulSoup(page.content, 'html.parser')
# .strip() removes leading + trailing whitespaces
# slicing (ex: [:-6] ) removes unneeded words like "pages"

# Splits title into title and subtitle
titleAndSubtitleList = soup.find(id="bookTitle").text.strip().split(":")
title = titleAndSubtitleList[0]
if len(titleAndSubtitleList) > 1:
    subtitle = titleAndSubtitleList[1][1:]

# TODO: For loop for multiple authors
# TODO: Illustrators, which have (Illustrations) or (Illustrator) after name
authorsList = soup.find_all("div", class_="authorName__container")
authors = []
illustrators = []
translators = []
for author in authorsList:
    # Finds "(" and subtracts 1 for space
    sliceIndex = author.text.strip().find("(") - 1
    if sliceIndex < 0:
        sliceIndex = len(author.text.strip())
    if "Translator" in author.text:
        translators.append(author.text.strip()[:sliceIndex])
    elif "Illustrator" in author.text or "Illustrations" in author.text:
        illustrators.append(author.text.strip()[:sliceIndex])
    else:
        authors.append(author.text.strip()[:sliceIndex])

print(authors)
print(illustrators)
print(translators)

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
