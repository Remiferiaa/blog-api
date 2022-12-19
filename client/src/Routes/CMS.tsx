import { HashRouter as Router, Routes, Route } from "react-router-dom";
import PostEdit from "../Components/CMS/editPost";
import NewPost from "../Components/CMS/newPost";
import Header from "../Components/Header/Header";
import Home from "../Page/Home";

function Protected() {
  return (
    <Router basename='/'>
      <Header/>
      <Routes>
        <Route path="/" element={<Home status={'edit'}/>}></Route>
        <Route path="/edit/:postid" element={<PostEdit/>}></Route>
        <Route path="/newpost" element={<NewPost/>}></Route>
      </Routes>
    </Router>
  );
}

export default Protected;
