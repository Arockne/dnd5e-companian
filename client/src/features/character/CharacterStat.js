import { Card, Group, Text, ThemeIcon } from '@mantine/core'
import React from 'react'

function CharacterStat({ name, stat }) {
  function abilityModifier(stat) {
    const modifier = Math.floor((stat - 10) / 2)
    return modifier > 0 ? `+${modifier}` : modifier
  }

  return (
    <Group
      direction="column"
      position="center"
      align="center"
      spacing="xs"
      style={{
        border: '2px solid black',
        height: '80px',
        width: '70px',
        borderRadius: '15px',
      }}
      noWrap={true}
    >
      <Text size="xs">{name}</Text>
      <Text size="lg">{stat}</Text>
      <ThemeIcon
        radius="xl"
        size="md"
        style={{ position: 'relative', bottom: '5px' }}
      >
        <Text size="sm">{abilityModifier(stat)}</Text>
      </ThemeIcon>
    </Group>
  )
}

export default CharacterStat
