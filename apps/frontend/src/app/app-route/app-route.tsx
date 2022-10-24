/* eslint-disable-next-line */
import Signup from '../pages/home-page/signup';
import LandingPage from '../pages/landing-page/landing-page';

import RegPage2 from '../pages/company-admin/regPage2';
import RegPage3 from '../pages/company-admin/regPage3';
import RegPage4 from '../pages/company-admin/regPage4';
import RegPage5 from '../pages/company-admin/regPage5';

import CompanyAdmin from '../pages/company-admin/companyAdmin';
import CAdashboard from '../pages/company-admin/dashboard';
import SupplyChain from '../pages/company-admin/supplyChain';
import Company from '../pages/company-admin/company';
import CAReports from '../pages/company-admin/reports';
import CASettings from '../pages/company-admin/settings';

import ProcurementManager from '../pages/procurement-manager/procurementManager';
import PDashboard from '../pages/procurement-manager/dashboard';
import PGoodRequests from '../pages/procurement-manager/goodRequests';
import PIssues from '../pages/procurement-manager/issues';
import PProcurement from '../pages/procurement-manager/procurement';
import PProducts from '../pages/procurement-manager/products';
import PReports from '../pages/procurement-manager/reports';
import PSettings from '../pages/procurement-manager/settings';

import WarehouseManager from '../pages/warehouse-manager/whManager';
import WHMdashboard from '../pages/warehouse-manager/dashboard';
import WHMinventory from '../pages/warehouse-manager/inventory';
import WHMissues from '../pages/warehouse-manager/issues';
import WHMOrders from '../pages/warehouse-manager/orders';
import WHMShops from '../pages/warehouse-manager/shops';
import WHMReports from '../pages/warehouse-manager/reports';
import WHMSettings from '../pages/warehouse-manager/settings';

import ShopManager from '../pages/shop-manager/shopManager';
import SMdashboard from '../pages/shop-manager/dashboard';
import SMinventory from '../pages/shop-manager/inventory';
import SMissues from '../pages/shop-manager/issues';
import SMOrders from '../pages/shop-manager/orders';
import SMReports from '../pages/shop-manager/reports';
import SMSettings from '../pages/shop-manager/settings';

import Supplier from '../pages/supplier/supplier';
import SupDashboard from '../pages/supplier/dashboard';
import SupOrders from '../pages/supplier/orders';
import SupProducts from '../pages/supplier/products';
import SupQuotations from '../pages/supplier/quotations';
import SupCompanies from '../pages/supplier/companies';
import SupReports from '../pages/supplier/reports';
import SupSettings from '../pages/supplier/settings';

import PageNotFound from '../pages/PageNotFound';

import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useAuth0, User } from '@auth0/auth0-react';
import Table from '../pages/warehouse-manager/table';

import { useQuery } from 'react-query';

import axios from 'axios';
import SignupButton from '../components/signup-button/signup-button';
import LogoutButton from '../components/logout-button/logout-button';
import ProfileSetup from '../pages/procurement-manager/initialization/profileSetUp';
import RequestProg from '../pages/supplier/request';

export interface AppRouteProps {}

const defaultLinkForUser = new Map<string, string>([
  ['comp_admin', '/company-admin'],
  ['proc_mngr', '/procurement-manager'],
  ['wh_mngr', '/warehouse-manager'],
  ['sh_mngr', '/shop-manager'],
  ['supl', '/supplier'],
  ['default', '/'],
]);

const ProtectedRoute = ({ user, role, children }: { user?: {}; role: string; children?: JSX.Element }) => {
  const auth = useAuth0();
  let roleFromUserMgmt: string = 'default';
  const { data, isLoading } = useQuery(['userRole', user], () => fetchUserRole(user));
  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (!auth.isLoading) {
    //TO DO: call the user management microcservice to get the user role based on the user email
    // roleFromUserMgmt = 'comp_admin';

    if (typeof data?.data.user == 'undefined') {
      return <Navigate to={defaultLinkForUser.get(roleFromUserMgmt)!} replace />;
    }

    roleFromUserMgmt = data?.data.user.role;
    // console.log(data?.data);

    if (auth.isAuthenticated && user && role === roleFromUserMgmt) {
      return children ? children : <Outlet />;
    }
  }
  return <Navigate to={defaultLinkForUser.get(roleFromUserMgmt)!} replace />;
};

const RoleBasedDefaultRouting = ({ user, children }: { user?: {}; children?: JSX.Element; redirectPath?: string }) => {
  const auth = useAuth0();
  let roleFromUserMgmt: string = 'default';
  const { data, isLoading } = useQuery(['userRole', user], () => fetchUserRole(user));

  if (isLoading && user) {
    return <span>Loading...</span>;
  }
  if (!auth.isLoading) {
    //TO DO: call the user management microcservice to get the user role based on the user email
    // console.log(data?.data);
    // roleFromUserMgmt = 'comp_admin';
    if (typeof data?.data.user == 'undefined') {
      return children ? children : <Outlet />;
    }

    roleFromUserMgmt = data?.data.user.role;

    if (auth.isAuthenticated && user) {
      return <Navigate to={defaultLinkForUser.get(roleFromUserMgmt)!} replace />;
    }
  }
  return children ? children : <Outlet />;
};

