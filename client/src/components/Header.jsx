import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <nav className="bg-[#424874] flex justify-between items-center px-10 py-2">
        <NavLink to="/" className={`font-poppins text-white tracking-wide`}>
          Home
        </NavLink>
        <p className="font-poppins font-semibold text-xl text-white">CRUD APP</p>

        <NavLink
          to="/add-product"
          className={`text-yellow-500 font-poppins font-semibold rounded-full border-yellow-500 border-2 px-3 py-1 hover:text-white hover:bg-yellow-500 duration-200`}
        >
          ADD PRODUCT
        </NavLink>
      </nav>
    </div>
  );
}
