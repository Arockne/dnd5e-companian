import { Container, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import CampaignsTable from './CampaignsTable'

function CampaignsPlayedContainer() {
  const [campaigns, setCampaigns] = useState([])
  useEffect(() => {
    fetch('/api/campaigns/currently_playing').then(async (r) => {
      const body = await r.json()
      if (r.ok) {
        setCampaigns(body)
      }
    })
  }, [])
  return (
    <Container>
      <Title align="center" order={2}>
        Created Campaigns
      </Title>
      <CampaignsTable campaigns={campaigns} />
    </Container>
  )
}

export default CampaignsPlayedContainer
