import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { ThemeContext } from "../providers/ThemeProvider";
import { useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logoutUser, googleSignIn } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  return (
    <nav className={`px-6 py-3 flex justify-between items-center transition duration-300 ${theme === "dark" ? "bg-blue-900 text-white" : "bg-blue-100 text-gray-900"}`}>
      <h1 className="text-xl font-bold">Task-manager</h1>

      <div className="flex items-center space-x-4">
        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition duration-300 ${theme === 'dark' ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-300 hover:bg-blue-400'}`}
        >
          {theme === "dark" ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-600" />}
        </button>

        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white transition duration-300"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={googleSignIn}
            className="flex items-center bg-white text-gray-900 px-4 py-2 rounded shadow-md hover:bg-gray-200 transition duration-300"
          >
            <FcGoogle className="mr-2 text-2xl" /> Sign in with Google
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
