import React, { useEffect, useState } from 'react';
import '../styles/mybookings.css';

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:8080/booking/user-bookings', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
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
    <div className="my-bookings-container">
      <h1>My Bookings</h1>
      {bookings.length > 0 ? (
        <div className="bookings-list">
          {bookings.map(booking => (
            <div className="booking-card" key={booking._id}>
              <img 
                src={booking.businessId.images[0]?.url} 
                alt={`${booking.businessId.name} image`} 
                className="booking-image"
              />
              <h2>{booking.businessId.name}</h2>
              <p><strong>Location:</strong> {booking.businessId.address}</p>
              <p><strong>Service on:</strong> {new Date(booking.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Status:</strong> {booking.status}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No bookings found</p>
      )}
    </div>
  );
}

export default MyBookings;