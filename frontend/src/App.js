import "./App.css";
import NavbarComp from "./components/user/common/NavbarComp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/user/home/HomePage";
import FooterComp from "./components/user/common/FooterComp";
import BlogPage from "./components/user/blog/BlogPage";

import SingleBlog from "./components/user/blog/SingleBlog";
function App() {
  return (
    <div className="App">
      <Router>
        <NavbarComp />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="/singleblog/:id" element={<SingleBlog />} />
        </Routes>
        <FooterComp />
      </Router>
    </div>
  );
}

export default App;
