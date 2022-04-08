import os
import requests
from PIL import Image
from io import BytesIO
import base64
import json

from fastapi import APIRouter

from ..models import Expense

router = APIRouter()


@router.get(
    "/scan_expense_receipt",
    response_description="Returns the Receipt content encoded in JSON",
)
async def scan_expense_receipt(data: str):

    receiptOcrEndpoint = (
        "https://ocr.asprise.com/api/v1/receipt"  # Receipt OCR API endpoint
    )

    # base64 string to PIL image
    im_bytes = base64.b64decode(data)  # im_bytes is a binary image
    im_file = BytesIO(im_bytes)  # convert image to file-like object
    img = Image.open(im_file)  # img is now PIL Image object

    # Convert PIL image to jpg
    rgb_img = img.convert("RGB")
    rgb_img.save(os.path.dirname(__file__) + "/temp_scanned_imgs/temp.jpg")

    destination_file_name = os.path.dirname(__file__) + "/temp_scanned_imgs/temp.jpg"

    r = requests.post(
        receiptOcrEndpoint,
        data={
            "client_id": "TEST",  # Use 'TEST' for testing purpose \
            "recognizer": "auto",  # can be 'US', 'CA', 'JP', 'SG' or 'auto' \
            "ref_no": "ocr_python_123",  # optional caller provided ref code \
        },
        files={"file": open(destination_file_name, "rb")},
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
            "exchange_rate": 1.00,
            "category": "Other",
        }
        model_to_return = Expense(**expense_dict)
    else:
        model_to_return = api_response

    return model_to_return
