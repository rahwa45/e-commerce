"use client"; // Enables client-side rendering in Next.js
import Link from "@node_modules/next/link";
import Image from "@node_modules/next/image";
import React, { useEffect, useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

const JewelryApp = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [material, setMaterial] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [cart, setCart] = useState([]); // Cart state to manage added products

  const clientId = "50v8Gu7mFS6HTQ3DQn4alaMkAxwoLkpvPI9tdY7mNow"; // Replace with your Unsplash API key

  const fetchImages = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=jewelry&client_id=${clientId}&count=20`
      );
      const data = await response.json();

      const enhancedData = data.map((image) => ({
        ...image,
        price: (Math.random() * 1000).toFixed(2),
        category: "Jewelry",
        description: image.alt_description || "No description available",
      }));

      let filtered = filterByMaterial(material, enhancedData);
      filtered = filterBySearch(searchQuery, filtered);
      filtered = sortImages(filtered, sortOrder);

      setImages(enhancedData);
      setFilteredImages(filtered);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [material, searchQuery, sortOrder]);

  const filterByMaterial = (material, images) => {
    if (!material) return images;
    return images.filter((image) =>
      image.alt_description?.toLowerCase().includes(material.toLowerCase())
    );
  };

  const filterBySearch = (searchQuery, images) => {
    if (!searchQuery) return images;
    return images.filter((image) =>
      image.alt_description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const sortImages = (images, sortOrder) => {
    return images.sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.created_at) - new Date(b.created_at)
        : new Date(b.created_at) - new Date(a.created_at)
    );
  };
  const handleAddToCart = (item) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    // Store cart in localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
    fetchImages(); // Fetch images after loading cart
  }, []);

  return (
    <div className="container mx-auto">
      {/* Search, Filter, and Sort Section */}
      <div className=" shadow-md flex flex-col sm:flex-row sm:justify-between items-center mb-8 space-y-4 sm:space-y-0 sm:space-x-6 bg-white  md:top-0 md:z-50 ">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          {/* Logo with Name */}
          <Link href="/" className="flex gap-2 flex-center">
            <p className="logo_text ">AMBAR</p>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto ">
          {/* Search Input */}
          <input
            type="text"
            className="p-3 border rounded-md w-full sm:w-80 search_input"
            placeholder="Search by description"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Material Filter */}
          <select
            className="p-3  w-full sm:w-auto"
            onChange={(e) => setMaterial(e.target.value)}
          >
            <option value="">All Materials</option>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
            <option value="diamond">Diamond</option>
          </select>
          <select
            className="p-3  w-full sm:w-auto"
            onChange={(e) => setMaterial(e.target.value)}
          >
            <option value="">Collections</option>
            <option value="gold">Necklece</option>
            <option value="silver">Braclete</option>
            <option value="diamond">Ring</option>
            <option value="diamond">Earring</option>
          </select>

          {/* Sort Option */}
          <select
            className="p-3  w-full sm:w-auto"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
        <div className="container mx-auto p-6">
          {/* Header with Cart Button */}
          <div className="flex justify-end items-center">
            {/* Go to Cart Button */}
            <Link
              href="/cart"
              className="bg-orange-400 px-2 py-1 rounded-md hover:bg-orange-300 transition flex items-center justify-center w-full sm:w-auto"
            >
              <ShoppingCartIcon className="w-5 h-5 mr-2" />
              {cart.length}
            </Link>
          </div>

          {/* Rest of your content */}
        </div>
      </div>

      {/* Title */}
      <div className="w-full flex-center flex-col mb-6">
        <h1 className="head_text text-center text-3xl sm:text-4xl lg:text-5xl">
          EXPLORE OUR
          <br />
          <span className="orange_gradient mt-8">LUXURY-JEWELRY</span>
        </h1>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className=" hover:shadow-lg rounded-lg overflow-hidden  transition duration-300"
          >
            {/* Image Section */}
            <img
              src={image.urls.small}
              className="w-full h-40 object-cover rounded-t-lg cursor-pointer"
              alt={image.alt_description}
            />

            {/* Product Details Section */}
            <div className="p-4">
              <p className="text-gray-800 text-lg font-semibold">
                <strong>Price:</strong> ${image.price}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Category:</strong> {image.category}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Description:</strong> {image.description}
              </p>
              {/* Add to Cart Button */}
              <button
                className="px-2 py-3"
                onClick={() => handleAddToCart(image)}
              >
                <ShoppingCartIcon className="w-5 h-5 mr-2" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Cart Navigation */}
      {/* Cart Navigation */}
      <div className="mt-8 text-center">
        <Link
          href="/cart"
          className="bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-300 transition"
        >
          Go to Cart ({cart.length} items)
        </Link>
      </div>
    </div>
  );
};

export default JewelryApp;
