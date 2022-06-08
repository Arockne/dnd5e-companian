import React from 'react'
import { Divider, Group, ScrollArea, Space, Text, Title } from '@mantine/core'

function CharacterBiography({ character }) {
  console.log(character)
  return (
    <>
      <Title order={4}>Appearance</Title>
      <Divider />
      <ScrollArea style={{ height: 200 }} offsetScrollbars>
        <Group position="left">
          <Group spacing="sm" position="apart" style={{ width: '200px' }}>
            <Text size="sm">Age: {character?.age}</Text>
            <Text size="sm">Eyes: {character?.eyes}</Text>
            <Text size="sm">Gender: {character?.gender}</Text>
            <Text size="sm">Weight: {character?.weight}</Text>
            <Text size="sm">Height: {character?.height}</Text>
            <Text size="sm">Race: {character?.race}</Text>
          </Group>
        </Group>
        <Divider />
        <Space h="xs" />
        <Text>{character?.appearance}</Text>
      </ScrollArea>
      <br />
      <Title order={4}>BackStory</Title>
      <Divider />
      <ScrollArea style={{ height: 200 }} offsetScrollbars>
        <Text>{character?.backstory}</Text>
      </ScrollArea>
    </>
  )
}

export default CharacterBiography
