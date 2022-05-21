import {
  Box,
  Button,
  Group,
  PasswordInput,
  Textarea,
  TextInput,
} from '@mantine/core'
import React from 'react'

function CampaignForm() {
  return (
    <Box sx={{ maxWidth: 400 }} mx="auto">
      <form style={{ position: 'relative' }}>
        <TextInput required label="Name" placeholder="Name" name="name" />
        <TextInput label="Image" name="image_url" />
        <Textarea
          required
          label="Setting"
          placeholder="In a place unbeknownst to man..."
        />
        <PasswordInput
          required
          autoComplete="current-password"
          label="Password"
          placeholder="Password"
          name="password"
        />
        <Group position="right" mt="md">
          <Button type="submit">Create Adventure!</Button>
        </Group>
      </form>
    </Box>
  )
}

export default CampaignForm
