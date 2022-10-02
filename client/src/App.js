import './App.css';
import SignUp from './pages/signup.page';
import { Route, Routes, Redirect } from 'react-router-dom';
import SignIn from './pages/signin.page';
import Home from './pages/home.page';
import UserProfile from './pages/profile.page';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search from './pages/search.page';
import Messages from './pages/messages.page';
import MessageUI from './components/messageui.component';
import DashBoard from './pages/dashboard.page';
import DashUsers from './components/DashBoardUsers.componet';
import DashPosts from './pages/dashposts.page';
import NotificationsPage from './pages/notification.page';
import VerificationPage from './pages/userVerification.page';
import ProfileView from './pages/profileview.page';
import Reports from './pages/reports.page';
import DashSettings from './pages/dashboardsetting.page';



function App() {


  return (
    <div className="App w-full overflow-x-hidden">   
       <Routes>
   
           <Route exact path = "/auth/user/login" element={<SignIn/>} />
           <Route exact path = "/auth/user/register" element={<SignUp/>} />
           <Route exact path = "/home" element={ <Home/>}/>
           <Route exact path = "/" element={<Home/>} />
           <Route exact path = "/search" element={<Search/>} > </Route >
            <Route exact path='/search/profile/:id' element={<ProfileView/>} />
            <Route exact path='/notifications' element={<NotificationsPage />} />
           <Route exact path = "/user/profile" element={<UserProfile/>} />
           <Route exact path="/messages/:id" element={<MessageUI/>} />
           <Route exact path = "/messages" element={<Messages/>}/>
           <Route exact path = "/admin/dashboard/home" element={<DashBoard/>}/>
           <Route exact path = "/admin/dashboard/users" element={<DashUsers/>}/>
           <Route exact path = "/admin/dashboard/posts" element={<DashPosts/>}/>
           <Route exact path = "/user/verification/page" element={<VerificationPage />}/>
           <Route exact path="/admin/dashboard/reports" element={<Reports />} />
           <Route exact path="/admin/dashboard/settings" element={<DashSettings />} />
          
       
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
