import { Container, Space } from '@mantine/core'
import React from 'react'
import { useSelector } from 'react-redux'
import CampaignDeleteContainer from './CampaignDeleteContainer'
import CampaignUpdateContainer from './CampaignUpdateContainer'

function CampaignSettingsContainer() {
  const { campaign, status, errors } = useSelector((state) => state.campaign)

  return (
    <Container>
      <CampaignUpdateContainer
        campaign={campaign}
        status={status}
        errors={errors}
      />
      <Space h="lg" />
      <CampaignDeleteContainer campaign={campaign} status={status} />
    </Container>
  )
}

export default CampaignSettingsContainer
