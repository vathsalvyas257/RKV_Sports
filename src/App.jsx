import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Tournaments from "./components/Tournaments";
import Livescore from "./components/Livescore";
import News from "./components/News";
import Footer from "./components/Footer";
import Dept from "./components/Dept";
import Login from "./components/Login";
import User from "./components/user/User";
import Signup from "./components/Signup";
import KabaddiRegistration from "./components/RegistrationForms/KabaddiRegistration";
import CricketRegistration from "./components/RegistrationForms/CricketRegistration";
import BadmintonRegistration from "./components/RegistrationForms/BadmintonRegistration";
import BasketballRegistration from "./components/RegistrationForms/BasketballRegistration";
import HockeyRegistration from "./components/RegistrationForms/HockeyRegistration"
import RegistrationSuccess from "./components/RegistrationForms/RegistrationSuccess.jsx";
import SportsState from "./components/context/SportsState";
import AuthState from "./components/context/AuthState";
import AdminPage from "./components/Admin/AdminPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import ErrorBoundary from './components/ErrorBoundary.jsx';  // Updated import with .jsx extension


function App() {
  return (
    <SportsState>
      <Router>
        <AuthState>
          <div className="d-flex flex-column min-vh-100"> {/* Flexbox layout */}
            <Navbar />
            <main className="flex-fill"> {/* Main content area */}
              <ErrorBoundary>
                <Routes>
                  <Route exact path="/" element={<Home />} />

                  {/* Registration pages */}
                  <Route exact path="/registration" element={<Tournaments/>} />
                  <Route exact path="/registration/cricket" element={<CricketRegistration/>} />
                  <Route exact path="/registration/hockey" element={<HockeyRegistration />} />
                  <Route exact path="/registration/kabaddi" element={<KabaddiRegistration />} />
                  <Route exact path="/registration/badminton" element={<BadmintonRegistration />} />
                  <Route exact path="/registration/basketball" element={<BasketballRegistration />} />
                  <Route exact path="/registration-success" element={< RegistrationSuccess/>} />



                  <Route exact path="/tournaments" element={<Tournaments />} />
                  <Route exact path="/livescores" element={<Livescore />} />
                  <Route exact path="/news" element={<News />} />
                  <Route exact path="/dept" element={<Dept />} />
                  <Route exact path="/admin" element={<AdminPage/>} />

                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/profile" element={<User />} />
                  <Route exact path="/signup" element={<Signup />} />
                </Routes>
              </ErrorBoundary>
            </main>
            <Footer />
          </div>
          {/* Place the ToastContainer here and set position to bottom-right */}
          <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} />
        </AuthState>
      </Router>
    </SportsState>
  );
}

export default App;
