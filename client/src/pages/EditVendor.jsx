import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditVendor() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    city: "",
    price: "",
    image: "",
  });

  useEffect(() => {

    const fetchVendor = async () => {

      try {

        const res = await API.get(
          `/vendors/${id}`
        );

        setFormData(res.data);

      } catch (error) {

        console.log(error);

      }
    };

    fetchVendor();

  }, [id]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.put(
        `/vendors/${id}`,
        formData
      );

      alert(res.data.message);

      navigate("/vendor-dashboard");

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-xl w-[500px]"
      >

        <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">
          Edit Vendor
        </h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl mb-4"
        />

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl mb-4"
        />

        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl mb-4"
        />

        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl mb-4"
        />

        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl mb-6"
        />

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700"
        >
          Update Vendor
        </button>

      </form>

    </div>
  );
}

export default EditVendor;