import requests
from PIL import Image

from io import BytesIO
import base64
import json

print("=== Python Receipt OCR Demo  ===")

receiptOcrEndpoint = (
    "https://ocr.asprise.com/api/v1/receipt"  # Receipt OCR API endpoint
)

# imageFile = "receipt2.jpg" # // Modify this to use your own file if necessary

# For testing, convert the receipt.jpg into base64
with open("receipt.jpg", "rb") as f:
    im_b64_test = base64.b64encode(f.read())

# base64 string to PIL image
im_bytes = base64.b64decode(
    im_b64_test
)  # im_bytes is a binary image     #TODO: replace im_b64_test with data
im_file = BytesIO(im_bytes)  # convert image to file-like object
img = Image.open(im_file)  # img is now PIL Image object

# Convert PIL image to jpg
rgb_img = img.convert("RGB")
rgb_img.save("temp_scanned_imgs/temp.jpg")

imageFile = "temp_scanned_imgs/temp.jpg"


r = requests.post(
    receiptOcrEndpoint,
    data={
        "client_id": "TEST",  # Use 'TEST' for testing purpose \
        "recognizer": "auto",  # can be 'US', 'CA', 'JP', 'SG' or 'auto' \
        "ref_no": "ocr_python_123",  # optional caller provided ref code \
    },
    files={"file": open(imageFile, "rb")},
)

api_response = r.text
api_response = json.loads(api_response)

if api_response["success"]:
    expense_dict = {
        "name": api_response["receipts"][0]["merchant_name"],
        "date": api_response["receipts"][0]["date"],
        # "price": api_response["receipts"][0]["items"][0]["amount"],
        "price": api_response["receipts"][0]["total"],
        "description": api_response["receipts"][0]["items"][0]["description"],
        "currency": "CAD",
        "category": None,
    }
else:
    expense_dict = None

# print(api_response)
print(expense_dict)
