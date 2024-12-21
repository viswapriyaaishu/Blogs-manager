import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import store from '../src/store/store.js'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import {
  LoginPage,SignUp,AddPost,EditPost,AllPosts,Post,Home
} from './pages/index.js'
import AuthLayout from './components/AuthLayout.jsx'

const router=createBrowserRouter([
  {path:"/",
  element:<App></App>,
  children:
  [{
    path:"/",
    element:(
      <AuthLayout >
        <Home></Home>
      </AuthLayout>
    )
  },{
    path:"/login",
    element:(
      <AuthLayout authentication={false}>
        <LoginPage></LoginPage>
      </AuthLayout>
    )
  },
  {
    path:"/signup",
    element: (<AuthLayout authentication={false}>
    <SignUp></SignUp>
  </AuthLayout>)
  },
  {
    path:"/add-post",
    element:(<AuthLayout authentication>
      <AddPost></AddPost>
    </AuthLayout>)
  },
  {
    path:"/editpost/:slug",
     element:(
        <AuthLayout authentication>
          <EditPost></EditPost>
        </AuthLayout>
      )
    }
  ,
  {
    path:"/post/:slug",
    element: (
      <AuthLayout authentication>
        <Post></Post>
      </AuthLayout>
    )
  },
  {
    path:"/all-posts",
    element:<AllPosts></AllPosts>
  }
  
]}
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
   
  </StrictMode>,
)
