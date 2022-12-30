import { Group, Title } from '@mantine/core'
import React from 'react'

function CampaignPlayers({ campaign }) {
  return (
    <div>
      <Group position="center">
        <Title order={3}>Players in {campaign?.name}</Title>
      </Group>
    </div>
  )
}

export default CampaignPlayers
