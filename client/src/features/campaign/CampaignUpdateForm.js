import { Box, Button, Group, Textarea, TextInput } from '@mantine/core'
import React from 'react'

function CampaignUpdateForm() {
  return (
    <Box>
      <form>
        <TextInput
          required
          label="Name"
          placeholder="Name"
          name="name"
          autoComplete="off"
        />
        <TextInput label="Image" name="image_url" autoComplete="off" />
        <Textarea
          required
          label="Setting"
          placeholder="In a place unbeknownst to man..."
          name="setting"
          autoComplete="off"
        />
        <Group position="left" mt="md">
          <Button type="submit">Update campaign</Button>
        </Group>
      </form>
    </Box>
  )
}

export default CampaignUpdateForm
