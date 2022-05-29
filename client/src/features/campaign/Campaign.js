import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useParams } from 'react-router-dom'
import CampaignHeader from './CampaignHeader'
import CampaignOverview from './CampaignOverview'
import { getCampaign } from './campaignSlice'
import CampaignSettingsContainer from './settings/CampaignSettingsContainer'

function Campaign() {
  const { id } = useParams()
  const dispatch = useDispatch()

  const { campaign } = useSelector((state) => state.campaign)
  const { user } = useSelector((state) => state.user)

  const owner = campaign?.owner?.id === user?.id

  useEffect(() => {
    if (campaign?.id !== id) {
      dispatch(getCampaign(id))
    }
  }, [id])

  return (
    <Routes>
      <Route
        path="/"
        element={<CampaignHeader campaign={campaign} owner={owner} />}
      >
        <Route index element={<CampaignOverview />} />
        {owner ? (
          <Route path="settings" element={<CampaignSettingsContainer />} />
        ) : null}
      </Route>
    </Routes>
  )
}

export default Campaign
