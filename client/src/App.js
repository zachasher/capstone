import "./App.css";
import "./styles/_resets.scss"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage"
import ClassPage from "./pages/Classes/ClassPage";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/RegisterPage/SignUpPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/classes" element={<ClassPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<SignUpPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
