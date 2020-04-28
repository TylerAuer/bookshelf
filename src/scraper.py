#!/usr/bin/python3

# import beautifulsoup4
from bs4 import BeautifulSoup
import requests

bookUrl = "https://www.goodreads.com/book/show/41104077"

page = requests.get(bookUrl)
soup = BeautifulSoup(page.content, 'html.parser')

# Need to split into title and subtitle and remove leading and trailing spaces
title = soup.find(id="bookTitle").text
