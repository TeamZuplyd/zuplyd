/* eslint-disable-next-line */
import {
  ChevronLeftIcon,
  CogIcon,
  LogoutIcon,
  ViewGridIcon,
  OfficeBuildingIcon,
  DocumentReportIcon,
  LinkIcon,
  TruckIcon,
  ArchiveIcon,
} from '@heroicons/react/outline';

import { useState } from 'react';

export interface SideNavProps {
  username: string;
  userNum: number;
}

export function SideNav({ username, userNum }: SideNavProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState(() => 0);
  let providedOpts = coreData[userNum]['options'];
  let userRole = coreData[userNum]['userRole'];

  return (
    <div className={`sideNav ${collapsed && 'collapsed'}`}>
      <ChevronLeftIcon
        className="collapseBtn"
        onClick={() => setCollapsed(!collapsed)}
      />

      {/* Logo section - Start  */}
      <div className="logoContainer">
        <img src="./assets/svg/logoLight.svg" className="" alt="appLogo" />
      </div>
      {/* Logo section - End  */}

      {/* Options section - Start  */}
      <div className="optionsContainer">
        {providedOpts.map((option: string, index: number) => (
          <div
            className={`sideNav-option ${selected == index && 'selected'}`}
            onClick={() => setSelected(index)}
          >
            {option[0]}
            <span className="optionName">{option[1]}</span>
          </div>
        ))}
      </div>
      {/* Options section - End  */}

      {/* Profile operations section - Start  */}
      <div className="profileOperations">
        <div className="sideNav-option">
          <CogIcon className="sideNav-icon" />
          <span className="optionName">Settings</span>
        </div>
        <div className="sideNav-option">
          <LogoutIcon className="sideNav-icon" />
          <span className="optionName">Logout</span>
        </div>
      </div>
      {/* Profile operations section - End  */}

      {/* Profile details section - Start  */}
      <div className="profileDetails">
        <img
          src="./assets/imgs/sample.jpg"
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
      [<ViewGridIcon className="sideNav-icon" />, 'Dashboard'],
      [<LinkIcon className="sideNav-icon" />, 'Supply Chain'],
      [<OfficeBuildingIcon className="sideNav-icon" />, 'Company'],
      [<DocumentReportIcon className="sideNav-icon" />, 'Reports'],
    ],
  },
  1: {
    userRole: 'Procurement Manager',
    options: [
      [<ViewGridIcon className="sideNav-icon" />, 'Dashboard'],
      [<ViewGridIcon className="sideNav-icon" />, 'Goods Requests'],
      [<ViewGridIcon className="sideNav-icon" />, 'Procurements'],
      [<ViewGridIcon className="sideNav-icon" />, 'Products'],
      [<ViewGridIcon className="sideNav-icon" />, 'Issues'],
      [<ViewGridIcon className="sideNav-icon" />, 'Reports'],
    ],
  },
  2: {
    userRole: 'Warehouse Manager',
    options: [
      'Dashboard',
      'Inventory',
      'Orders',
      'Issues',
      'Shops',
      'Reports',
      'EzPz',
    ],
  },
  3: {
    userRole: 'Shop Manager',
    options: [
      'Dashboard',
      'Inventory',
      'Orders',
      'Issues',
      'Shops',
      'Reports',
      'EzPz',
    ],
  },
  4: {
    userRole: 'Supplier',
    options: [
      'Dashboard',
      'Products',
      'Quotations',
      'Orders',
      'Companiess',
      'Reports',
    ],
  },
};
