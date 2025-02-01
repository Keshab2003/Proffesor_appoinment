
import './App.css';
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Homepage from "./pages/Homepage";
import Registerpage from "./pages/Registerpage";
import Loginpage from "./pages/Loginpage";
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

function App() {

  const {loading} = useSelector(state => state.alerts);

  return (
    <>
      <BrowserRouter>
      {loading ? (<Spinner/>) :
       ( <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Homepage/>
            </ProtectedRoute>            
            }
          />
          <Route path="/register" element={
            <PublicRoute>
              <Registerpage/>
            </PublicRoute>
            }
          />
          <Route path="/login" element={
            <PublicRoute>
              <Loginpage/>
            </PublicRoute>
          }/>
        </Routes>)
      }
        
      </BrowserRouter>
        
    </>
  );
}

export default App;
