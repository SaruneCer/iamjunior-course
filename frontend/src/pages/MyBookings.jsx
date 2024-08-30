import React, { useEffect, useState } from 'react';

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/bookings/user', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        } else {
          console.error('Failed to fetch bookings');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h1>My Bookings</h1>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map(booking => (
            <li key={booking._id}>
              {booking.service} - {booking.date}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found</p>
      )}
    </div>
  );
}

export default MyBookings;
