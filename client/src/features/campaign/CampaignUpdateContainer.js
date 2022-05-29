import React from 'react'
import CampaignUpdateForm from './CampaignUpdateForm'

function CampaignUpdateContainer({ campaign }) {
  return (
    <>
      <CampaignUpdateForm campaign={campaign} />
    </>
  )
}

export default CampaignUpdateContainer
