/* eslint-disable-next-line */
import { useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import { ChevronLeftIcon, CogIcon, LogoutIcon, ViewGridIcon, OfficeBuildingIcon, DocumentReportIcon, LinkIcon, TruckIcon, ArchiveIcon, CollectionIcon, DocumentTextIcon, QuestionMarkCircleIcon, ClipboardListIcon } from '@heroicons/react/outline';
import { useAuth0 } from '@auth0/auth0-react';

export interface SideNavProps {
  username: string;
  userNum: number;
}

export function SideNav({ username, userNum }: SideNavProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState(() => 0);
  let providedOpts = coreData[userNum]['options'];
  let userRole = coreData[userNum]['userRole'];

  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      returnTo: window.location.origin,
    });
  };

  return (
    <div className={`sideNav ${collapsed && 'collapsed'}`}>
      <ChevronLeftIcon className="collapseBtn" onClick={() => setCollapsed(!collapsed)} />

      {/* Logo section - Start  */}
      <div className="logoContainer">
        <img src="./assets/svg/logoLight.svg" className="logo" alt="appLogo" />
      </div>
      {/* Logo section - End  */}

      {/* Options section - Start  */}
      <div className="optionsContainer">
        {providedOpts.map((option: string, index: number) => (
          <Link to={option[2]}>
            <div className={`sideNav-option ${selected == index && 'selected'}`} onClick={() => setSelected(index)}>
              {option[0]}
              <span className="optionName">{option[1]}</span>
            </div>
          </Link>
        ))}
      </div>
      {/* Options section - End  */}

      {/* Profile operations section - Start  */}
      <div className="profileOperations">
        <Link to="settings">
          <div className="sideNav-option">
            <CogIcon className="sideNav-icon" />
            <span className="optionName">Settings</span>
          </div>
        </Link>
        <div className="sideNav-option">
          <LogoutIcon className="sideNav-icon" />
          <span onClick={handleLogout} className="optionName">
            Logout
          </span>
        </div>
      </div>
      {/* Profile operations section - End  */}

      {/* Profile details section - Start  */}
      <div className="profileDetails">
        <img
          src="./assets/imgs/sample.png"
          // TODO: set image properly
          alt="profileImg"
          className="profileImg"
        />
        <div className="usernameContainer">
          <span className="username">{username}</span>
          <span className="userRole">{userRole}</span>
        </div>
      </div>
      {/* Profile details section - End  */}
    </div>
  );
}

export default SideNav;

const coreData: { [key: number]: any } = {
  0: {
    userRole: 'Company Admin',
    options: [
      /**
       * Structure of options array
       * [ iconComponent, optionName, redirectedPath]
       */
      [<ViewGridIcon className="sideNav-icon" />, 'Dashboard', '/company-admin/dashboard'],
      [<LinkIcon className="sideNav-icon" />, 'Supply Chain', '/company-admin/Supply-Chain'],
      [<OfficeBuildingIcon className="sideNav-icon" />, 'Company', '/company-admin/company'],
      [<DocumentReportIcon className="sideNav-icon" />, 'Reports', '/company-admin/reports'],
    ],
  },
  1: {
    userRole: 'Procurement Manager',
    options: [
      [<ViewGridIcon className="sideNav-icon" />, 'Dashboard', '/procurement-manager/dashboard'],
      [<DocumentTextIcon className="sideNav-icon" />, 'Good Requests', '/procurement-manager/goodRequests'],
      [<TruckIcon className="sideNav-icon" />, 'Procurement', '/procurement-manager/procurement'],
      [<CollectionIcon className="sideNav-icon" />, 'Products', '/procurement-manager/products'],
      [<QuestionMarkCircleIcon className="sideNav-icon" />, 'Issues', '/procurement-manager/issues'],
      [<DocumentReportIcon className="sideNav-icon" />, 'Reports', '/procurement-manager/reports'],
    ],
  },
  2: {
    userRole: 'Warehouse Manager',
    options: [
      [<ViewGridIcon className="sideNav-icon" />, 'Dashboard', '/warehouse-manager/dashboard'],
      [<DocumentTextIcon className="sideNav-icon" />, 'Inventory', '/warehouse-manager/inventory'],
      [<ClipboardListIcon className="sideNav-icon" />, 'Orders', '/warehouse-manager/orders'],
      [<OfficeBuildingIcon className="sideNav-icon" />, 'Shops', '/warehouse-manager/shops'],
      [<QuestionMarkCircleIcon className="sideNav-icon" />, 'Issues', '/warehouse-manager/issues'],
      [<DocumentReportIcon className="sideNav-icon" />, 'Reports', '/warehouse-manager/reports'],
    ],
  },
  3: {
    userRole: 'Shop Manager',
    options: [
      [<ViewGridIcon className="sideNav-icon" />, 'Dashboard', '/shop-manager/dashboard'],
      [<DocumentTextIcon className="sideNav-icon" />, 'Inventory', '/shop-manager/inventory'],
      [<ClipboardListIcon className="sideNav-icon" />, 'Orders', '/shop-manager/orders'],
      [<QuestionMarkCircleIcon className="sideNav-icon" />, 'Issues', '/shop-manager/issues'],
      [<DocumentReportIcon className="sideNav-icon" />, 'Reports', '/shop-manager/reports'],
    ],
  },
  4: {
    userRole: 'Supplier',
    options: [
      [<ViewGridIcon className="sideNav-icon" />, 'Dashboard', '/supplier/dashboard'],
      [<CollectionIcon className="sideNav-icon" />, 'Products', '/supplier/products'],
      [<ClipboardListIcon className="sideNav-icon" />, 'Orders', '/supplier/orders'],
      [<DocumentTextIcon className="sideNav-icon" />, 'Quotations', '/supplier/quotations'],
      [<OfficeBuildingIcon className="sideNav-icon" />, 'Companies', '/supplier/companies'],
      [<DocumentReportIcon className="sideNav-icon" />, 'Reports', '/supplier/reports'],
    ],
  },
};
