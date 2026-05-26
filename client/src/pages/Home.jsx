import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

const categories = [
  "Complete Package",
  "Banquet Hall",
  "Hotel",
  "Catering",
  "Photographer",
  "Decorator",
  "Pandit",
  "DJ",
];


function Home() {

    const [vendors, setVendors] = useState([]);
    const [city, setCity] = useState("");
    const [category, setCategory] = useState("");

useEffect(() => {

  const fetchVendors = async () => {

    try {

      const res = await API.get("/vendors");

      setVendors(res.data);

    } catch (error) {

      console.log(error);

    }
  };


  fetchVendors();

}, []);

const filteredVendors = vendors.filter((vendor) => {

  const matchesCity =
    vendor.city
      ?.toLowerCase()
      .includes(city.toLowerCase());

  const matchesCategory =
    category === "" ||
    category === "Choose Service" ||
    vendor.category === category;

  return matchesCity && matchesCategory;
});

  return (
    <div className="min-h-screen bg-[#fffaf5]">

      <Navbar />

      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">

        <h1 className="text-6xl font-bold text-gray-800 leading-tight">
          Plan Your Dream Wedding
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl">
          Find venues, caterers, photographers,
          decorators and complete wedding packages
          for every function.
        </p>

        {/* SEARCH BOX */}
        <div className="mt-10 bg-white shadow-xl rounded-2xl p-6 flex gap-4 flex-wrap justify-center">

         <input
            type="text"
            placeholder="Search city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border border-gray-300 px-5 py-3 rounded-xl w-64 outline-none"
          />

          <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="border border-gray-300 px-5 py-3 rounded-xl w-72 outline-none"
>
            <option>Choose Service</option>

            <option>Complete Wedding Package</option>

            <option>Banquet Hall</option>

            <option>Hotel</option>

            <option>Catering</option>

            <option>Wedding Decorator</option>

            <option>Photographer</option>

            <option>Videographer</option>

            <option>DJ & Music</option>

            <option>Makeup Artist</option>

            <option>Mehendi Artist</option>

            <option>Pandit</option>

            <option>Choreographer</option>

            <option>Car Rental</option>

            <option>Invitation Designer</option>

          </select>

          <button className="bg-pink-600 text-white px-8 py-3 rounded-xl hover:bg-pink-700 transition">
            Search
          </button>

        </div>

      </section>

      {/* CATEGORIES SECTION */}
      <section className="px-10 pb-20">

        <h2 className="text-4xl font-bold text-center text-gray-800 mb-14">
          Wedding Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {categories.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-10 text-center hover:scale-105 transition duration-300 cursor-pointer"
            >
              <h3 className="text-2xl font-semibold text-pink-600">
                {item}
              </h3>

              <p className="mt-3 text-gray-600">
                Explore best {item.toLowerCase()} services
              </p>
            </div>
          ))}

        </div>

      </section>
          {/* FEATURED VENDORS */}
<section className="px-10 pb-24">

  <h2 className="text-4xl font-bold text-center text-gray-800 mb-14">
    Featured Wedding Services
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

    {filteredVendors.map((vendor, index) => (
      <div
        key={index}
        className="bg-white rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition duration-300"
      >

        <img
          src={vendor.image}
          alt={vendor.name}
          className="h-64 w-full object-cover"
        />

        <div className="p-6">

          <h3 className="text-2xl font-bold text-gray-800">
            {vendor.name}
          </h3>

          <p className="text-gray-500 mt-2">
            {vendor.city}
          </p>

          <div className="flex justify-between items-center mt-5">

            <span className="text-pink-600 font-bold text-lg">
              {vendor.price}
            </span>

            <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm">
              ⭐ {vendor.rating}
            </span>

          </div>

          <Link
  to={`/vendor/${vendor._id}`}
  className="block mt-6 w-full bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700 transition text-center"
>
  View Details
</Link>

        </div>

      </div>
    ))}

  </div>

</section>
    </div>
  );
}

export default Home;