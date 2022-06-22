import { Button, Group, Input, Text } from '@mantine/core'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { client } from '../../api/client'
import FormErrorsContainer from '../error/FormErrorsContainer'

function CharacterDeleteForm({ character }) {
  const [inputData, setInputData] = useState('')
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState([])
  const navigate = useNavigate()

  const textUserNeedsToMatch = `destroy ${character?.name}`
  const inputMatchesRequirement = textUserNeedsToMatch === inputData

  function handleInputChange(e) {
    setInputData(e.target.value)
  }

  async function handleSumbit(e) {
    e.preventDefault()
    setStatus('loading')
    const response = await client.delete(
      `/api/campaigns/${character.campaign.id}/characters/${character.id}`
    )
    if (response.ok) {
      navigate(`/campaigns/${character.campaign.id}`)
    } else {
      const body = await response.json()
      setStatus('failed')
      setErrors(body.errors)
    }
  }

  return (
    <form onSubmit={handleSumbit}>
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
        <Button
          type="submit"
          disabled={!inputMatchesRequirement}
          loading={status === 'loading'}
        >
          Accept this loss
        </Button>
      </Group>
      <FormErrorsContainer errors={errors} />
    </form>
  )
}

export default CharacterDeleteForm
