import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage"
import ClassPage from "./pages/Classes/ClassPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/classes" element={<ClassPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
