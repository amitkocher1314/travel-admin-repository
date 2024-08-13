import React, { useState, useEffect } from 'react';

const CreateListing = () => {
  //
  const [listing, setListing] = useState({
    placeName: '',
    propertyName: '',
    propertyType: '',
    pricePerNight: '',
    address: '',
    city: '',
    pinCode: '',
    imageUrls: '',
    category: ''
  });
  //show category fetched from database stored in categories page
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://travel-project-auth-e9607-default-rtdb.firebaseio.com/categories.json');
        const data = await response.json();
        if (data) {
          setCategories(Object.values(data));  //Object.values to convert data received in array 
        }
      } catch (error) {
        alert('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
 // name attribute is provided in input so extract name and value also when event happens  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setListing({
      ...listing,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://travel-project-auth-e9607-default-rtdb.firebaseio.com/listings.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listing),
      });

      if (!response.ok) {
        throw new Error('Failed to create listing');
      }

      setListing({
        placeName: '',
        propertyName: '',
        propertyType: '',
        pricePerNight: '',
        address: '',
        city: '',
        pinCode: '',
        imageUrls: '',
        category: ''
      });
    } catch (error) {
      alert('Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md h-full max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">Create Listing</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="placeName" className="text-gray-700 mb-2">Place Name</label>
            <input
              type="text"
              id='placeName'
              name="placeName"
              value={listing.placeName}
              onChange={handleInputChange}
              placeholder="Place name"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="propertyName" className="text-gray-700 mb-2">Property Name</label>
            <input
              type="text"
              name="propertyName"
              value={listing.propertyName}
              onChange={handleInputChange}
              placeholder="Property name (e.g., Hotel Victory Since 1979)"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="pricePerNight" className="text-gray-700 mb-2">Price Per Night</label>
            <input
              type="number"
              name="pricePerNight"
              value={listing.pricePerNight}
              onChange={handleInputChange}
              placeholder="Price per night"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="address" className="text-gray-700 mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={listing.address}
              onChange={handleInputChange}
              placeholder="Address"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="city" className="text-gray-700 mb-2">City</label>
            <input
              type="text"
              name="city"
              value={listing.city}
              onChange={handleInputChange}
              placeholder="City"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="pinCode" className="text-gray-700 mb-2">PIN Code</label>
            <input
              type="text"
              name="pinCode"
              value={listing.pinCode}
              onChange={handleInputChange}
              placeholder="PIN Code"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="imageUrls" className="text-gray-700 mb-2">Image URL</label>
            <input
              type="text"
              name="imageUrls"
              value={listing.imageUrls}
              onChange={handleInputChange}
              placeholder="Image URLs"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="category" className="text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={listing.category}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Create Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
