import { Box, Button, Group, Textarea, TextInput } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateCampaign } from './campaignSlice'

function CampaignUpdateForm({ campaign, status }) {
  const [formData, setFormData] = useState(campaign || {})
  const dispatch = useDispatch()

  function changeInDataField(initial, change) {
    for (const key in change) {
      if (change[key] !== initial[key]) {
        return true
      }
    }
    return false
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(updateCampaign(formData))
  }

  return (
    <Box>
      <form onSubmit={handleSubmit}>
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
          <Button
            type="submit"
            disabled={!changeInDataField(formData, campaign)}
          >
            Update campaign
          </Button>
        </Group>
      </form>
    </Box>
  )
}

export default CampaignUpdateForm
