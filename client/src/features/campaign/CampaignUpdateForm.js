import { Box, Button, Group, Textarea, TextInput } from '@mantine/core'
import React, { useState } from 'react'

function CampaignUpdateForm({ campaign }) {
  const [formData, setFormData] = useState(campaign || {})

  function changeInDataField() {
    for (const key in formData) {
      if (formData[key] !== campaign[key]) {
        return true
      }
    }
    return false
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <Box>
      <form>
        <TextInput
          required
          label="Name"
          placeholder="Name"
          name="name"
          autoComplete="off"
          value={formData.name}
          onChange={handleChange}
        />
        <TextInput
          label="Image"
          name="image_url"
          autoComplete="off"
          value={formData.image_url}
          onChange={handleChange}
        />
        <Textarea
          required
          label="Setting"
          placeholder="In a place unbeknownst to man..."
          name="setting"
          autoComplete="off"
          value={formData.setting}
          onChange={handleChange}
        />
        <Group position="left" mt="md">
          <Button type="submit" disabled={!changeInDataField()}>
            Update campaign
          </Button>
        </Group>
      </form>
    </Box>
  )
}

export default CampaignUpdateForm
