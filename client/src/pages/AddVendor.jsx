import { useState } from "react";
import API from "../services/api";

function AddVendor() {

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    city: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/vendors",
        formData
      );

      alert(res.data.message);

      setFormData({
        name: "",
        category: "",
        city: "",
        price: "",
        image: "",
      });

    } catch (error) {

      alert(error.response.data.message);

    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-xl w-[500px]"
      >

        <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">
          Add Vendor
        </h2>

       <input
  type="file"
  onChange={async (e) => {

    const file = e.target.files[0];

    const data = new FormData();

    data.append("image", file);

    try {

      const res = await API.post(
        "/upload",
        data
      );

      setFormData({
        ...formData,
        image: res.data.imageUrl,
      });

      alert("Image uploaded successfully");

    } catch (error) {

      console.log(error);

    }
  }}
  className="w-full border p-3 rounded-xl mb-6"
/>

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl mb-4"
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl mb-4"
        />

        <input
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl mb-4"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl mb-6"
        />

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700"
        >
          Add Vendor
        </button>

      </form>

    </div>
  );
}

export default AddVendor;