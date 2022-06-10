import { Anchor, Avatar, Group, Text, Button } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { Book2, Logout, Settings, Swords } from 'tabler-icons-react'

function MainHeaderBurgerMenu({ user, toggleOpened }) {
  return (
    <Group direction="column" position="center" spacing={0} radius="lg" grow>
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
      >
        Create Campaign
      </Button>
      <Button
        component={Link}
        to={'/campaigns/search'}
        onClick={() => toggleOpened()}
      >
        Search Campaigns
      </Button>
      <Button
        component={Link}
        to={'/characters'}
        onClick={() => toggleOpened()}
      >
        <Book2 size={14} />
        Characters
      </Button>
      <Button component={Link} to={'/campaigns'} onClick={() => toggleOpened()}>
        <Swords size={14} />
        Campaigns
      </Button>
    </Group>
  )
}

export default MainHeaderBurgerMenu
