import React from 'react'
import { Anchor, Grid, Group, Stack, Tabs } from '@mantine/core'
import { MessageCircle, Photo, Settings } from 'tabler-icons-react'
import { NavLink, Outlet } from 'react-router-dom'

export function CampaignHeader() {
  return (
    <Grid grow>
      <Grid.Col span={1}>
        <Stack>
          <NavLink to="/campaigns/1">Overview</NavLink>
          <NavLink to="/campaigns/1">Players</NavLink>
          <NavLink to="/campaigns/1">Messages</NavLink>
          <NavLink to="/campaigns/1">Logs</NavLink>
          <NavLink to="/campaigns/1">Settings</NavLink>
        </Stack>
      </Grid.Col>
      <Grid.Col span={9}>
        <Outlet />
      </Grid.Col>
    </Grid>
  )
}

export default CampaignHeader
