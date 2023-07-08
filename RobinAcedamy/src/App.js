import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OpenRoute from "./components/core/Homepage/Auth/OpenRoute";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
function App() {
  return (
    
    <div className=" w-screen min-h-screen bg-richblack-900 ">
    <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<OpenRoute><Home></Home></OpenRoute>}></Route>
        <Route path="login" element={<OpenRoute><Login></Login></OpenRoute>}></Route>
        <Route path="signup" element={<OpenRoute><Signup></Signup></OpenRoute>}></Route>
        <Route path="forgot-password" element={<OpenRoute><ForgotPassword></ForgotPassword></OpenRoute>}></Route>
        <Route path="verify-email" element={<OpenRoute><VerifyEmail></VerifyEmail></OpenRoute>}></Route>
        <Route path="update-password/:id" element={<OpenRoute><Signup></Signup></OpenRoute>}></Route>
        <Route path="about" element={<OpenRoute><Signup></Signup></OpenRoute>}></Route>
      </Routes>
    </div>
  );
}

export default App;
