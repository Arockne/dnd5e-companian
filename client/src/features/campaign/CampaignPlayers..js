import { Group, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { client } from '../../api/client'

function CampaignPlayers({ campaign }) {
  const [players, setPlayers] = useState([])

  useEffect(async () => {
    const response = await client.get(`/api/campaigns/${campaign.id}/players`)
    const body = await response.json()
    if (response.ok) {
      setPlayers(body)
    }
  }, [])

  return (
    <div>
      <Group position="center">
        <Title order={3}>Players in {campaign?.name}</Title>
      </Group>
    </div>
  )
}

export default CampaignPlayers
