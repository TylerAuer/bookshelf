#!/usr/bin/python3
from bs4 import BeautifulSoup
import requests
import re

#############
# Custom Data
#############

# Should be hardcover where available
bookUrl = "https://www.goodreads.com/book/show/43848929-talking-to-strangers?ac=1&from_search=true&qid=gWUQar3bfI&rank=2"
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

# TODO: Split into title and subtitle
title = soup.find(id="bookTitle").text.strip()


# TODO: For loop for multiple authors
# TODO: Illustrators, which have (Illustrations) or (Illustrator) after name
authors = soup.find("a", class_="authorName").text.strip()

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
print(pubYear)


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
