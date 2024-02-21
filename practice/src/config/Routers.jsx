import React from 'react'
import { createBrowserRouter,createRoutesFromElements,Route, RouterProvider } from 'react-router-dom'
import Messages from '../pages/Messages'


const router = createBrowserRouter(createRoutesFromElements(
    <Route>
        <Route path='/' element={<Messages/>}/>
    </Route>
))
const Routers = () => {
  return (
    <RouterProvider router = {router}/>
  )
}

export default Routers