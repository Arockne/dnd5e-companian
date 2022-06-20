import { Button, Group, Text, TextInput } from '@mantine/core'
import React from 'react'

function CampaignLeaveForm({ campaign }) {
  return (
    <form>
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
