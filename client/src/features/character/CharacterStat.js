import { Card, Group, Text, ThemeIcon } from '@mantine/core'
import React from 'react'

function CharacterStat({ name, stat }) {
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
        borderRadius: '20px',
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
        <Text size="sm">+1</Text>
      </ThemeIcon>
    </Group>
  )
}

export default CharacterStat
