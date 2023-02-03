
import { Dashboard } from '@mui/icons-material';
import DashBoard from './components/admin/DashBoard';
import { Routes, BrowserRouter as Router, Route } from "react-router-dom"
import AdminLogin from './components/admin/AdminLogin';

function App(props) {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<AdminLogin />} path={"/adminlogin"} />
          <Route element={<DashBoard />} path={"/dashboard/*"} />
        </Routes>
      </Router>
    </div>
  )
}



export default App;
