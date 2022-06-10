import { Avatar, Group, Text, Button, Divider, Space } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom'
import {
  Book2,
  Logout,
  Settings,
  Swords,
  MapSearch,
  World,
} from 'tabler-icons-react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../user/state/userSlice'

function MainHeaderBurgerMenu({ user, toggleOpened }) {
  const dispatch = useDispatch()
  return (
    <Group
      direction="column"
      position="center"
      spacing={0}
      grow
      style={{ maxWidth: 500, margin: '0 auto' }}
    >
      <Group spacing={7}>
        <Avatar src={user.image} alt={user.name} radius="xl" size={40} />
        <Text weight={500} size="md" sx={{ lineHeight: 0 }}>
          {user.username}
        </Text>
      </Group>
      <Divider />
      <Space h="md" />
      <Button
        component={Link}
        to={'/campaigns/create'}
        onClick={() => toggleOpened()}
        radius={0}
      >
        <Group spacing={7}>
          <World size={14} />
          <Text>Create Campaign</Text>
        </Group>
      </Button>
      <Button
        component={Link}
        to={'/campaigns/search'}
        onClick={() => toggleOpened()}
        radius={0}
      >
        <Group spacing={7}>
          <MapSearch size={14} />
          <Text>Search Campaigns</Text>
        </Group>
      </Button>
      <Divider label="User Resources" labelPosition="center" />
      <Button
        component={Link}
        to={'/characters'}
        onClick={() => toggleOpened()}
        radius={0}
      >
        <Group spacing={7}>
          <Book2 size={14} />
          <Text>Characters</Text>
        </Group>
      </Button>
      <Button
        component={Link}
        to={'/campaigns'}
        onClick={() => toggleOpened()}
        radius={0}
      >
        <Group spacing={7}>
          <Swords size={14} />
          <Text>Campaigns</Text>
        </Group>
      </Button>
      <Divider label="Settings" labelPosition="center" />
      <Button
        onClick={() => {
          dispatch(logoutUser())
        }}
      >
        <Group spacing={7}>
          <Logout size={14} />
          <Text>Logout</Text>
        </Group>
      </Button>
    </Group>
  )
}

export default MainHeaderBurgerMenu
