import { Grid, Group, Stack, Title } from '@mantine/core'
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function CharacterHeader({ character }) {
  return (
    <Grid grow>
      <Grid.Col span={1}>
        <Stack>
          <NavLink to={`/characters/${character?.id}`}>Overview</NavLink>
        </Stack>
      </Grid.Col>
      <Grid.Col span={9}>
        <Group position="center">
          <Title order={2}>{character?.name}</Title>
        </Group>
        <Outlet />
      </Grid.Col>
    </Grid>
  )
}

export default CharacterHeader
