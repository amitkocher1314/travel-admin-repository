import React, { useState, useEffect } from 'react';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryImage, setNewCategoryImage] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://travel-project-auth-e9607-default-rtdb.firebaseio.com/categories.json');
                const data = await response.json();
                if (data) {
                    setCategories(Object.values(data));
                }
            } catch (error) {
                alert('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleAddCategory = async () => {
        //checking input not empty and removing whitespace
        if (newCategoryName.trim() !== '' && newCategoryImage.trim() !== '') {
           //storing in variable in object format to save like this in database 
            const newCategory = {
                name: newCategoryName,
                imageUrl: newCategoryImage
            }
           

            try {
                const response = await fetch('https://travel-project-auth-e9607-default-rtdb.firebaseio.com/categories.json', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newCategory),
                });

                if (!response.ok) {
                    throw new Error('Failed to add category');
                }

                setCategories([...categories, newCategory]);
                setNewCategoryName('');
                setNewCategoryImage('');
            } catch (error) {
                alert('Error adding category:', error);
            }
        }
        else{
            alert("please add input correctly")
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">Add Categories</h2>
                <div className="flex flex-col space-y-3 mb-6">
                    <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="Category name"
                        className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="text"
                        value={newCategoryImage}
                        onChange={(e) => setNewCategoryImage(e.target.value)}
                        placeholder="Category image URL"
                        className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        
                        
                    />
                    <button
                        onClick={handleAddCategory}
                        className="py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Add
                    </button>
                </div>
                <ul className="space-y-3">
                    {categories.map((category, index) => (
                        <li key={index} className="p-3 border border-gray-300 rounded-lg bg-gray-50">
                            {category.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Categories;
