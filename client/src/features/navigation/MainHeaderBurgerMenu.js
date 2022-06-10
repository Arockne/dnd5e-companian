import { Anchor, Avatar, Group, Text } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { Book2, Logout, Settings, Swords } from 'tabler-icons-react'

function MainHeaderBurgerMenu({ user, toggleOpened }) {
  return (
    <Group direction="column" position="center">
      <Group spacing={7}>
        <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
        <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
          {user.username}
        </Text>
      </Group>
      <Anchor
        component={Link}
        to={'/campaigns/create'}
        onClick={() => toggleOpened()}
      >
        Create Campaign
      </Anchor>
      <Anchor
        component={Link}
        to={'/campaigns/search'}
        onClick={() => toggleOpened()}
      >
        Search Campaigns
      </Anchor>
      <Anchor
        component={Link}
        to={'/characters'}
        onClick={() => toggleOpened()}
      >
        <Book2 size={14} />
        Characters
      </Anchor>
      <Anchor component={Link} to={'/campaigns'} onClick={() => toggleOpened()}>
        <Swords size={14} />
        Campaigns
      </Anchor>
    </Group>
  )
}

export default MainHeaderBurgerMenu
