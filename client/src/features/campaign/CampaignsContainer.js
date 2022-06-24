import { Group } from '@mantine/core'
import React from 'react'
import CampaignsOwnedContainer from './CampaignsOwnedContainer'
import CampaignsPlayedContainer from './CampaignsPlayedContainer'

function CampaignsContainer() {
  return (
    <Group align="center" position="center" spacing={100} grow>
      <CampaignsOwnedContainer />
      <CampaignsPlayedContainer />
    </Group>
  )
}

export default CampaignsContainer
