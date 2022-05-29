import { Group } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Loader } from 'tabler-icons-react'
import CampaignForm from '../campaign/CampaignForm'
import CampaignsContainer from '../campaign/CampaignsContainer'
import CampaignSearchContainer from '../campaign-search/CampaignSearchContainer'
import MainHeader from '../navigation/MainHeader'
import CampaignHeader from '../campaign/CampaignHeader'
import CampaignOverview from '../campaign/CampaignOverview'
import CampaignSettingsContainer from '../campaign/CampaignSettingsContainer'

function HomeContainer() {
  const [pageLoad, setPageLoad] = useState(false)

  useEffect(() => {
    setPageLoad(true)
  }, [])

  return pageLoad ? (
    <Routes>
      <Route path="/" element={<MainHeader />}>
        <Route path="campaigns/search" element={<CampaignSearchContainer />} />
        <Route path="campaigns/create" element={<CampaignForm />} />
        <Route path="campaigns" element={<CampaignsContainer />} />
        <Route path="campaigns/:id" element={<CampaignHeader />}>
          <Route index element={<CampaignOverview />} />
          <Route path="settings" element={<CampaignSettingsContainer />} />
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
