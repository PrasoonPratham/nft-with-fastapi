import os
from fastapi import FastAPI
from pydantic import BaseModel
from thirdweb import ThirdwebSdk, SdkOptions, MintArg
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
PRIVATE_KEY = os.getenv("PRIVATE_KEY")

class data(BaseModel):
    Addy: str = None
    Descrip: str = None
    Properties: dict = None

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
def mint(Addy: str, Name: str, Description: str, Image_uri: str, Properties: dict):
    with open(file=Image_uri, mode="rb") as image_file:
        content = image_file.read()
        nft_module.mint_to(
            Addy,
            MintArg(
                name=Name,
                description=Description,
                image=content,
                properties=Properties,
            ),
        )

    return "Minted!"

@app.get("/list")
def list_nfts():
    return nft_module.get_all()
