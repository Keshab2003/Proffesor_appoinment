
import './App.css';
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Homepage from "./pages/Homepage";
import Registerpage from "./pages/Registerpage";
import Loginpage from "./pages/Loginpage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/register" element={<Registerpage/>}/>
          <Route path="/login" element={<Loginpage/>}/>
        </Routes>
      </BrowserRouter>
        
    </>
  );
}

export default App;
