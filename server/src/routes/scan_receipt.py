import requests
import os

from google.cloud import storage
from fastapi import APIRouter,status
from fastapi.responses import JSONResponse

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./google-keys.json"

router = APIRouter()

@router.get(
    "/scan_receipt", response_description="Returns the Receipt content encoded in JSON"
)
async def scan_receipt(data:str):
    storage_client = storage.Client()
    bucket_name = storage_client.get_bucket("images-ledgeit")  # GCS bucket
    receiptOcrEndpoint = (
        "https://ocr.asprise.com/api/v1/receipt"  # Receipt OCR API endpoint
    )

    # TODO: replace with url received (data) after upload function called from image_to_s3.py
    file_name = "receipt.jpg"

    destination_file_name = "receipt.jpg"  # downloaded imageFile
    blob = bucket_name.blob(file_name)
    # blob.download_to_filename(destination_file_name)

    r = requests.post(
        receiptOcrEndpoint,
        data={
            "client_id": "TEST",  # Use 'TEST' for testing purpose \
            "recognizer": "auto",  # can be 'US', 'CA', 'JP', 'SG' or 'auto' \
            "ref_no": "ocr_python_123",  # optional caller provided ref code \
        },
        files={"file": open(destination_file_name, "rb")},
    )

    # print(r.text)  
    # result in JSON
    return JSONResponse(
            status_code=status.HTTP_200_OK,
            content=r.text,
        )
