import string
from fastapi import APIRouter, HTTPException
from google.cloud import storage
from pydantic import BaseModel
import mimetypes
import re
import os
import base64
import io
import uuid

# TODO: download the "google-keys.json" file from the Google Drive folder and put it in the root of the ./server folder
#  Then uncomment this line
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./google-keys.json"

storage_client = storage.Client()
my_bucket = storage_client.get_bucket("images-ledgeit")

# endpoint recieves name and base64 encoded image
class Image_Data(BaseModel):
    name: str
    b64Img: str


router = APIRouter()

@router.post("/upload", response_description="Returns the URL of uploaded image")
async def upload(data: Image_Data):
    image = data.b64Img
    mimeType = re.findall("data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*|$", image)[0]
    file_name = data.name + mimetypes.guess_extension(mimeType)
    base64_encoded_image_string = re.sub("^data:image\/\w+;base64,", "", image)
    decoded_image = base64.b64decode(base64_encoded_image_string)
    file_to_upload = io.BytesIO(decoded_image)
    file = my_bucket.blob(file_name)

    try:
        file.upload_from_file(file_to_upload)
    except:
        return HTTPException(
            status_code="404", detail="AN ERROR OCCURRED WHILE UPLOADING"
        )

    return {"URL": f"https://storage.googleapis.com/images-ledgeit/{file_name}"}


async def upload_image(b64Image: string):
    image = b64Image
    mimeType = re.findall("data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*|$", image)[0]
    file_name = str(uuid.uuid4()) + mimetypes.guess_extension(mimeType)
    base64_encoded_image_string = re.sub("^data:image\/\w+;base64,", "", image)
    decoded_image = base64.b64decode(base64_encoded_image_string)
    file_to_upload = io.BytesIO(decoded_image)
    file = my_bucket.blob(file_name)

    try:
        file.upload_from_file(file_to_upload)
    except:
        raise ValueError('An error occurred while uploading')

    return f"https://storage.googleapis.com/images-ledgeit/{file_name}"

# TODO: Delete file
