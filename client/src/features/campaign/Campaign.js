import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useParams } from 'react-router-dom'
import Character from '../character/Character'
import CampaignHeader from './CampaignHeader'
import CampaignOverview from './CampaignOverview'
import { getCampaign } from './campaignSlice'
import CampaignSettingsContainer from './settings/CampaignSettingsContainer'
import CharacterForm from '../character/CharacterForm'
import NotAuthorized from '../error/NotAuthorized'

function Campaign() {
  const { campaign_id } = useParams()
  const dispatch = useDispatch()

  const { campaign, status } = useSelector((state) => state.campaign)
  const { user } = useSelector((state) => state.user)

  const owner = campaign?.owner?.id === user?.id

  useEffect(() => {
    if (campaign?.id !== campaign_id) {
      dispatch(getCampaign(campaign_id))
    }
  }, [campaign_id])

  function renderErrorPage() {
    if (status === 'failed') {
      return <NotAuthorized />
    } else {
      return <div></div>
    }
  }

  return campaign ? (
    <Routes>
      <Route
        path="/"
        element={<CampaignHeader campaign={campaign} owner={owner} />}
      >
        <Route index element={<CampaignOverview />} />
        <Route path="/characters/create" element={<CharacterForm />} />
        {owner ? (
          <Route path="settings" element={<CampaignSettingsContainer />} />
        ) : null}
      </Route>
      <Route path="/characters/:character_id/*" element={<Character />} />
    </Routes>
  ) : (
    renderErrorPage()
  )
}

export default Campaign
