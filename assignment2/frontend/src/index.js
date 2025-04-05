import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CohortList from './components/CohortList';
import DegreeList from './components/DegreeList';
import Cohort from './pages/Cohort';
import Degree from './pages/Degree';
import Nav from './components/Base';
// import StudentList from './components/StudentList';
import ModList from './components/ModList';
import Module from './pages/Module';
import SingleMod from './components/SingleMod';
import ModuleStudent from './pages/ModuleStudent';
import StudentInfo from './pages/StudentInfo';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Nav />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/cohort" element={<CohortList />} />
      <Route path='/cohort/:cohortID' element={<Cohort />} />
      <Route path='/degree' element={<DegreeList/>} />
      <Route path='/degree/:degree' element={<Degree />} />
      <Route path='/student/:id' element={<StudentInfo />} />
      <Route path='module/student/:code' element={<ModuleStudent />} />
      <Route path='/module' element={<ModList />} />
      <Route path='/cohort/module/:code' element={<Module />} />
      <Route path='/module/:id' element={<SingleMod />} />
    </Routes>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
