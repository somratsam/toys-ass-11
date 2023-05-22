import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/home/Home";
import Login from "../providers/Login";
import Register from "../providers/Register";
import AddAToy from "../pages/AddAToy/AddAToy";
import MyToy from "../pages/MyToy/MyToy";
import PrivateRoute from "./PrivateRoute";

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
                element : <AddAToy></AddAToy>
            },
            {
                path : 'my-toys',
                element : <PrivateRoute><MyToy></MyToy></PrivateRoute>
            },
            
            
        ]
    }
])
export default router;