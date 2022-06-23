import { Group, Title } from '@mantine/core'
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
    <Group direction="column" position="center" grow>
      <Title align="center" order={2}>
        Campaigns Currently In
      </Title>
      <CampaignsTable campaigns={campaigns} />
    </Group>
  )
}

export default CampaignsPlayedContainer
