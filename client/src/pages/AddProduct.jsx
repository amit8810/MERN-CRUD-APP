import React from "react";
import { ImHome } from "react-icons/im";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function AddProduct() {
  const form = useForm();
  const { register, handleSubmit, reset } = form;

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/products/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response from server:", errorData);
      } else {
        console.log("Data successfully submitted:", data);
      }

      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div className="bg-yellow-500 px-10 py-3 flex items-center gap-1">
        <ImHome />
        <NavLink to="/" className={`font-bold tracking-wide`}>
          {" "}
          Home
        </NavLink>
      </div>
      <h2 className="mt-10 text-center font-poppins font-bold tracking-wider">
        Add Product details Here
      </h2>
      <div className="flex justify-center items-center">
        <div className="p-4 border-2 border-black rounded">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label class="block">
              <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Title
              </span>
              <input
                type="text"
                {...register("title")}
                class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="enter product title"
              />
            </label>
            <label class="block mt-2">
              <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Description
              </span>
              <input
                type="text"
                {...register("description")}
                class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="enter product description"
              />
            </label>
            <label class="block mt-2">
              <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Price
              </span>
              <input
                type="Number"
                {...register("price")}
                class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="enter product price"
              />
            </label>
            <label class="block mt-2">
              <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Product thumbnail URL
              </span>
              <input
                type="text"
                {...register("thumbnailUrl")}
                class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="enter image url"
              />
            </label>
            <div className="flex items-center justify-center mt-4">
              <button
                type="submit"
                className="bg-yellow-500 rounded px-3 py-1 hover:bg-green-500 hover:text-white duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
