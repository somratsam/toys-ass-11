import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/home/Home";
import Login from "../providers/Login";
import Register from "../providers/Register";
import AddAToy from "../pages/AddAToy/AddAToy";
import MyToy from "../pages/MyToy/MyToy";
import PrivateRoute from "./PrivateRoute";
import Blog from "../pages/Blog";
import AllToys from "../pages/AllToys";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path : 'login',
                element : <Login></Login>
            },
            {
                path : 'register',
                element : <Register></Register>
            },
            {
                path : '/add-a-toy',
                element : <PrivateRoute><AddAToy></AddAToy></PrivateRoute>
            },
            {
                path : 'my-toys',
                element : <PrivateRoute><MyToy></MyToy></PrivateRoute>
            },
            {
                path : 'blog',
                element : <Blog></Blog>
            },
            {
                path : 'all-toys',
                element: <AllToys></AllToys>
            }
            
            
        ]
    }
])
export default router;