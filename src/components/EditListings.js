import React, { useState, useEffect } from 'react';

const EditListings = () => {
    const [listings, setListings] = useState([]); //variable store data already stored in database
    const [editingListing, setEditingListing] = useState(null);  //for conditional purpose i.e when click on edit only particular id data shown

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await fetch('https://travel-project-auth-e9607-default-rtdb.firebaseio.com/listings.json');
                const data = await response.json();
                //Object.keys to get all key of object in database and then with every data we add unique key we fetch this is done when want to edit and delete particular data 
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
    
   //now if editListing not null we see edit page 
    const handleEditClick = (listing) => {
        setEditingListing(listing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingListing({
            ...editingListing,
            [name]: value
        });
    };

    const handleUpdateListing = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://travel-project-auth-e9607-default-rtdb.firebaseio.com/listings/${editingListing.id}.json`, {
                method: 'PATCH',   //we use patch instead of put when want to update part of source 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editingListing),
            });

            if (!response.ok) {
                throw new Error('Failed to update listing');
            }
           //this is done to show update on screen although data is fetched but for fast change we do this
            const updatedListings = listings.map(listing =>
                listing.id === editingListing.id ? editingListing : listing
            );
            setListings(updatedListings);
            setEditingListing(null);
        } catch (error) {
           alert('Failed to update listing:', error);
        }
    };

    const handleDeleteListing = async (id) => {
        try {
            const response = await fetch(`https://travel-project-auth-e9607-default-rtdb.firebaseio.com/listings/${id}.json`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete listing');
            }

            const updatedListings = listings.filter(listing => listing.id !== id);
            setListings(updatedListings);
        } catch (error) {
            alert('Failed to delete listing:', error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            {editingListing ? (
                <form onSubmit={handleUpdateListing} className="bg-white p-6 rounded-lg shadow-md space-y-4">
                    <input
                        type="text"
                        name="placeName"
                        value={editingListing.placeName}
                        onChange={handleInputChange}
                        placeholder="Place name"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        name="propertyName"
                        value={editingListing.propertyName}
                        onChange={handleInputChange}
                        placeholder="Property name"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="number"
                        name="pricePerNight"
                        value={editingListing.pricePerNight}
                        onChange={handleInputChange}
                        placeholder="Price per night"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        name="address"
                        value={editingListing.address}
                        onChange={handleInputChange}
                        placeholder="Address"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        name="city"
                        value={editingListing.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        name="pinCode"
                        value={editingListing.pinCode}
                        onChange={handleInputChange}
                        placeholder="PIN Code"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        name="category"
                        value={editingListing.category}
                        onChange={handleInputChange}
                        placeholder="Category"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                    <div className="flex flex-col">
                        <label htmlFor="imageUrls" className="text-gray-700 mb-2">Image URLs (comma separated)</label>
                        <input
                            type="text"
                            name="imageUrls"
                            value={editingListing.imageUrls}
                            onChange={handleInputChange}
                            placeholder="Image URLs"
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">Update Listing</button>
                        <button type="button" onClick={() => setEditingListing(null)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200">Cancel</button>
                    </div>
                </form>
            ) : (
                <ul className="space-y-4">
                    {listings.map(listing => (
                        <li key={listing.id} className="p-6 bg-white rounded-lg shadow-md flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-semibold">{listing.placeName}</h3>
                                <p className="text-sm">Price per night: ${listing.pricePerNight}</p>
                            </div>
                            <div className="flex space-x-4">
                                <button onClick={() => handleEditClick(listing)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">Edit</button>
                                <button onClick={() => handleDeleteListing(listing.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EditListings;
