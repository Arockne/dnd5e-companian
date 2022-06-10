import {
  Anchor,
  Avatar,
  Group,
  Text,
  Button,
  Divider,
  Space,
  Stack,
  Container,
} from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { Book2, Logout, Settings, Swords } from 'tabler-icons-react'

function MainHeaderBurgerMenu({ user, toggleOpened }) {
  return (
    <Group
      direction="column"
      position="center"
      spacing={0}
      grow
      style={{ width: 500, margin: '0 auto' }}
    >
      <Group spacing={7}>
        <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
        <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
          {user.username}
        </Text>
      </Group>
      <Button
        component={Link}
        to={'/campaigns/create'}
        onClick={() => toggleOpened()}
        radius={0}
      >
        Create Campaign
      </Button>
      <Button
        component={Link}
        to={'/campaigns/search'}
        onClick={() => toggleOpened()}
        radius={0}
      >
        Search Campaigns
      </Button>
      <Divider label="User Resources" labelPosition="center" />
      <Button
        component={Link}
        to={'/characters'}
        onClick={() => toggleOpened()}
        radius={0}
      >
        <Book2 size={14} />
        Characters
      </Button>
      <Button
        component={Link}
        to={'/campaigns'}
        onClick={() => toggleOpened()}
        radius={0}
      >
        <Swords size={14} />
        Campaigns
      </Button>
      <Divider label="Settings" labelPosition="center" />
    </Group>
  )
}

export default MainHeaderBurgerMenu
