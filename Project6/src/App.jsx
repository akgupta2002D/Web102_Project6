// src/App.jsx
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import DetailView from "./components/DetailView";
import Search from "./components/Search";
import About from "./components/About";
import { Routes, Route } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <div className="main_container">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/detail/:id" element={<DetailView />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;