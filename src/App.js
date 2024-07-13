import { Routes, Route } from "react-router-dom";
import "./App.css";
import TeamCreator from "./pages/CreateNewTeam";
import LandingPage from "./pages/LandingPage";
import Step2 from "./pages/Step2";
import Step3 from "./pages/Step3"; // Import Step3
import Nav from "./components/Nav"; // Import navigation component
import ViewResults from "./pages/ViewResults";
import DatabaseContext from "./context/databaseContext";
import Localbase from "localbase";
function App() {
  var database = new Localbase("arbitrage-db");

  return (
    <div className="App">
      <Nav /> {/* Include navigation */}
      <div className="content">
        <DatabaseContext.Provider value={database}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/create-new-team" element={<TeamCreator />} />
            <Route path="/step2" element={<Step2 />} />
            <Route path="/step3" element={<Step3 />} />
            <Route path="/done" element={<ViewResults />} />
            {/* Add route for Step3 */}
          </Routes>
        </DatabaseContext.Provider>
      </div>
    </div>
  );
}

export default App;
