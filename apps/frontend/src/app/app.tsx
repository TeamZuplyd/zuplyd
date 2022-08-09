// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import NxWelcome from './nx-welcome';
import SideNav from './components/side-nav/side-nav';

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

// Pages
import TestPage1 from './pages/testPage1';
import TestPage2 from './pages/testPage2';
import RegPage2 from './pages/company-admin/regPage2';
import Header from './components/header/header';
import CompanyAdmin from './pages/company-admin/companyAdmin';
import AppRoute from './app-route/app-route';
import ProfileSetUp from './pages/procurement-manager/initialization/profileSetUp';

import SignUp from './pages/home-page/signup';
import LocationSetUp from './pages/procurement-manager/initialization/locationSetUp';



export function App() {
  return (

    //<ForgetPassword/>
    // <LocationSetUp/>
  //<SignUp/>

    <AppRoute/>
    // <ProfileSetUp />
  // <div className="outerContainer">
  //     <SideNav username={'Amarabandu Rupasingheeeee'} userNum={1} />
  //     {/* <div className="header">Header goes here</div> */}
  //     <Header title={'Dashboard'} />
  //     <div className="content">
  //       <Routes>
  //         {/* <Route path="/" element={} /> */}
  //         <Route path="/page1" element={<TestPage1 />} />
  //         <Route path="/page2" element={<TestPage2 />} />
  //         {/* <Route path="/company" element={<TestPage3 />} /> */}
  //       </Routes>
  //     </div>
  //   </div>
  );
}

export default App;
