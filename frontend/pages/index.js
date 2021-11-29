import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { ConnectWallet } from "@3rdweb/react";
import { useWeb3 } from "@3rdweb/hooks";
import { useFormik } from 'formik';
import { useDropzone } from "react-dropzone";

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <strong class="font-bold">No Name!</strong>
    <span class="block sm:inline"> Gotta name your NFT c'mon</span>
    <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
      <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
    </span>
  </div>
  } else if (values.name.length > 100) {
    errors.name = "Must be 100 characters or less, it's name not your autobiography";
  }

  if (!values.description) {
    errors.description = <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <strong class="font-bold">No Description!</strong>
    <span class="block sm:inline"> No NFT!</span>
    <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
      <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
    </span>
  </div>
  } else if (values.description.length > 3000) {
    errors.description = "Must be 3000 characters or less, this isn't your school essay";
  }
  return errors;
};

export default function Home() {
  const { address } = useWeb3();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onDrop = useCallback(async (uploadedFiles) => {
    if (uploadedFiles.length === 0) {
      setError(true);
      return;
    }
    setError(false);
    setLoading(true);
    setFile(uploadedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop,
  });

  function handleUpload(values) {
    if (file === null) {
      setError(true);
      return;
    }

    const form = new FormData();
    form.append("address", address);
    form.append("name", values.name);
    form.append("description", values.description);
    form.append("image", file);

    axios.post('http://localhost:8000/mint', form).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validate,
    onSubmit: (values) => handleUpload(values)
  });

  return (
    <>
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
          <form className="mt-8 space-y-3" action="#" method="POST" onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold tracking-wide text-gray-500">
                Name of the NFT
              </label>
              {formik.errors.name && formik.touched.name ? <div>{formik.errors.name}</div> : null}
              <input
                className="p-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                type = "text"
                id = "name"
                name = "name"
                placeholder="My very cool NFT"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              <label className="text-sm font-bold tracking-wide text-gray-500">
                Description
              </label>
              {formik.errors.description && formik.touched.description  ? <div>{formik.errors.description}</div> : null}
              <input
                className="p-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                type="text"
                id = "description"
                name = "description"
                placeholder="Bored Ape"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
            </div>
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold tracking-wide text-gray-500">
                Attach Document
              </label>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
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
                      className="hidden"
                    />
                  </label>
                </div>
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
