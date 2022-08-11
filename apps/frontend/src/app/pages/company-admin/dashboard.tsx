import { Grid } from '@mui/material'
import React from 'react'
import DashboardCard from '../../components/dashboard-card/dashboard-card'
import Header from '../../components/header/header'

const jsonArr: any[] = [
  ["Warehouses", "Shops", "Tier", "Shop Managers", "Warehouse Managers", "Procument Managers"],

  [10, 25,"Free", 1, 2, 3]
]

function dashboard() {
  let count: number = 0

  return (
    <>
      <Header title={'Dashboard'} />

      <div className="content">
        <Grid container sx={{}} rowGap={0}>
              {jsonArr[0].map((i: string) => {
                return(
                    <Grid item xs={3} sx={{mt:1}}>
                      <DashboardCard theKey={i} theValue={jsonArr[1][count++]}/>
                    </Grid>
                )
              })}
 
          </Grid>
      </div>
    </>
  )
}

export default dashboard