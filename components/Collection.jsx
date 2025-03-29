import React from "react";
import JewelryApp from "./JewelryApp";
import { useState, useEffect } from "react";

const Collection = () => {
  const [image, setImages] = useState([]);
  const [material, setMaterial] = useState("");
  const [filteredImages, setFilteredImages] = useState([]);
  const filterByMaterial = (material, images) => {
    if (!material) return images;
    return images.filter((image) =>
      image.alt_description?.toLowerCase().includes(material.toLowerCase())
    );
  };

  return <div></div>;
};

export default Collection;
