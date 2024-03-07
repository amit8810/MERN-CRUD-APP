import React, { useState } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function SingleProduct() {
  const params = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editable, setEditable] = useState(false);

  const form = useForm();
  const {register, handleSubmit} = form;

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/products/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      
      if(!response.ok) {
        const errorData = await response.json();
        console.error("Error response from server", errorData);
      } else {
        console.log("Data successfully updated", data);
        setEditable(false)
        const jsonData = await response.json();
        setData(jsonData);
      }
    } catch (error) {
      console.error("Error updating data ", error)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/products/${params.id}`
        );

        if (!response.ok) {
          console.error(`HTTP error! Status: ${response.status}`);
          setError(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();
        console.log(jsonData);
        setData(jsonData);
      } catch (error) {
        console.error("Error Fetching Data", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading......</div>;
  }
  if (error) {
    return <div>Error : {error} </div>;
  }

  

  return (
    <>
      <Header />
      {/* product */}
      <div>
        <div className="flex justify-center items-center mt-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="border border-black rounded px-5 py-5 flex flex-col">
              <img
                src={data.product.thumbnailUrl}
                alt="product-Image"
                className="w-[400px] border rounded p-2"
              />
              {editable ? (
                <input
                  placeholder={data.product.title}
                  className="mt-5 outline-none border px-2"
                  {...register("title")}
                />
              ) : (
                <p className="font-poppins font-bold mt-5">
                  {data.product.title}
                </p>
              )}

              {editable ? (
                <input
                  placeholder={data.product.description}
                  className=" mt-2 outline-none border px-2"
                  {...register("description")}
                />
              ) : (
                <p className="">{data.product.description}</p>
              )}

              {editable ? (
                <input
                  placeholder={data.product.price}
                  className=" mt-2 outline-none border px-2"
                  {...register("price")}
                />
              ) : (
                <p>
                  Price: <span className="font-bold">{data.product.price}</span>
                  $
                </p>
              )}

              {editable ? (
                <input
                  type="submit"
                  className="bg-green-500 rounded mt-2 py-1 text-white font-bold cursor-pointer "
                />
              ) : (
                <button
                  onClick={() => setEditable(true)}
                  className="mt-2 px-3 bg-yellow-600 text-center rounded text-white py-1 font-bold  tracking-wide"
                >
                  Edit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
