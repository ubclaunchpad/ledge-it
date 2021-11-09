import requests

API_KEY = "b248938740450b2e6e0616db"
BASE_URL = "https://v6.exchangerate-api.com/v6/" + API_KEY


def get_exchange_rate_to_cad(iso_code: str) -> float:
    try:
        URL = BASE_URL + f"/pair/{iso_code}/CAD"
        response = requests.get(URL)
        return response.json()["conversion_rate"]
    except Exception as e:
        return -1
