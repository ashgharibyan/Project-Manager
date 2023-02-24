import logo from './logo.svg';
import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";
import Dashboard from './views/Dashboard';
import CreateProject from './views/CreateProject';

function App() {
  return (
    <div className="container">
      <h1>Project Manager</h1>

    <Routes>
      <Route path="/" element={<Dashboard></Dashboard>}></Route>
      <Route path="/projects/new" element={<CreateProject></CreateProject>}></Route>
    </Routes>
    </div>
  );
}

export default App;
