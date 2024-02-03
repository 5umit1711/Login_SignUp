import SignUp from './components/SignUp'
import Login from './components/Login'
import Response from './components/Response'
import Error from './components/Error'
import Forget from './components/Forget'
import Reset from './components/Reset'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
    {path: "/", element: <Login/>},
    {path: "/signup", element: <SignUp/>},
    {path: "/response", element: <Response/>},
    {path: "/error", element: <Error/>},
    {path: "/forgotPassword", element: <Forget/>},
    {path: "/reset", element: <Reset/>}])

function App() {
    return <>
    <RouterProvider router={router}/>
    </>
}

export default App
