import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { Link } from "react-router-dom";

function VendorDashboard() {

    const [vendors, setVendors] = useState([]);

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

    const handleDelete = async (id) => {

        try {

            const res = await API.delete(
                `/vendors/${id}`
            );

            alert(res.data.message);

            setVendors(
                vendors.filter(
                    (vendor) => vendor._id !== id
                )
            );

        } catch (error) {

            console.log(error);

        }
    };

    return (
        <div className="min-h-screen bg-pink-50">

            <Navbar />

            <div className="max-w-7xl mx-auto p-10">

                <div className="flex justify-between items-center mb-10">

                    <h1 className="text-5xl font-bold text-gray-800">
                        Vendor Dashboard
                    </h1>

                    <a
                        href="/add-vendor"
                        className="bg-pink-600 text-white px-6 py-3 rounded-2xl hover:bg-pink-700"
                    >
                        Add Vendor
                    </a>

                </div>

                {/* STATS */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">

                    <div className="bg-white rounded-3xl shadow-xl p-8">
                        <h2 className="text-2xl font-semibold text-gray-700">
                            Total Listings
                        </h2>

                        <p className="text-5xl font-bold text-pink-600 mt-4">
                            {vendors.length}
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl p-8">
                        <h2 className="text-2xl font-semibold text-gray-700">
                            Active Services
                        </h2>

                        <p className="text-5xl font-bold text-pink-600 mt-4">
                            {vendors.length}
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl p-8">
                        <h2 className="text-2xl font-semibold text-gray-700">
                            Total Views
                        </h2>

                        <p className="text-5xl font-bold text-pink-600 mt-4">
                            120+
                        </p>
                    </div>

                </div>

                {/* VENDOR LIST */}
                <div className="grid md:grid-cols-3 gap-8">

                    {vendors.map((vendor) => (

                        <div
                            key={vendor._id}
                            className="bg-white rounded-3xl shadow-xl overflow-hidden"
                        >

                            <img
                                src={vendor.image}
                                alt={vendor.name}
                                className="h-64 w-full object-cover"
                            />

                            <div className="p-6">

                                <h2 className="text-2xl font-bold text-gray-800">
                                    {vendor.name}
                                </h2>

                                <p className="mt-2 text-gray-600">
                                    {vendor.category}
                                </p>

                                <p className="mt-2 text-pink-600 font-semibold">
                                    {vendor.price}
                                </p>

                                <div className="flex gap-4 mt-6">

                                    <Link
                                        to={`/edit-vendor/${vendor._id}`}
                                        className="bg-blue-500 text-white px-5 py-2 rounded-xl hover:bg-blue-600"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(vendor._id)}
                                        className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
}

export default VendorDashboard;