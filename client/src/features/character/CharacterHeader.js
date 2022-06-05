import { Grid, Group, Stack, Title } from '@mantine/core'
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function CharacterHeader({ character }) {
  return (
    <Grid grow>
      <Grid.Col span={1}>
        <Stack>
          <NavLink
            to={`/campaigns/${character?.campaign.id}/characters/${character?.id}`}
          >
            Overview
          </NavLink>
        </Stack>
      </Grid.Col>
      <Grid.Col span={9}>
        <Outlet />
      </Grid.Col>
    </Grid>
  )
}

export default CharacterHeader
