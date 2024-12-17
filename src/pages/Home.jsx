import React, { useState } from "react";
import axios from "axios";
import TextInput from "../components/TextInput";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
import { addFavorite, getFavorites } from "../utils/localStorageUtils";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [reason, setReason] = useState("");

  const handleSearch = async () => {
    const response = await axios.get(
      `https://registry.npmjs.org/-/v1/search?text=${searchQuery}`
    );
    setPackages(response.data.objects.map((pkg) => pkg.package));
  };

  const handleAddFavorite = () => {
    if (!selectedPackage || !reason) {
      alert("Please select a package and provide a reason!");
      return;
    }

    const existingFavorites = getFavorites();
    if (existingFavorites.find((fav) => fav.packageName === selectedPackage)) {
      alert("Package already in favorites!");
      return;
    }

    addFavorite({ packageName: selectedPackage, reason });
    alert("Added to favorites!");
    setSelectedPackage("");
    setReason("");
  };

  return (
    <div className="p-4 m-16">
      <h1 className="text-2xl font-bold text-gray-600">Search NPM Packages</h1>
      <div className="flex">
        <TextInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search NPM packages..."
        />
        <Button text="Search" onClick={handleSearch} />
      </div>

      <div className="mt-4">
        <p className="text-lg font-semibold">Result</p>
        <div className="max-h-36 overflow-y-scroll  rounded border-2">
        {packages.map((pkg) => (
          <div className="ml-2" key={pkg.name}>
            <input
              type="radio"
              id={pkg.name}
              name="package"
              className="mr-1"
              value={pkg.name}
              checked={selectedPackage === pkg.name}
              onChange={(e) => setSelectedPackage(e.target.value)}
            />
            <label htmlFor={pkg.name}>{pkg.name}</label>
          </div>
        ))}
        </div>
      </div>

      <div className="mt-4">
        <TextArea
          value={reason}
          onChange={setReason}
          placeholder="Why is this your favorite?"
        />
      </div>
      <Button text="Add to Favorites" onClick={handleAddFavorite} />
    </div>
  );
};

export default Home;
