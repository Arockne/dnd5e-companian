import {
  Box,
  Button,
  Divider,
  Group,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FormErrorsContainer from '../../error/FormErrorsContainer'
import { resetErrors, updateCampaign } from '../campaignSlice'

function CampaignUpdateForm({ campaign, status, errors }) {
  const [formData, setFormData] = useState(
    campaign || { name: '', image_url: '', setting: '' }
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(resetErrors())
      navigate(`/campaigns/${campaign.id}`)
    }
  }, [status])

  function handleChange(e) {
    if (status === 'failed') {
      dispatch(resetErrors())
    }
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(updateCampaign({ ...formData, id: campaign.id }))
  }

  return (
    <Box>
      <Title order={3}>Update Campaign</Title>
      <Divider />
      <form onSubmit={handleSubmit}>
        <TextInput
          required
          label="Name"
          placeholder="Name"
          name="name"
          autoComplete="off"
          value={formData?.name}
          onChange={handleChange}
        />
        <TextInput
          label="Image"
          name="image_url"
          autoComplete="off"
          value={formData?.image_url}
          onChange={handleChange}
        />
        <Textarea
          required
          label="Setting"
          placeholder="In a place unbeknownst to man..."
          name="setting"
          autoComplete="off"
          value={formData?.setting}
          onChange={handleChange}
        />
        <FormErrorsContainer errors={errors} />
        <Group position="left" mt="md">
          <Button type="submit">Update campaign</Button>
        </Group>
      </form>
    </Box>
  )
}

export default CampaignUpdateForm
