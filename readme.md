
# Image Search

## Description

User stories:
- I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
- I can paginate through the responses by adding a ?offset=2 parameter to the URL.
- I can get a list of the most recently submitted search strings.

Example usage:

    # search something
    https://fcp-image-search.herokuapp.com/search/sea%20sun
    # example output: https://raw.githubusercontent.com/bcolucci/fcp-image-search/master/example-search.json

    # add an offset for a search
    https://fcp-image-search.herokuapp.com/search/sea%20sun?offset=150
    # will add the offset attribute to the response

    # retrieve most recent searches (top 100)
    https://fcp-image-search.herokuapp.com/recently
    # example output: https://raw.githubusercontent.com/bcolucci/fcp-image-search/master/example-recently.json

    # retrieve top searches (top 100)
    https://fcp-image-search.herokuapp.com/topsearches
    # example output: https://raw.githubusercontent.com/bcolucci/fcp-image-search/master/example-top.json


## How to test

    git clone https://github.com/bcolucci/fcp-image-search.git \
      && npm install \
      && npm start \
      && xdg-open http://localhost:3210/search/sea%20sun?offset=10
