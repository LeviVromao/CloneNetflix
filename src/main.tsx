import React from 'react'
import ReactDOM from 'react-dom/client'
import App, { action as registerAction } from './routes/App.js'
import ErrorPage from './routes/Error-page.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/Home.js'
import Login, { action as loginAction } from './routes/Login.js'
import Content, { loader as contentLoader } from './routes/Content.js'
import Profile, { loader as profileLoader } from './routes/Profile.js'
import Details, {loader as detailsLoader} from './routes/Details.js'

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

ReactDOM.createRoot(document.getElementById('root') as Element | DocumentFragment).render(
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>,
)
