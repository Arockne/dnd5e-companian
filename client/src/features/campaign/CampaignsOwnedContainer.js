import { Container, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { client } from '../../api/client'
import CampaignsTable from './CampaignsTable'

function CampaignsOwnedContainer() {
  const [campaigns, setCampaigns] = useState([])
  useEffect(() => {
    fetch('/api/campaigns/currently_owned').then(async (r) => {
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

export default CampaignsOwnedContainer
