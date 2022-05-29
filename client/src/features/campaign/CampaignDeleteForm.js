import { Button, Group, Input, Text } from '@mantine/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteCampaign } from './campaignSlice'

function CampaignDeleteForm({ campaign, status }) {
  const [inputData, setInputData] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const textUserNeedsToMatch = `destroy ${campaign?.name}`
  const inputMatchesRequirement = textUserNeedsToMatch === inputData

  function handleInputChange(e) {
    setInputData(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(deleteCampaign(campaign.id))
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Text size="sm">
        Are you absolutely certain you want this campaign deleted?
      </Text>
      <Text size="sm">
        This will permanently delete this campaign and all of its associated
        player&#39;s characters.
      </Text>
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
          I understand the consequences of my actions
        </Button>
      </Group>
    </form>
  )
}

export default CampaignDeleteForm
