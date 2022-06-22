import { Button, Group, Input, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function CharacterDeleteForm({ character }) {
  const [inputData, setInputData] = useState('')

  const textUserNeedsToMatch = `destroy ${character?.name}`
  const inputMatchesRequirement = textUserNeedsToMatch === inputData

  function handleInputChange(e) {
    setInputData(e.target.value)
  }

  return (
    <form>
      <Text size="sm">
        Are you absolutely certain you want this character deleted?
      </Text>
      <Text size="sm">{`${character?.name} will be permantly deleted.`}</Text>
      <br />
      <Text size="sm">
        Please type <strong>{textUserNeedsToMatch}</strong> to confirm
      </Text>
      <Input required value={inputData} onChange={handleInputChange} />
      <Group position="center" grow>
        <Button type="submit" disabled={!inputMatchesRequirement}>
          Accept this loss
        </Button>
      </Group>
    </form>
  )
}

export default CharacterDeleteForm
