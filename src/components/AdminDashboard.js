import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Categories from './Categories';
import CreateListing from './CreateListing';
import EditListings from './EditListings';
import UpdateAvailability from './UpdateAvailability';
import ViewListings from './ViewListings';
import BookingManagement from './BookingManagement';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

const AdminDashboard = () => {
  const history = useHistory();
  const [activeComponent, setActiveComponent] = useState('Welcome');

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      history.push('/');
    }
  }, [history]);

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    history.push('/');
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Categories':
        return <Categories />;
      case 'CreateListing':
        return <CreateListing />;
      case 'EditListings':
        return <EditListings />;
      case 'UpdateAvailability':
        return <UpdateAvailability />;
      case 'ViewListings':
        return <ViewListings />;
      case 'BookingManagement':
        return <BookingManagement />;
      default:
        return <h2>Welcome to Admin Dashboard</h2>;
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-800 text-white p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
          <button onClick={handleSignOut} className="text-white flex items-center space-x-2">
            <i className="fas fa-sign-out-alt"></i> {/* Font Awesome Sign-Out Icon */}
          </button>
        </div>
        <ul className="space-y-4">
          <li>
            <button onClick={() => setActiveComponent('Welcome')} className="w-full text-left">
              Welcome
            </button>
          </li>
          <li>
            <button onClick={() => setActiveComponent('Categories')} className="w-full text-left">
              Categories
            </button>
          </li>
          <li>
            <button onClick={() => setActiveComponent('CreateListing')} className="w-full text-left">
              Create Listing
            </button>
          </li>
          <li>
            <button onClick={() => setActiveComponent('EditListings')} className="w-full text-left">
              Edit Listings and Categories
            </button>
          </li>
          <li>
            <button onClick={() => setActiveComponent('UpdateAvailability')} className="w-full text-left">
              Update Availability and Description
            </button>
          </li>
          <li>
            <button onClick={() => setActiveComponent('ViewListings')} className="w-full text-left">
              View Listings
            </button>
          </li>
          <li>
            <button onClick={() => setActiveComponent('BookingManagement')} className="w-full text-left">
              Booking Management
            </button>
          </li>
        </ul>
      </div>
      <div className="w-3/4 bg-gray-100 p-6">
        {renderComponent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
