import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

            <Link
                to="/"
                className="text-3xl font-bold text-pink-600"
            >
                DreamShaadi
            </Link>

            <div className="flex gap-6 items-center">

                <Link
                    to="/"
                    className="text-gray-700 hover:text-pink-600 font-medium"
                >
                    Home
                </Link>

                {!user ? (
                    <>
                        <Link
                            to="/login"
                            className="text-gray-700 hover:text-pink-600 font-medium"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="bg-pink-600 text-white px-5 py-2 rounded-full hover:bg-pink-700 transition"
                        >
                            Register
                        </Link>
                    </>
                ) : (
                    <>
                        <span className="font-semibold text-gray-700">
                            Hi, {user.name}
                        </span>

                        <Link
                            to="/vendor-dashboard"
                            className="text-gray-700 hover:text-pink-600 font-medium"
                        >
                            Vendor Dashboard
                        </Link>

                        <Link
                            to="/my-bookings"
                            className="text-gray-700 hover:text-pink-600 font-medium"
                        >
                            My Bookings
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </>
                )}

            </div>
        </nav>
    );
}

export default Navbar;