import {
  Avatar,
  createStyles,
  Group,
  ScrollArea,
  Table,
  Text,
} from '@mantine/core'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}))

function CharactersTable({ characters }) {
  const { classes, cx } = useStyles()
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  const rows = characters?.map((character) => (
    <tr
      key={character.id}
      style={{ cursor: 'pointer' }}
      onClick={() =>
        navigate(
          `/campaigns/${character.campaign.id}/characters/${character.id}`
        )
      }
    >
      <td>
        <Group spacing="xs">
          <Avatar size={26} src={character.image_url} radius={26} />
          <Text size="xs" weight={500}>
            {character.name}
          </Text>
        </Group>
      </td>
      <td>
        <Text size="xs" weight={500}>
          {character.profession}
        </Text>
      </td>
      <td>{character?.strength}</td>
      <td>{character?.dexterity}</td>
      <td>{character?.constitution}</td>
      <td>{character?.intelligence}</td>
      <td>{character?.wisdom}</td>
      <td>{character?.charisma}</td>
      <td>
        <Text size="xs" weight={500}>
          {character.campaign.name}
        </Text>
      </td>
    </tr>
  ))

  return (
    <ScrollArea
      sx={{ height: 300 }}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table highlightOnHover>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Str</th>
            <th>Dex</th>
            <th>Con</th>
            <th>Int</th>
            <th>Wis</th>
            <th>Cha</th>
            <th>Campaign</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  )
}

export default CharactersTable
