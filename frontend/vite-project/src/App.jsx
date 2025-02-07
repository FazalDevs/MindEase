import MoodChart from "./components/moodChart"
import React from "react"
import { Route, Routes } from "react-router-dom"
import Login from "./components/login"
import "./index.css"
import "./App.css"
import LandingPage from "./components/landingPage"
import Journal from "./components/journal"
function App() {
  const token = localStorage.getItem("jwt");
  return (
    <div>
      <Routes>
        <Route path='/mood' element={<MoodChart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<LandingPage />} />
        <Route path='/journal' element={<Journal />} />
        <Route path='*' element={<h1>Page not found</h1>} />
      </Routes>
    </div>
  )
}

export default App
