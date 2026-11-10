import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import PhotoScreen from './screens/PhotoScreen';
import CouponScreen from './screens/CouponScreen';
import HomeScreen from './screens/HomeScreen';
import InformationScreen from './screens/InformationScreen.jsx';
import SerchdataScreen from './screens/SerchdataScreen.jsx';
import './App.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'




const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path='/' element={<App />}>
      <Route path='/' element={<HomeScreen />} />
      <Route path='/dashboard/:id' element={<PhotoScreen />} />
      <Route path='/coupon' element={<CouponScreen />} />
      <Route path='/information/:id' element={<InformationScreen />} />
      <Route path='/searchdata' element={<SerchdataScreen />} />
    </Route>

  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
