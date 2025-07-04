import React from "react";
import IndividualFeature from "./IndividualFeature";
import { FeatureData } from "./Data/FeatureData";

const Features = () => {
  return (
    <div className="w-full bg-[var(--cream)] p-5 flex gap-5 flex-wrap items-center justify-around">
      {FeatureData.map((feature, index) => (
        <IndividualFeature
          key={index}
          image={feature.image}
          name={feature.name}
        />
      ))}
    </div>
  );
};

export default Features;
