import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Tournments from "./components/Tournments";
import Livescore from "./components/Livescore";
import Register from "./components/Register";
import News from "./components/News";
import Footer from "./components/Footer";
import Dept from "./components/Dept";
import Login from "./components/Login";
<<<<<<< HEAD
import User from "./components/user/User";
=======
import SignupPage from "./components/Signup";
>>>>>>> 2240c7640060738cad849224b1677cf942876eb0
function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route  exact path="/" element={<Home/>}/>
          <Route  exact path="/tournments" element={<Tournments/>}/>
          <Route exact path="/livescores" element={<Livescore/>}/>
          <Route  exact path="/register" element={<Register/>}/>
          <Route  exact path="/news" element={<News/>}/>
          <Route  exact path="/dept" element={<Dept/>}/>
          <Route  exact path="/login" element={<Login/>}/>
<<<<<<< HEAD
          <Route exact path="/profile" element={<User/>}/>
=======
          <Route exact path="/signup" element={<SignupPage/>}/>
          <Route exact path="/profile" element={<Login/>}/>
>>>>>>> 2240c7640060738cad849224b1677cf942876eb0
        </Routes>
        <Footer/>
      </Router>

    </>
  );
}

export default App;
