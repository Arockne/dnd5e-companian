import { Group, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'

function CampaignPlayers({ campaign }) {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    fetch(`/api/campaigns/${campaign.id}/players`).then(async (r) => {
      const body = await r.json()
      if (r.ok) {
        setPlayers(body)
      }
    })
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
