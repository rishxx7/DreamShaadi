import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function VendorDetails() {

  const { id } = useParams();

  const [vendor, setVendor] = useState(null);

  const [bookingData, setBookingData] = useState({
  eventType: "",
  date: "",
  guests: "",
});

  useEffect(() => {

    const fetchVendor = async () => {

      try {

        const res = await API.get(
          `/vendors/${id}`
        );

        setVendor(res.data);

      } catch (error) {

        console.log(error);

      }
    };

    fetchVendor();

  }, [id]);

  const handleChange = (e) => {

  setBookingData({
    ...bookingData,
    [e.target.name]: e.target.value,
  });
};

const handleBooking = async () => {

  try {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const bookingPayload = {
      ...bookingData,
      user: user._id,
      vendor: vendor._id,
    };

    const res = await API.post(
      "/bookings",
      bookingPayload
    );

    alert(res.data.message);

  } catch (error) {

    console.log(error);

  }
};

const handlePayment = async () => {

  try {

    const res = await API.post(
      "/payment",
      {
        amount: 5000,
      }
    );

    const options = {

      key:
        "rzp_test_Su5a01qHMzVMXa",

      amount: res.data.amount,

      currency: res.data.currency,

      order_id: res.data.id,

      name: "DreamShaadi",

      description:
        "Wedding Booking Payment",

      handler: function () {

        alert(
          "Payment Successful"
        );
      },

      theme: {
        color: "#db2777",
      },
    };

    const razorpay =
      new window.Razorpay(options);

    razorpay.open();

  } catch (error) {

    console.log(error);

  }
};

  if (!vendor) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 p-10">

      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">

        <img
          src={vendor.image}
          alt={vendor.name}
          className="w-full h-full object-cover"
        />

        <div className="p-10">

          <h1 className="text-5xl font-bold text-gray-800">
            {vendor.name}
          </h1>

          <p className="mt-4 text-xl text-pink-600 font-semibold">
            {vendor.category}
          </p>

          <p className="mt-3 text-gray-600 text-lg">
            📍 {vendor.city}
          </p>

          <p className="mt-6 text-3xl font-bold text-pink-600">
            {vendor.price}
          </p>

          <div className="mt-6 inline-block bg-pink-100 text-pink-700 px-5 py-2 rounded-full">
            ⭐ {vendor.rating}
          </div>

          <p className="mt-8 text-gray-600 leading-8">
            Experience luxury wedding services with
            premium arrangements, professional staff,
            elegant decoration and unforgettable
            wedding moments.
          </p>

          <div className="mt-10 space-y-4">

  <select
    name="eventType"
    onChange={handleChange}
    className="w-full border p-3 rounded-xl"
  >
    <option>Select Event Type</option>
    <option>Haldi</option>
    <option>Mehendi</option>
    <option>Sangeet</option>
    <option>Engagement</option>
    <option>Wedding</option>
    <option>Reception</option>
  </select>

  <input
    type="date"
    name="date"
    onChange={handleChange}
    className="w-full border p-3 rounded-xl"
  />

  <input
    type="number"
    name="guests"
    placeholder="Number of Guests"
    onChange={handleChange}
    className="w-full border p-3 rounded-xl"
  />

  <button
    onClick={handleBooking}
    className="w-full bg-pink-600 text-white py-4 rounded-2xl hover:bg-pink-700 transition"
  >
    Confirm Booking
  </button>

  <button
  onClick={handlePayment}
  className="w-full bg-green-600 text-white py-4 rounded-2xl hover:bg-green-700 transition"
>
  Pay Now
</button>

</div>

        </div>

      </div>

    </div>
  );
}

export default VendorDetails;