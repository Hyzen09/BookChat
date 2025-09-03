import React from "react"
import { Routes, BrowserRouter, Route } from "react-router-dom"
import { Welcome } from "../pages/Welcome"
import Main from "../pages/Main"
function AppRoutes() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
