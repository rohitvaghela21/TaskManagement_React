
import './App.css'
import Form from './components/Form';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute';
import Site_Management from './dashboard/Site_Management';


function App() {

  return (
    <>
      <main>
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
