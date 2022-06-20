import { Button, Group, Text, TextInput } from '@mantine/core'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { client } from '../../api/client'

function CampaignLeaveForm({ currentPlayer }) {
  const navigate = useNavigate()
  async function handleSubmit(e) {
    e.preventDefault()
    const response = await client.delete(
      `/api/campaigns/${currentPlayer.campaign_id}/campaign_users/${currentPlayer.id}`
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
      <TextInput />
      <Group position="center" grow>
        <Button type="submit">
          I understand the consequences of my actions
        </Button>
      </Group>
    </form>
  )
}

export default CampaignLeaveForm
