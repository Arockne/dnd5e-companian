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
import NotFound from '../error/NotFound'
import Requests from '../campaign-join-request/Requests'

function Campaign() {
  const { campaign_id } = useParams()
  const dispatch = useDispatch()

  const { campaign, status, errors } = useSelector((state) => state.campaign)
  const { user } = useSelector((state) => state.user)

  const owner = campaign?.owner?.id === user?.id

  useEffect(() => {
    if (campaign?.id !== campaign_id) {
      dispatch(getCampaign(campaign_id))
    }
  }, [campaign_id])

  function renderErrorPage() {
    if (status === 'failed') {
      if (/not authorized/i.test(errors[0])) {
        return <NotAuthorized />
      }
      return <NotFound errors={errors} />
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
          <>
            <Route path="requests" element={<Requests />} />
            <Route path="settings" element={<CampaignSettingsContainer />} />
          </>
        ) : null}
      </Route>
      <Route path="/characters/:character_id/*" element={<Character />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  ) : (
    renderErrorPage()
  )
}

export default Campaign
