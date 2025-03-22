import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Home from './pages/Home.jsx'
import BlogEditor from './components/BlogEditor';
import Blog from './components/Blog.jsx'
import EditBlog from './components/EditBlog.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
          path: "/my-blogs",
          element: <Home />,
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/signup",
            element: <Signup />
        },
        {
            path: "/new",
            element: <BlogEditor/>
        },
        {
          path: "/blog/:id",
          element: <Blog />
        },
        {
            path: "/blog/:id/edit",
            element: <EditBlog />
          },
    ],
},
])



createRoot(document.getElementById('root')).render(

    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  
)
