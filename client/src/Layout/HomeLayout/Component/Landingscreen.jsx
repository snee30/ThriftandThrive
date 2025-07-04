import React from "react";
import { Link } from "react-router-dom"; // Import Link
import "../Styles/Landingscreen.css";
import mainImage from "../Images/main.png";

const Landingscreen = () => {
  return (
    <section className="main-home flex justify-around items-center">
      <div className="main-text p-20">
        <h3 className="font-second text-3xl">
          Support Sustainable Fashion<i className="bx bx-recycle"></i>
        </h3>
        <h2>most items under Rs.999/-</h2>
        <br />
        <p>Why pay full price when you can pay half and slay twice as hard?</p>
        <Link to="/products" className="main-btn">
          Thrift Now<i className="bx bx-right-arrow-alt"></i>
        </Link>
      </div>
      <div className="justify-self-end hidden md:inline-block">
        <img src={mainImage} alt="Sustainable Fashion" />
      </div>
    </section>
  );
};

export default Landingscreen;
