import { Route, Routes } from "react-router";
import "./App.css";
import Root from "./layout/Root";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
