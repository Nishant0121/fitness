import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { SignUp } from "./pages/signup";
// import { AddTrans } from "./pages/expense_tracker/addtrans";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/addtrans" element={<AddTrans />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
