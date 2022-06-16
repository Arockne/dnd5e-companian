import React from 'react'
import {
  ColorSwatch,
  Divider,
  Group,
  ScrollArea,
  Space,
  Text,
  Title,
} from '@mantine/core'

function CharacterBiography({ character }) {
  return (
    <>
      <Title order={4}>Appearance</Title>
      <Divider />
      <ScrollArea style={{ height: 200 }} offsetScrollbars>
        <Group position="left">
          <Group spacing="sm">
            <Text size="sm">Race: {character?.race}</Text>
            <Text size="sm">Age: {character?.age}</Text>
            <Text size="sm">Gender: {character?.gender}</Text>
            <Text size="sm">Weight: {character?.weight}</Text>
            <Text size="sm">Height: {character?.height}</Text>
            <Group spacing={5}>
              <Text size="sm">Eyes:</Text>
              <ColorSwatch
                radius="xl"
                color={character?.eyes}
                style={{
                  height: 15,
                  width: 60,
                }}
              >
                <Text size="xs" style={{ lineHeight: 0 }}>
                  {character?.eyes}
                </Text>
              </ColorSwatch>
            </Group>
            <Group spacing={5}>
              <Text size="sm">Skin:</Text>
              <ColorSwatch
                radius="xl"
                color={character?.skin}
                style={{
                  height: 15,
                  width: 60,
                }}
              >
                <Text size="xs" style={{ lineHeight: 0 }}>
                  {character?.skin}
                </Text>
              </ColorSwatch>
            </Group>
            <Group spacing={5}>
              <Text size="sm">Hair:</Text>
              <ColorSwatch
                radius="xl"
                color={character?.hair}
                style={{
                  height: 15,
                  width: 60,
                }}
              >
                <Text size="xs" style={{ lineHeight: 0 }}>
                  {character?.hair}
                </Text>
              </ColorSwatch>
            </Group>
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
