import React from 'react'
import CampaignUpdateForm from './CampaignUpdateForm'

function CampaignUpdateContainer({ campaign, status }) {
  return (
    <>
      <CampaignUpdateForm campaign={campaign} status={status} />
    </>
  )
}

export default CampaignUpdateContainer
