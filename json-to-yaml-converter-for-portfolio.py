#!/usr/bin/env python3

import json
import yaml

f = open("./src/books.json")
books = json.loads(f.read())

yaml_books = []

for i in range(1, 67):
    book = books[str(i)]
    book_data_being_copied = {
        "title": book["title"],
        "cover": book["coverImgFileName"],
        "cover_image_height": book["coverImgInfo"]["height"],
        "cover_image_widght": book["coverImgInfo"]["width"],
        "cover_image_ratio": book["coverImgInfo"]["heightDividedByWidth"],
        "goodreads_url": book["extLinks"]["GoodReads"],
        "amazon_url": book["extLinks"]["Amazon"],
        "indiebound_url": book["extLinks"].get("IndieBound", None),
        "library_url": book["extLinks"].get("Library", None),
        "pages": book["pages"],
    }
    yaml_books.append(book_data_being_copied)

for book in yaml_books:
    print(book)

with open("book_data.yaml", "w") as new_file:
  yaml.dump(yaml_books, new_file, default_flow_style=False)