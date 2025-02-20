import { Route, Routes } from "react-router";
import "./App.css";
import Root from "./layout/Root";
import Home from "./pages/Home";
import TaskForm from "./pages/TaskForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />}></Route>
        <Route path="/taskform" element={<TaskForm/>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
