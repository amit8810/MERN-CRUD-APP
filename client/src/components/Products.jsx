import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom'

export default function Products(props) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/products`);

        if (!response.ok) {
          console.error(`HTTP error! Status: ${response.status}`);
          setError(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();
        console.log(jsonData);
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(`Error fetching data`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading.......</div>;
  }

  if (error) {
    return <div>Error : {error}</div>;
  }

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type' : 'application/json',
        },
      });

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
      } else {
        const updatedData = data.products.filter(product => product._id !== productId);
        setData({ products: updatedData});
      }
    
    } catch (error) {
      console.error('Error deleting data: ', error);  
    }
  }

  return (
    <div>
      {data.products.map((product) => (
        <div className="">
          <div key={product._id} className=" bg-yellow-500 border px-1 flex justify-between py-1">
           <h1 className="font-bold">{product.title}</h1>
           <div className="flex gap-3 ">
           <NavLink to={`/product/${product._id}`} className={`bg-green-500 rounded px-3 text-white font-semibold`}>More Details</NavLink>
           <button onClick={() => handleDelete(product._id)} className="bg-red-500 rounded px-3 text-white font-semibold">Delete</button>
           </div>
          </div>
        </div>
      ))}
    </div>
  );
}
