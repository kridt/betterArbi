import { Routes, Route } from "react-router-dom";
import "./App.css";
import TeamCreator from "./pages/CreateNewTeam";
import LandingPage from "./pages/LandingPage";
import Step2 from "./pages/Step2";
import Step3 from "./pages/Step3"; // Import Step3
import Nav from "./components/Nav"; // Import navigation component
import ViewResults from "./pages/ViewResults";

function App() {
  return (
    <div className="App">
      <Nav /> {/* Include navigation */}
      <div className="content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create-new-team" element={<TeamCreator />} />
          <Route path="/step2" element={<Step2 />} />
          <Route path="/step3" element={<Step3 />} />
          <Route path="/done" element={<ViewResults />} />
          {/* Add route for Step3 */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
