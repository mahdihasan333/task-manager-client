import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { NavLink, useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logoutUser, loginWithGoogle } = useContext(AuthContext);

  // Handle logout and redirect
  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">Navbar</h1>

      <ul>
        <li to="/">
          <NavLink>Home</NavLink>
        </li>
        <li>
          <NavLink to="/taskform">Create</NavLink>
        </li>
      </ul>

      {user ? (
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={loginWithGoogle}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
        >
          Google Login
        </button>
      )}
    </nav>
  );
};

export default Navbar;
