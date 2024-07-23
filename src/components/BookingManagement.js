import React, { useState, useEffect } from 'react';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch bookings from the database
    const fetchBookings = async () => {
      try {
        const response = await fetch('https://travel-project-auth-e9607-default-rtdb.firebaseio.com/bookings.json');
        const data = await response.json();
        const bookingsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setBookings(bookingsArray);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const handleApproveBooking = async (bookingId) => {
    try {
      const updatedBooking = { ...bookings.find(booking => booking.id === bookingId), status: 'completed' };
      const response = await fetch(`https://travel-project-auth-e9607-default-rtdb.firebaseio.com/bookings/${bookingId}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBooking),
      });

      if (!response.ok) {
        throw new Error('Failed to approve booking');
      }

      const updatedBookings = bookings.map(booking =>
        booking.id === bookingId ? updatedBooking : booking
      );
      setBookings(updatedBookings);
    } catch (error) {
      console.error('Failed to approve booking:', error);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      const response = await fetch(`https://travel-project-auth-e9607-default-rtdb.firebaseio.com/bookings/${bookingId}.json`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete booking');
      }

      const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
      setBookings(updatedBookings);
    } catch (error) {
      console.error('Failed to delete booking:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Booking Management</h2>
      {bookings.length > 0 ? (
        <ul className="space-y-4">
          {bookings.map(booking => (
            <li key={booking.id} className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-2">{booking.placeName}</h3>
              <p className="text-gray-700 mb-2">Booked by: <span className="font-medium">{booking.userName}</span></p>
              <p className="text-gray-700 mb-2">Booking dates: <span className="font-medium">{booking.startDate}</span> to <span className="font-medium">{booking.endDate}</span></p>
              <p className="text-gray-700 mb-2">Status: <span className={`font-medium ${booking.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>{booking.status}</span></p>
              <div className="flex space-x-4">
                {booking.status !== 'completed' && (
                  <button
                    onClick={() => handleApproveBooking(booking.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={() => handleDeleteBooking(booking.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-700">No bookings available</p>
      )}
    </div>
  );
};

export default BookingManagement;
