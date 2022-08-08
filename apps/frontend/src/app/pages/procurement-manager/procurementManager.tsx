import React from 'react'
import SideNav from '../../components/side-nav/side-nav'
import { Outlet } from 'react-router-dom'

function procurementManager() {
  return (
    <div className="outerContainer">
        <SideNav username={"Name here"} userNum={1} />
        <Outlet />
    </div>
  )
}

export default procurementManager