import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../Components/Header/Header";
import Home from "../Page/Home";
import PostDetails from "../Components/Posts/PostDetail";
import Login from "../Components/CMS/login";

function Base() {
  return (
    <Router basename='/'>
      <Header/>
      <Routes>
        <Route path="/" element={<Home status={'posts'}/>}></Route>
        <Route path="/posts/:postid" element={<PostDetails/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </Router>
  );
}

export default Base;