const InitBasedRouting = ({ user, children, redirectPath }: { user?: {}; children?: JSX.Element; redirectPath: string }) => {
  const auth = useAuth0();
  let roleFromUserMgmt: string = 'default';
  const { data, isLoading } = useQuery(['userRole', user], () => fetchUserRole(user));

  if (isLoading && user) {
    return <span>Loading...</span>;
  }
  if (!auth.isLoading) {
    //TO DO: call the user management microcservice to get the user role based on the user email
    // console.log(data?.data);
    // roleFromUserMgmt = 'comp_admin';

    if (typeof data?.data.user == 'undefined') {
      if (data?.data.error == 'no_such_user') {
        return <Navigate to={redirectPath} replace />;
      }
      return children ? children : <Outlet />;
    }

    roleFromUserMgmt = data?.data.user.role;

    if (auth.isAuthenticated && user) {
      return <Navigate to={defaultLinkForUser.get(roleFromUserMgmt)!} replace />;
    }
  }
  return children ? children : <Outlet />;
};

const fetchUserRole = (user: any) => {
  if (typeof user == 'undefined') {
    return axios.get('http://localhost:7000/api/user-mgmt/find/', { responseType: 'json' });
  }
  const email = user.email ? user.email : '';
  //these axios requests need to be configured correctly and best practices must be followed
  return axios.get('http://localhost:7000/api/user-mgmt/find/' + email, { responseType: 'json' });
};

export function AppRoute(props: AppRouteProps) {
  const [user, setUser] = React.useState<User>();

  const auth = useAuth0();

  useEffect(() => {
    setUser(auth.user);
  }, [auth.user]);

  return (
    <Routes>
      {/* landing page */}
      {/* 
      <Route path="/" element=( <LandingPage />)>
        <Route path="signup" element=(<Signup />)/>
        <Route path="login" element=(<Login />)/>
      </Route> 
      */}

      <Route element={<RoleBasedDefaultRouting user={user} />}>
        <Route element={<InitBasedRouting user={user} redirectPath={'comp-init-1'} />}>
          {/* <Route path="/" element={<Signup />}></Route> */}
          <Route path="/" element={<LandingPage />} />
        </Route>
      </Route>

      <Route path="comp-init-1" element={<RegPage2 />} />
      <Route path="comp-init-2" element={<RegPage3 />} />
      <Route path="comp-init-3" element={<RegPage4 />} />
      <Route path="comp-init-4" element={<RegPage5 />} />
      <Route path="profile-setup" element={<ProfileSetup />} />
      <Route path="signup" element={<SignupButton />} />
      <Route path="logout" element={<LogoutButton />} />

      {/* <Route element={<ProtectedRoute user={user} role={'comp_admin'} />}> */}
      <Route path="/company-admin" element={<CompanyAdmin />}>
        <Route index element={<Navigate to={'dashboard'} replace />} />
        <Route path="dashboard" element={<CAdashboard />} />
        <Route path="supply-Chain" element={<SupplyChain />} />
        <Route path="company" element={<Company />} />
        <Route path="reports" element={<CAReports />} />
        <Route path="settings" element={<CASettings />} />
      </Route>
      {/* </Route> */}

      {/* <Route element={<ProtectedRoute user={user} role={'proc_mngr'} />}> */}
      <Route path="/procurement-manager" element={<ProcurementManager />}>
        <Route index element={<Navigate to={'dashboard'} replace />} />
        <Route path="dashboard" element={<PDashboard />} />
        <Route path="goodRequests" element={<PGoodRequests />} />
        <Route path="issues" element={<PIssues />} />
        <Route path="procurement" element={<PProcurement />} />
        <Route path="products" element={<PProducts />} />
        <Route path="reports" element={<PReports />} />
        <Route path="settings" element={<PSettings />} />
      </Route>
      {/* </Route> */}

      {/* <Route element={<ProtectedRoute user={user} role={'wh_mngr'} />}> */}
      <Route path="/warehouse-manager" element={<WarehouseManager />}>
        <Route index element={<Navigate to={'dashboard'} replace />} />
        <Route path="dashboard" element={<WHMdashboard />} />
        <Route path="inventory" element={<WHMinventory />} />
        <Route path="inventory/:id" element={<Table />} />
        <Route path="orders" element={<WHMOrders />} />
        <Route path="issues" element={<WHMissues />} />
        <Route path="shops" element={<WHMShops />} />
        <Route path="reports" element={<WHMReports />} />
        <Route path="settings" element={<WHMSettings />} />
      </Route>
      {/* </Route> */}

      {/* <Route element={<ProtectedRoute user={user} role={'sh_mngr'} />}> */}
      <Route path="/shop-manager" element={<ShopManager />}>
        <Route index element={<Navigate to={'dashboard'} replace />} />
        <Route path="dashboard" element={<SMdashboard />} />
        <Route path="inventory" element={<SMinventory />} />
        <Route path="inventory/:id" element={<Table />} />
        <Route path="orders" element={<SMOrders />} />
        <Route path="issues" element={<SMissues />} />
        <Route path="reports" element={<SMReports />} />
        <Route path="settings" element={<SMSettings />} />
      </Route>
      {/* </Route> */}

      {/* <Route element={<ProtectedRoute user={user} role={'supl'} />}> */}
      <Route path="/supplier" element={<Supplier />}>
        <Route index element={<Navigate to={'dashboard'} replace />} />
        <Route path="dashboard" element={<SupDashboard />} />
        <Route path="products" element={<SupProducts />} />
        <Route path="orders" element={<SupOrders />} />
        <Route path="quotations" element={<SupQuotations />} />
        <Route path="companies" element={<SupCompanies />} />
        <Route path="reports" element={<RequestProg />} />
        <Route path="settings" element={<SupSettings />} />
      </Route>
      {/* </Route> */}
      {/* Catch all route */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRoute;
