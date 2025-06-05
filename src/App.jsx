import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/home";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}
