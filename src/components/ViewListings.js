import React, { useState, useEffect } from 'react';

const ViewListings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // Fetch listings from the database
    const fetchListings = async () => {
      try {
        const response = await fetch('https://travel-project-auth-e9607-default-rtdb.firebaseio.com/listings.json');
        const data = await response.json();
        const listingsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setListings(listingsArray);
      } catch (error) {
        console.error('Failed to fetch listings:', error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">View Listings</h2>
      {listings.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map(listing => (
            <li key={listing.id} className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-2">{listing.placeName}</h3>
              <p className="text-gray-700 mb-2">Price per night: <span className="font-medium">${listing.pricePerNight}</span></p>
              <p className="text-gray-700 mb-2">Address: <span className="font-medium">{listing.address}, {listing.city}, {listing.pinCode}</span></p>
              <p className="text-gray-700 mb-2">Category: <span className="font-medium">{listing.category}</span></p>
              <p className="text-gray-700 mb-2">Description: <span className="font-medium">{listing.description}</span></p>
              <p className="text-gray-700 mb-2">Availability: <span className={`font-medium ${listing.available ? 'text-green-600' : 'text-red-600'}`}>{listing.available ? 'Available' : 'Not Available'}</span></p>
              <p className="text-gray-700 mb-2">Total Price: <span className="font-medium">${listing.totalPrice}</span></p>
              <div className="grid grid-cols-3 gap-2">
                {listing.images && listing.images.map((image, index) => (
                  <img key={index} src={image} alt={listing.placeName} className="w-full h-32 object-cover rounded-md" />
                ))}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-700">No listings available</p>
      )}
    </div>
  );
};

export default ViewListings;
