import { Group } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Loader } from 'tabler-icons-react'
import CampaignSearchContainer from '../campaign/CampaignSearchContainer'
import MainHeader from '../navigation/MainHeader'

function HomeContainer() {
  const [pageLoad, setPageLoad] = useState(false)

  useEffect(() => {
    setPageLoad(true)
  }, [])

  return pageLoad ? (
    <Routes>
      <Route path="/" element={<MainHeader />}>
        <Route path="campaigns">
          <Route path="search" element={<CampaignSearchContainer />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  ) : (
    <Group sx={{ justifyContent: 'center', height: '100vh' }}>
      <Loader size="100" variant="bars" />
    </Group>
  )
}

export default HomeContainer
