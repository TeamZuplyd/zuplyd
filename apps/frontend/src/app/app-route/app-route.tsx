/* eslint-disable-next-line */

import CompanyAdmin from "../pages/company-admin/companyAdmin"
import CAdashboard from "../pages/company-admin/dashboard"
import SupplyChain from "../pages/company-admin/supplyChain"
import Company from "../pages/company-admin/company"
import CAReports from "../pages/company-admin/reports"
import CASettings from "../pages/company-admin/settings"

import ProcurementManager from "../pages/procurement-manager/procurementManager"
import PDashboard from "../pages/procurement-manager/dashboard"
import PGoodRequests from "../pages/procurement-manager/goodRequests"
import PIssues from "../pages/procurement-manager/issues"
import PProcurement from "../pages/procurement-manager/procurement"
import PProducts from "../pages/procurement-manager/products"
import PReports from "../pages/procurement-manager/reports"
import PSettings from "../pages/procurement-manager/settings"

import WarehouseManager from "../pages/warehouse-manager/whManager"
import WHMdashboard from "../pages/warehouse-manager/dashboard"
import WHMinventory from "../pages/warehouse-manager/inventory"
import WHMissues from "../pages/warehouse-manager/issues"
import WHMOrders from "../pages/warehouse-manager/orders"
import WHMReports from "../pages/warehouse-manager/reports"
import WHMSettings from "../pages/warehouse-manager/settings"

import ShopManager from "../pages/shop-manager/shopManager"
import SMdashboard from "../pages/shop-manager/dashboard"
import SMinventory from "../pages/shop-manager/inventory"
import SMissues from "../pages/shop-manager/issues"
import SMOrders from "../pages/shop-manager/orders"
import SMReports from "../pages/shop-manager/reports"
import SMSettings from "../pages/shop-manager/settings"

import Supplier from "../pages/supplier/supplier"
import SupDashboard from "../pages/supplier/dashboard"
import SupOrders from "../pages/supplier/orders"
import SupProducts from "../pages/supplier/products"
import SupQuotations from "../pages/supplier/quotations"
import SupCompanies from "../pages/supplier/companies"
import SupReports from "../pages/supplier/reports"
import SupSettings from "../pages/supplier/settings"

import { Routes, Route } from "react-router-dom";
export interface AppRouteProps {}

export function AppRoute(props: AppRouteProps) {
  return (
    <Routes>

      {/* landing page */}
      {/* 
      <Route path="/" element=( <LandingPage />)>
        <Route path="signup" element=(<Signup />)/>
        <Route path="login" element=(<Login />)/>
      </Route> 
      */}
    
      <Route path="/company-admin" element={<CompanyAdmin />}>
          <Route path="dashboard" element={<CAdashboard />}/>
          <Route path="supply-Chain" element={<SupplyChain />}/>
          <Route path="company" element={<Company />}/>
          <Route path="reports" element={<CAReports />}/>
          <Route path="settings" element={<CASettings />}/>
      </Route>  

      <Route path="/procurement-manager" element={<ProcurementManager />}>
          <Route path="dashboard" element={<PDashboard />}/>
          <Route path="goodRequests" element={<PGoodRequests />}/>
          <Route path="issues" element={<PIssues />}/>
          <Route path="procurement" element={<PProcurement />}/>
          <Route path="products" element={<PProducts />}/>
          <Route path="reports" element={<PReports />} />
          <Route path="settings" element={<PSettings />} />
      </Route>  
      
      <Route path="/warehouse-manager" element={<WarehouseManager />}>
          <Route path="dashboard" element={<WHMdashboard />}/>
          <Route path="inventory" element={<WHMinventory />}/>
          <Route path="orders" element={<WHMOrders />}/>
          <Route path="issues" element={<WHMissues />}/>
          <Route path="reports" element={<WHMReports />}/>
          <Route path="settings" element={<WHMSettings />} />
      </Route>  

      <Route path="/shop-manager" element={<ShopManager />}>
          <Route path="dashboard" element={<SMdashboard />}/>
          <Route path="inventory" element={<SMinventory />}/>
          <Route path="orders" element={<SMOrders />}/>
          <Route path="issues" element={<SMissues />}/>
          <Route path="reports" element={<SMReports />}/>
          <Route path="settings" element={<SMSettings />} />
      </Route>  

      <Route path="/supplier" element={<Supplier />}>
          <Route path="dashboard" element={<SupDashboard />}/>
          <Route path="products" element={<SupProducts />}/>
          <Route path="orders" element={<SupOrders />}/>
          <Route path="quotations" element={<SupQuotations />}/>
          <Route path="companies" element={<SupCompanies />}/>
          <Route path="reports" element={<SupReports />}/>
          <Route path="settings" element={<SupSettings />} />
      </Route>  

    </Routes>
  );
}

export default AppRoute;
