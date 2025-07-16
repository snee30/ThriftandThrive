import React from "react";
import Landingscreen from "./Component/Landingscreen";
import Footer from "../../Components/Footer/Footer";
import Features from "./Component/Features";
import Products from "./Component/Products";

const HomeLayout = () => {
  return (
    <div className="">
      <Landingscreen />
      <Features />
      <Products />

      <Footer />
    </div>
  );
};

export default HomeLayout;
