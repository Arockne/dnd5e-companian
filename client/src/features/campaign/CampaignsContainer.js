import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentCampaigns } from './campaignSlice'
import CampaignsTable from './CampaignTable'

function CampaignsContainer() {
  const dispatch = useDispatch()
  const { owned_campaigns, campaigns } = useSelector(
    (state) => state.campaign.campaigns
  )
  useEffect(() => {
    dispatch(getCurrentCampaigns())
  }, [])

  return <div></div>
}

export default CampaignsContainer
