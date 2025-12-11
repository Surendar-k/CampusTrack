import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./Components/LoginComponent/LoginPage";
import RegisterPage from "./Components/LoginComponent/RegisterPage";
import AdminMenu from "./Components/LoginComponent/AdminMenu";
import StudentMenu from "./Components/LoginComponent/StudentMenu";
import LostItemEntry from "./Components/ItemComponent/LostItemEntry";
import LostItemReport from "./Components/ItemComponent/LostItemReport";
import FoundItemReport from "./Components/ItemComponent/FoundItemReport";
import FoundItemEntry from "./Components/ItemComponent/FoundItemEntry";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Register" element={<RegisterPage />} />
          <Route path="/AdminMenu" element={<AdminMenu />} />
          <Route path="/StudentMenu" element={<StudentMenu />} />
          <Route path="/lost-entry" element={<LostItemEntry />} />
          <Route path="/lost-report" element={<LostItemReport />} />
          <Route path="/found-report" element={<FoundItemReport />} />
          <Route path="/found-entry" element={<FoundItemEntry />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
