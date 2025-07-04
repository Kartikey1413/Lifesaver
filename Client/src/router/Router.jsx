import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx';
import Home from '../pages/Home.jsx'
import Profile from '../Dashboard/DonorAccount/Profile.jsx';
import About from '../pages/About.jsx'
import FindDonors from '../components/Search/FindDonors.jsx';
import Eligibility from '../pages/Eligibility.jsx';
import AllDonors from '../Dashboard/AdminPanel/AllDonors.jsx'
import CreateDonors from '../Dashboard/DonorAccount/CreateDonors.jsx'
import DonorSearchResults from '../pages/DonorSearchResults.jsx';


function Router() {
  return (
     <Routes>
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/home' element={<Home/>}  />
          <Route path='/my-account' element={<Profile/>} /> 
          <Route path='/find-donors' element={<FindDonors/>} />
          <Route path='/eligibility' element={<Eligibility/>} /> 
          <Route path='/all-donors' element={<AllDonors/>} />
          <Route path='/save-donor' element={<CreateDonors/>}/>
          <Route path='/donors/search' element={<DonorSearchResults/>} />

          {/* <Route path='/my-account' element={<MyAccount/>} />  */}
          {/* <Route path='/donor-requests' element={<DonorRequests/>} /> */}
          {/* <Route path='/donor-requests/:id' element={<RequestDetails/>} /> */}
          {/* <Route path='/donor-requests/:id/edit' element={<EditRequest/>} /> */}
          {/* <Route path='/donor-requests/:id/delete' element={<DeleteRequest/>} /> */}
          {/* <Route path='/donate' element={<Donate/>} />
          <Route path='/services' element={<Services/>}/>
          <Route path='/contact' element={<Contact/>}/>*/}
          
          <Route path='/about' element={<About/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
     </Routes>
  )
}

export default Router