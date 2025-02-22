import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { ThemeContext } from "../providers/ThemeProvider";
import { FcGoogle } from "react-icons/fc";

const LogoutUserPage = () => {
  const { googleSignIn } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center px-6 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="max-w-md w-full p-8 rounded-lg shadow-lg bg-white dark:bg-gray-800 transition duration-300">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome to Task Manager</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">Sign in to manage your tasks efficiently.</p>
        
        <button
          onClick={googleSignIn}
          className="w-full flex items-center justify-center bg-white text-gray-900 dark:bg-gray-700 dark:text-white px-4 py-3 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300"
        >
          <FcGoogle className="mr-3 text-2xl" /> Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LogoutUserPage;
