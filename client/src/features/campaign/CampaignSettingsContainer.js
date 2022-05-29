import { Group } from '@mantine/core'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CampaignDeleteContainer from './CampaignDeleteContainer'
import CampaignUpdateContainer from './CampaignUpdateContainer'

function CampaignSettingsContainer() {
  const { campaign, status } = useSelector((state) => state.campaign)
  const navigate = useNavigate()

  useEffect(() => {
    if (!campaign) {
      navigate('/')
    }
  }, [campaign])

  return (
    <Group direction="column">
      <CampaignUpdateContainer campaign={campaign} />
      <CampaignDeleteContainer campaign={campaign} status={status} />
    </Group>
  )
}

export default CampaignSettingsContainer
