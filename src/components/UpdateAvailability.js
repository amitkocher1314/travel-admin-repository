import React, { useState, useEffect } from 'react';

const UpdateAvailability = () => {
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
        alert('Failed to fetch listings:', error);
      }
    };

    fetchListings();
  }, []);
 // 2nd argument is true and false passed from onClick and first one is unique key we assign to each on fetched data 
  const handleUpdateAvailability = async (listingId, available) => {
    try {
      const response = await fetch(`https://travel-project-auth-e9607-default-rtdb.firebaseio.com/listings/${listingId}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          available,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update listing');
      }
    //to show instant change on screen
      const updatedListings = listings.map(listing =>
        listing.id === listingId ? { ...listing, available } : listing
      );
      setListings(updatedListings);
    } catch (error) {
      alert('Failed to update listing:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Update Availability</h2>
      <ul className="space-y-4">
        {listings.map(listing => (
          <li key={listing.id} className="p-6 bg-white rounded-lg shadow-md flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-semibold">{listing.placeName}</h3>
                <p className={`text-sm ${listing.available ? 'text-green-600' : 'text-red-600'}`}> 
                   {/* listing.available is stored in true and false format in database */}
                  {listing.available ? 'Available' : 'Currently Not Available'}
                </p>
                <p className="text-sm text-gray-700">Category: {listing.category}</p>
                <p className="text-sm text-gray-700">Price per Night: ${listing.pricePerNight}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleUpdateAvailability(listing.id, true)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
                >
                  Yes
                </button>
                <button
                  onClick={() => handleUpdateAvailability(listing.id, false)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                >
                  No
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpdateAvailability;
