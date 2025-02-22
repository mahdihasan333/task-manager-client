import LoadingSpinner from "../components/LoadingSpinner";
import LogoutUserPage from "../components/logoutUserPage";
import { TaskSection } from "../components/TaskSection";
import useAuth from "../hooks/useAuth";
import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

const Home = () => {
  const { user, loading } = useAuth();
  const { theme } = useContext(ThemeContext);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={`min-h-screen transition duration-300 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="w-11/12  mx-auto pt-8 p-4 md:p-6 lg:p-8">
        {user ? <TaskSection /> : <LogoutUserPage />}
      </div>
    </div>
  );
};

export default Home;
