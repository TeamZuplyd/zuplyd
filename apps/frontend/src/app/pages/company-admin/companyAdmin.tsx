import React from 'react'
import SideNav from '../../components/side-nav/side-nav'
import { Outlet } from 'react-router-dom'

function companyAdmin() {
  return (
    <div className="outerContainer">
      <SideNav username={"Name here"} userNum={0} />
      <Outlet />
    </div>
  )
}

export default companyAdmin