import React from "react";

const IndividualFeature = ({ image, name }) => {
  return (
    <div className="bg-[var(--sage)] w-45 p-3 h-55 flex flex-col items-center gap-4 rounded-2xl shadow-lg hover:shadow-2xl hover:bg-[var(--beige)] transition-colors duration-75">
      <img src={image} className="size-30 rounded-2xl" alt="" />
      <h6 className="bg-[var(--cream)] my-auto p-1 rounded-lg w-full text-center text-green-950">
        {name}
      </h6>
    </div>
  );
};

export default IndividualFeature;
