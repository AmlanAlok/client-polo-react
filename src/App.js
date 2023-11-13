import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'   // to use bootstrap in react app
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddStudent from './students/AddStudent';
import EditStudent from './students/EditStudent';
import ViewStudent from './students/ViewStudent';
import SignUp from './pages/SignUp';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/addstudent" element={<AddStudent/>} />
          <Route exact path="/editstudent/:id" element={<EditStudent/>} />
          <Route exact path="/viewstudent/:id" element={<ViewStudent/>} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
