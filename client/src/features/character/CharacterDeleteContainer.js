import { Box, Button, Divider, Modal, Text, Title } from '@mantine/core'
import React, { useState } from 'react'
import CharacterDeleteForm from './CharacterDeleteForm'

function CharacterDeleteContainer({ character }) {
  const [opened, setOpened] = useState(false)
  return (
    <Box>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={`Delete ${character?.name}?`}
        centered
      >
        <CharacterDeleteForm character={character} />
      </Modal>
      <Title order={3}>Delete Character</Title>
      <Divider size="xs" />
      <Text>Once deleted, there is no going back</Text>
      <Button variant="outline" color="red" onClick={() => setOpened(true)}>
        Delete this character
      </Button>
    </Box>
  )
}

export default CharacterDeleteContainer
