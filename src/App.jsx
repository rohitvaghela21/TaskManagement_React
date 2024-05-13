
import './App.css'
import Form from './components/Form';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import SiteManagement from './dashboard/Site_Management';
import StaffManagement from './dashboard/StaffManagement';
import Departments from './dashboard/Departments';
import Templates from './dashboard/Templates';
import TaskManagement from './dashboard/TaskManagement';
import TemperatureLogs from './dashboard/TemperatureLogs';
import Categories from './dashboard/Categories';



function App() {

  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path='/dashboard' element={<PrivateRoute  />}>
            <Route path="siteManagement" element={<SiteManagement />} />
            <Route path="staffManagement" element={<StaffManagement />} />
            <Route path="departments" element={<Departments />} />
            <Route path="templates" element={<Templates />} />
            <Route path="taskManagement" element={<TaskManagement />} />
            <Route path="temperatureLogs" element={<TemperatureLogs />} />
            <Route path="categories" element={<Categories />} />
          </Route>
        </Routes>
      </main>
    </>
  )
}

export default App
