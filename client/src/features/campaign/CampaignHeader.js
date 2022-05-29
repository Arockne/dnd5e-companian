import React, { useEffect } from 'react'
import { Anchor, Grid, Group, Loader, Stack, Tabs, Title } from '@mantine/core'
import { MessageCircle, Photo, Settings } from 'tabler-icons-react'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCampaign } from './campaignSlice'

export function CampaignHeader({ campaign }) {
  return (
    <Grid grow>
      <Grid.Col span={1}>
        <Stack>
          <NavLink to={`/campaigns/${campaign?.id}`}>Overview</NavLink>
          <NavLink to={`/campaigns/${campaign?.id}`}>Players</NavLink>
          <NavLink to={`/campaigns/${campaign?.id}`}>Messages</NavLink>
          <NavLink to={`/campaigns/${campaign?.id}`}>Logs</NavLink>
          <NavLink to={`/campaigns/${campaign?.id}/settings`}>Settings</NavLink>
        </Stack>
      </Grid.Col>
      <Grid.Col span={9}>
        <Group position="center">
          <Title order={2}>{campaign?.name}</Title>
        </Group>
        <Outlet />
      </Grid.Col>
    </Grid>
  )
}

export default CampaignHeader
