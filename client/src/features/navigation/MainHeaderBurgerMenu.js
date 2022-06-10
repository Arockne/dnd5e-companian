import { Avatar, Group, Text, Button, Divider, Space } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { Book2, Logout, Settings, Swords } from 'tabler-icons-react'
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
      <Button
        onClick={() => {
          dispatch(logoutUser())
        }}
      >
        <Logout size={14} />
        Logout
      </Button>
    </Group>
  )
}

export default MainHeaderBurgerMenu
