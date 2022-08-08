import React from 'react'
import SideNav from '../../components/side-nav/side-nav'
import { Outlet } from 'react-router-dom'

function supplier() {
  return (
    <div className="outerContainer">
      <SideNav username={"Name here"} userNum={4} />
      <Outlet />
  </div>
  )
}

export default supplier