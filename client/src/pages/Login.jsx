import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
        "/auth/login",
        formData
      );

      // save token
      localStorage.setItem(
        "token",
        res.data.token
      );

      // save user
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert(res.data.message);

      navigate("/");

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
          Login
        </h2>

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
          className="w-full border p-3 rounded-xl mb-6"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700"
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;