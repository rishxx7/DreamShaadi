import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function MyBookings() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {

    const fetchBookings = async () => {

      try {

        const user = JSON.parse(
          localStorage.getItem("user")
        );

        const res = await API.get(
          `/bookings/${user._id}`
        );

        setBookings(res.data);

      } catch (error) {

        console.log(error);

      }
    };

    fetchBookings();

  }, []);

  return (
    <div className="min-h-screen bg-pink-50">

      <Navbar />

      <div className="max-w-6xl mx-auto p-10">

        <h1 className="text-5xl font-bold text-gray-800 mb-10">
          My Bookings
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

         {bookings
  .filter((booking) => booking.vendor)
  .map((booking) => (

            <div
              key={booking._id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden"
            >

              <img
                src={booking.vendor.image}
                alt={booking.vendor.name}
                className="h-64 w-full object-cover"
              />

              <div className="p-6">

                <h2 className="text-3xl font-bold text-gray-800">
                  {booking.vendor.name}
                </h2>

                <p className="mt-3 text-gray-600">
                  📍 {booking.vendor.city}
                </p>

                <p className="mt-3 text-pink-600 font-semibold">
                  {booking.eventType}
                </p>

                <p className="mt-2 text-gray-700">
                  📅 {booking.date}
                </p>

                <p className="mt-2 text-gray-700">
                  👥 {booking.guests} Guests
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default MyBookings;