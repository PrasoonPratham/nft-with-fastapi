import os
import base64
from fastapi import FastAPI, Form, Request, UploadFile
from pydantic import BaseModel
from thirdweb import ThirdwebSdk, SdkOptions, MintArg
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware



load_dotenv()
PRIVATE_KEY = os.getenv("PRIVATE_KEY")

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Network
network = "https://rpc-mainnet.maticvigil.com/"
sdk = ThirdwebSdk(SdkOptions(), network)

# Private Key
sdk.set_private_key(PRIVATE_KEY)

nft_smart_contract_address = "0xD91A8C3Dd5fa4F829A009FCd9C1DDc8417DB78f9"
nft_module = sdk.get_nft_module(nft_smart_contract_address)

@app.post("/mint")
async def mint(
    address: str = Form(...), 
    name: str = Form(...), 
    description: str = Form(...), 
    image: UploadFile = Form(...),
    properties: dict = Form(...)
):
    nft_module.mint_to(
        address,
        MintArg(
            name=name,
            description=description,
            image=image.file.read(),
            properties=properties
        )
    )

    return "Minted!"

@app.get("/list")
def list_nfts():
    return nft_module.get_all()
