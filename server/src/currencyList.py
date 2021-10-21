# Dependencies:
# Need to run python3 -m pip install requests 
import requests
import json

# Setup URL string

# EFFECT: Returns the list of currencies in the form of an array
def currency_list():
    API_KEY = "b248938740450b2e6e0616db"

    URL = "https://v6.exchangerate-api.com/v6/" + API_KEY + "/latest/CAD"
    # print(URL)

    # Send GET request to URL link
    response = requests.get(URL)
    output = response.json()
    # print(output)

    # Parsing the json
    currencies = output["conversion_rates"]
    currNames = []
    for currName, value in currencies.items():
        currNames.append(currName)

    return currNames

# EFFECT: Returns whether the string is a currency or not

def is_Currency(inputString):
    API_KEY = "b248938740450b2e6e0616db"

    URL = "https://v6.exchangerate-api.com/v6/" + API_KEY + "/latest/CAD"
    # print(URL)

    # Send GET request to URL link
    response = requests.get(URL)
    output = response.json()
    # print(output)

    # Parsing the json
    currencies = output["conversion_rates"]
    currencyNames = []
    for currName, value in currencies.items():
        currencyNames.append(currName)

    if inputString in currencyNames:
        return True
    else: 
        return False

    

