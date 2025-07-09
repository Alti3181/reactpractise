// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FrontPage from "./pages/FrontPage";
import SecondPage from "./pages/SecondPage";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/details" element={<SecondPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
