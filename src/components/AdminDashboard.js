import React, { useEffect } from 'react';
import { useHistory, Route, Switch, Link, Redirect } from 'react-router-dom';
import Categories from './Categories';
import CreateListing from './CreateListing';
import EditListings from './EditListings';
import UpdateAvailability from './UpdateAvailability';
import ViewListings from './ViewListings';
import BookingManagement from './BookingManagement';

const AdminDashboard = () => {
  const history = useHistory();

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

  return (
    <div className="flex min-h-screen">
      <div className="w-1/4 bg-gray-800 text-white p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
          <button title='sign out' onClick={handleSignOut} className="text-white flex items-center justify-center space-x-2">
            <img 
              src="https://cdn-icons-png.flaticon.com/128/14025/14025580.png" 
              alt="Sign Out" 
              className="w-8 h-8"
            />
          </button>
        </div>
        <ul className="space-y-4">
          <li>
            <Link to="/admin/welcome" className="w-full text-left">Welcome</Link>
          </li>
          <li>
            <Link to="/admin/categories" className="w-full text-left">Categories</Link>
          </li>
          <li>
            <Link to="/admin/create-listing" className="w-full text-left">Create Listing</Link>
          </li>
          <li>
            <Link to="/admin/edit-listings" className="w-full text-left">Edit Listings and Categories</Link>
          </li>
          <li>
            <Link to="/admin/update-availability" className="w-full text-left">Update Availability</Link>
          </li>
          <li>
            <Link to="/admin/view-listings" className="w-full text-left">View Listings</Link>
          </li>
          <li>
            <Link to="/admin/booking-management" className="w-full text-left">Booking Management</Link>
          </li>
        </ul>
      </div>
      <div className="w-3/4 bg-gray-100 p-6">
        <Switch>
          <Route path="/admin/welcome">
            <h2>Welcome to Admin Dashboard</h2>
          </Route>
          <Route path="/admin/categories" component={Categories} />
          <Route path="/admin/create-listing" component={CreateListing} />
          <Route path="/admin/edit-listings" component={EditListings} />
          <Route path="/admin/update-availability" component={UpdateAvailability} />
          <Route path="/admin/view-listings" component={ViewListings} />
          <Route path="/admin/booking-management" component={BookingManagement} />
          <Redirect from="/admin" to="/admin/welcome" />
        </Switch>
      </div>
    </div>
  );
};

export default AdminDashboard;
