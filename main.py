import os
from fastapi import FastAPI
from pydantic import BaseModel
from thirdweb import ThirdwebSdk, SdkOptions, MintArg
from dotenv import load_dotenv
load_dotenv()

PRIVATE_KEY = os.getenv("PRIVATE_KEY")

class data(BaseModel):
    Addy: str = None
    Descrip: str = None
    Properties: dict = None

app = FastAPI()

# Network
network = "https://rpc-mainnet.maticvigil.com/"
sdk = ThirdwebSdk(SdkOptions(), network)

# Private Key
sdk.set_private_key(PRIVATE_KEY)

nft_smart_contract_address = "0xf27C2a1c44E6F16Fbcc9FBB582d7799057Dc57a6"
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

# print(nft_module.get_with_owner("0xfd5952cb761b55E0E80197587C420801AA0dCeAc"))
# # "0xfd5952cb761b55E0E80197587C420801AA0dCeAc"