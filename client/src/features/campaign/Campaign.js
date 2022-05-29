import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CampaignHeader from './CampaignHeader'
import CampaignOverview from './CampaignOverview'
import CampaignSettingsContainer from './settings/CampaignSettingsContainer'

function Campaign() {
  return (
    <Routes>
      <Route path="/" element={<CampaignHeader />}>
        <Route index element={<CampaignOverview />} />
        <Route path="settings" element={<CampaignSettingsContainer />} />
      </Route>
    </Routes>
  )
}

export default Campaign
