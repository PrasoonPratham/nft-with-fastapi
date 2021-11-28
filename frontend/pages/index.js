import axios from "axios";
import { ConnectWallet } from "@3rdweb/react";

export const getData = async () => {
  const data = await axios.get("http://localhost:8000/list");
  console.log(data);
};

export const Connect = () => {
  return <ConnectWallet />;
};

export default function Home() {
  return (
    <>
      {/* component */}
      <div
        className="relative flex items-center justify-center min-h-screen px-4 py-12 bg-no-repeat bg-cover bg-gray-50 sm:px-6 lg:px-8"
        style={{
          backgroundImage: "url(bg.png)",
        }}
      >
        <div className="absolute inset-0 z-0 bg-black opacity-60 " />
        <div className="z-10 w-full p-10 bg-white sm:max-w-lg rounded-xl">
          <div className="text-center">
            <h2 className="mt-5 text-3xl font-bold text-gray-900">
              NFT Giveaway!
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              by Pratham Prasoon made with Thirdweb
            </p>
          </div>

          <button className="w-full mt-5">
            <ConnectWallet>Connect Metamask</ConnectWallet> 
          </button>

          <form className="mt-8 space-y-3" action="#" method="POST">
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold tracking-wide text-gray-500">
                Name of the NFT
              </label>
              <input
                className="p-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                type
                placeholder="My Super Cool NFT"
              />
              <label className="text-sm font-bold tracking-wide text-gray-500">
                Description
              </label>
              <input
                className="p-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                type
                placeholder="Bored ape"
              />
            </div>
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold tracking-wide text-gray-500">
                Attach Document
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full p-10 text-center border-4 border-dashed rounded-lg h-60 group">
                  <div className="flex flex-col items-center justify-center w-full h-full text-center ">
                    {/*-<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>*/}
                    <div className="flex flex-auto w-2/5 mx-auto -mt-10 max-h-48">
                      <img
                        className="object-center has-mask h-36"
                        src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                        alt="freepik image"
                      />
                    </div>
                    <p className="text-gray-500 pointer-none ">
                      <a href id className="text-blue-600 hover:underline">
                        Select a file
                      </a>{" "}
                      from your computer
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg, image/gif, image/jpg"
                  />
                </label>
              </div>
            </div>
            <p className="text-sm text-gray-300">
              <span>File type: jpg,jpeg and other common types of images</span>
            </p>
            <div>
              <button
                type="submit"
                className="flex justify-center w-full px-4 py-3 font-semibold text-white transition-transform transform bg-blue-600 rounded-md shadow-lg outline-none focus:ring-4 active:scale-x-75"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                <span className="ml-2">Mint it!</span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <style />
    </>
  );
}
