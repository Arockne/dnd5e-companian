import { Group } from '@mantine/core'
import React from 'react'
import { useSelector } from 'react-redux'
import CampaignDeleteContainer from './CampaignDeleteContainer'
import CampaignUpdateForm from './CampaignUpdateForm'

function CampaignSettingsContainer() {
  const { campaign, status } = useSelector((state) => state.campaign)

  return (
    <Group direction="column">
      <CampaignUpdateForm campaign={campaign} />
      <CampaignDeleteContainer campaign={campaign} status={status} />
    </Group>
  )
}

export default CampaignSettingsContainer
