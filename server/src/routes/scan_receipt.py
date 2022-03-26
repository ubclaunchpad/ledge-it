import requests
import os

from fastapi import APIRouter,status
from fastapi.responses import JSONResponse

#TODO: get base 64 image string from frontend
# TODO:  return expense or income string
#TODO:remove gcp stuff
#TODO: decide if it is income or backend

router = APIRouter()

@router.get(
    "/scan_receipt", response_description="Returns the Receipt content encoded in JSON"
)
async def scan_receipt(data:str):
    receiptOcrEndpoint = (
        "https://ocr.asprise.com/api/v1/receipt"  # Receipt OCR API endpoint
    )

    # TODO: Convert base64 to jpg here
    file_name = "receipt.jpg"
    destination_file_name = "receipt.jpg"  # downloaded imageFile
    
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
