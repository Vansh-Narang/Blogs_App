import React from 'react';
import BlogEditor from './Pages/CreateBlog';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from './Components/Navbar';
import ShowBlog from './Pages/Blog';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<BlogEditor />} />
        <Route path="/showblog/:id" element={<ShowBlog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
