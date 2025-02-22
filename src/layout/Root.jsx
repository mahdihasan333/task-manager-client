import { useContext } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { ThemeContext } from "../providers/ThemeProvider";

const Root = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`w-full transition duration-300 ${theme === "dark" ? "bg-gray-900 text-white" : "text-gray-900"}`}>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default Root;
