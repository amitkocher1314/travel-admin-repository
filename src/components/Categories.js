import React, { useState, useEffect } from 'react';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');

    useEffect(() => {
        // Fetch categories from Firebase when the component mounts
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://travel-project-auth-e9607-default-rtdb.firebaseio.com/categories.json');
                const data = await response.json();
                if (data) {
                    setCategories(Object.values(data));
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleAddCategory = async () => {
        if (newCategory.trim() !== '') {
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

                const data = await response.json();
                setCategories([...categories, newCategory]);
                setNewCategory('');
            } catch (error) {
                alert('Error adding category:', error);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">Manage Categories</h2>
                <div className="flex space-x-3 mb-6">
                    <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Add new category"
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
                            {category}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Categories;
