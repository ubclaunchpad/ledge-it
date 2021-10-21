# Dependencies:
# Need to run python3 -m pip install requests 
import requests
import json
from currencyList import is_Currency

# EFFECT: Returns the exchange rate when given 2 currencies

API_KEY = "b248938740450b2e6e0616db"

# Request input

while True:
    try:
        curr_from = input("Enter foreign currency: ") # Eg: USD
        # print(curr_from)
        if (is_Currency(curr_from) == False):
            raise Exception
        break
    except Exception:
        print("Not a valid currency. Please try again...")

while True:
    try:
        amount = int(input("Enter the amount to convert: "))
        # print(amount)
        break
    except ValueError:
        print("Not a valid number. Please try again...")

while True:
    try:
        curr_to = input("Enter base currency: ") # Eg: CAD
        # print(curr_to)
        if (is_Currency(curr_to) == False):
            raise Exception
        break
    except Exception:
        print("Not a valid currency. Please try again...")

# Concatenate URL string
URL = "https://v6.exchangerate-api.com/v6/"+ API_KEY+ "/pair/"
URL = URL + curr_from + "/" + curr_to + "/" + str(amount)
print(URL)

# Send GET request to URL link
response = requests.get(URL)
output = response.json()
# print(output)

# Parsing the json
print("Today's Exchange rate from " + curr_from + " to " + curr_to + ": " + str(output["conversion_rate"]))
print("Amount converted to: " + str(output["conversion_result"])+ " " + curr_to)