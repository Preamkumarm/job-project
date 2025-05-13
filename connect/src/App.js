import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import Application from "./pages/Application";
import RecruiterLogin from "./components/RecruiterLogin";
import { useContext } from "react";
import { NameContext } from "./context/ArrContext";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import ManageJobs from "./pages/ManageJobs";
import ViewApplication from "./pages/ViewApplication";
import 'quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const {showLogin, companyToken} = useContext(NameContext);
  return (
    <div>
      {
        showLogin && <RecruiterLogin/>
      }
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob/>}></Route>
        <Route path="/application" element={<Application/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}>
        {companyToken ? <>
          <Route path="add-job" element={<AddJob/>}></Route>
         <Route path="manage-jobs" element={<ManageJobs/>}></Route>
         <Route path="view-applications" element={<ViewApplication/>}></Route>
        </> : null}
        </Route>
      </Routes>
    </div>
  )
}

export default App