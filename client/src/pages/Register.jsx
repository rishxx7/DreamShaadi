import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
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
        "/auth/register",
        formData
      );

      alert(res.data.message);

      navigate("/login");

    } catch (error) {

      alert(error.response.data.message);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-xl w-[400px]"
      >

        <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">
          Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border p-3 rounded-xl mb-4"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 rounded-xl mb-4"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 rounded-xl mb-4"
          onChange={handleChange}
        />

        <select
          name="role"
          className="w-full border p-3 rounded-xl mb-6"
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="vendor">Vendor</option>
        </select>

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700"
        >
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;