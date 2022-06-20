import { Button, Group, Text, TextInput } from '@mantine/core'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { client } from '../../api/client'

function CampaignLeaveForm({ campaign }) {
  const [inputData, setInputData] = useState('')

  const navigate = useNavigate()

  const textToMatch = `I want to leave ${campaign.name}`
  const inputMatchesRequirement = textToMatch === inputData

  const { current_player } = campaign

  function handleInputChange(e) {
    setInputData(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const response = await client.delete(
      `/api/campaigns/${current_player.campaign_id}/campaign_users/${current_player.id}`
    )
    if (response.ok) {
      navigate('/')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Text size="sm">
        Are you absolutely certain you want to leave this campaign?
      </Text>
      <Text size="sm">
        This will remove your membership and permanently delete all of your
        characters affiliated with this campaign. Once you leave there is no
        going back.
      </Text>
      <Text size="sm">
        Please type <strong>{textToMatch}</strong> to confirm
      </Text>
      <TextInput value={inputData} onChange={handleInputChange} />
      <Group position="center" grow>
        <Button type="submit" disabled={!inputMatchesRequirement}>
          I understand the consequences of my actions
        </Button>
      </Group>
    </form>
  )
}

export default CampaignLeaveForm
