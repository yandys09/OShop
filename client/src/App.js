import { Route, Routes } from "react-router";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./components/Layout/MainLayout";
import Aboutus from "./components/Pages/Aboutus";
import Contactus from "./components/Pages/Contactus";
import Auth from "./components/Auth/Auth";

import AuthenticatedRoute from "./components/Routes/AuthenticatedRoute";
import AuthorizedRoute from "./components/Routes/AuthorizedRoute";
import UserProfile from "./components/Auth/UserProfile";
import UpdateProfile from "./components/Auth/UpdateProfile";
import UpdatePassword from "./components/Auth/UpdatePassword";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Aboutus />} />
          <Route path="contact-us" element={<Contactus />} />
          <Route path="auth" element={<Auth />} />
          <Route path="/" element={<AuthenticatedRoute />}>
            <Route path="profile" element={<UserProfile />} />
            <Route path="/me/update" element={<UpdateProfile />} />
            <Route path="/password/update" element={<UpdatePassword />} />

            <Route path="/" element={<AuthorizedRoute />}></Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;