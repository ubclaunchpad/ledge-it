# FastAPI Server

This folder will be home to all Python code for the FastAPI server.
Checkout the instructions below to get started.

### Setup

##### Python
Make sure you have `python 3.6+` installed on your device. You can verify this by running the command `python3 --version`
which should give you the version of `python` you have installed. If you do not have python installed please follow the
instructions [here](https://www.python.org/downloads/).

#### FastAPI

`pip install "fastapi[all]"` to install FastAPI and all its dependencies and features

### Development

All the primary code should be in the `/src` folder.

#### Code style
WIP

### Running the app

`uvicorn main:app --reload` to launch the server on `http://127.0.0.1:8000`.

Visit `http://127.0.0.1:8000/docs` for interactive API docs.

Can also view alternative API docs at `http://127.0.0.1:8000/redoc`.

### Contributing

We'd love to have you make some contributions to this project whether that be adding some cool new features, fixing
some bugs, or just giving us some suggestions. All positive contributions are welcome!