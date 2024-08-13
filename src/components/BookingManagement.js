import React, { useEffect, useState } from 'react';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); //wait for showing data
  const [error, setError] = useState(null);
 
  //data fetched to display
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('https://travel-project-auth-e9607-default-rtdb.firebaseio.com/reservations.json');
        const data = await response.json();

        if (data) {
          const allBookings = [];
          //below this is done bcz of structure of database here for each user with unique id he can have different booking id for different hotels or place 
          //so we do like this in this way at last we get array with bid and uid 
          for (const userId in data) {
            for (const bookingId in data[userId]) {
              allBookings.push({
                userId,
                bookingId,
                ...data[userId][bookingId],
              });
            }
          }
          setBookings(allBookings);
        }
      } catch (error) {
        alert('Failed to fetch bookings:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleApprove = async (booking) => {
    try {
      await fetch(`https://travel-project-auth-e9607-default-rtdb.firebaseio.com/reservations/${booking.userId}/${booking.bookingId}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'completed' }),
      });
     //update instant on screen 
      setBookings(bookings.map(b => b.bookingId === booking.bookingId ? { ...b, status: 'completed' } : b));
    } catch (error) {
      alert('Failed to approve booking:', error);
    }
  };

  const handleReject = async (booking) => {
    try {
      await fetch(`https://travel-project-auth-e9607-default-rtdb.firebaseio.com/reservations/${booking.userId}/${booking.bookingId}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'rejected' }),
      });

      setBookings(bookings.map(b => b.bookingId === booking.bookingId ? { ...b, status: 'rejected' } : b));
    } catch (error) {
      alert('Failed to reject booking:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {bookings.length === 0 ? (
        <p>No pending bookings.</p>
      ) : (
        bookings.map((booking, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-4">
            <h3 className="text-xl font-bold mb-2">{booking.placeName}</h3>
            <p className="mb-2">Check-in Date: {booking.checkInDate}</p>
            <p className="mb-2">Check-out Date: {booking.checkOutDate}</p>
            <p className="mb-2">Total Price: ₹{booking.totalPrice}</p>
            <p className="mb-2">Status: {booking.status}</p>
            <p className="mb-2">Property name: {booking.propertyName}</p>
            <button
              onClick={() => handleApprove(booking)}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 mt-4 mr-4"
            >
              Approve
            </button>
            <button
              onClick={() => handleReject(booking)}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 mt-4"
            >
              Reject
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default BookingManagement;
