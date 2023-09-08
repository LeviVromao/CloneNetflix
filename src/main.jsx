import React from 'react'
import ReactDOM from 'react-dom/client'
import App, { action as registerAction } from './routes/App.tsx'
import ErrorPage from './routes/Error-page.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/Home.jsx'
import Login, { action as loginAction } from './routes/Login.jsx'
import Content, { loader as contentLoader } from './routes/Content.tsx'
import Profile, { loader as profileLoader } from './routes/Profile.jsx'
import Details, {loader as detailsLoader} from './routes/Details.tsx'

const router = createBrowserRouter([
  {
    path: '/lang?',
    element: <App />,
    errorElement: <ErrorPage />,
    action: registerAction,
  },
  {
    path: '/home/',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'content',
        element: <Content />,
        errorElement: <ErrorPage />,
        loader: contentLoader
      },
      {
        path: 'profile/:UserID',
        element: <Profile />,
        errorElement: <ErrorPage />,
        loader: profileLoader,
      }
    ]
  },
  {
    path: 'content/:contentId',
    element: <Details />,
    errorElement: <ErrorPage />,
    loader: detailsLoader
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
    action: loginAction,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>,
)
