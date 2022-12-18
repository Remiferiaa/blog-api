import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Components/Header/Header';
import PostDetails from './Components/Posts/PostDetail';
import Home from './Page/Home';
import './App.css'
import Login from "./Components/CMS/login";

function App() {
  return (
    <Router basename='/'>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/posts/:postid" element={<PostDetails/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
