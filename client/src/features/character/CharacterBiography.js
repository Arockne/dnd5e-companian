import React from 'react'
import { Divider, ScrollArea, Text, Title } from '@mantine/core'

function CharacterBiography({ character }) {
  return (
    <>
      <Title order={4}>Appearance</Title>
      <Divider />
      <ScrollArea style={{ height: 200 }} offsetScrollbars>
        <Text>{character?.character_profile.appearance}</Text>
      </ScrollArea>
      <br />
      <Title order={4}>BackStory</Title>
      <Divider />
      <ScrollArea style={{ height: 200 }} offsetScrollbars>
        <Text>{character?.character_profile.backstory}</Text>
      </ScrollArea>
    </>
  )
}

export default CharacterBiography
