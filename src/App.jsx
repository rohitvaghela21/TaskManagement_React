
import './App.css'
import Form from './components/Form';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import PrivateRoute from './PrivateRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';


function App() {


  return (
    <>
      <main>
        {/* <Navbar /> */}
        {/* <Sidebar /> */}
        <Routes>
          <Route path="/" element={<Form />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </main>
    </>
  )
}

export default App
