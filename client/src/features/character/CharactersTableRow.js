import { Avatar, Group, Text } from '@mantine/core'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function CharactersTableRow({ character }) {
  const navigate = useNavigate()
  return (
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
          {character.klass}
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
  )
}

export default CharactersTableRow
