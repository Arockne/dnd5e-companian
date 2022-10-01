import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  Textarea,
  TextInput,
} from '@mantine/core'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { client } from '../../api/client'
import FormErrorsContainer from '../error/FormErrorsContainer'

function CampaignForm() {
  const [formData, setFormData] = useState({
    name: '',
    image_url: '',
    setting: '',
  })
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState([])

  const navigate = useNavigate()

  function handleChange(e) {
    if (status === 'failed') {
      setErrors([])
      setStatus('idle')
    }
    const { name, value } = e.target
    const updatedFormData = { ...formData, [name]: value }
    setFormData(updatedFormData)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    const response = await client.post(`/api/campaigns/`, {
      campaign: formData,
    })
    const body = await response.json()
    if (response.ok) {
      navigate(`/campaigns/${body.id}`)
    } else {
      setStatus('failed')
      setErrors(body.errors)
    }
  }

  return (
    <Box sx={{ maxWidth: 400 }} mx="auto">
      <form style={{ position: 'relative' }} onSubmit={handleSubmit}>
        <LoadingOverlay visible={status === 'loading'} />
        <TextInput
          required
          label="Name"
          placeholder="Name"
          name="name"
          onChange={handleChange}
          value={formData.name}
          autoComplete="off"
        />
        <TextInput
          label="Image"
          name="image_url"
          onChange={handleChange}
          value={formData.image_url}
          autoComplete="off"
        />
        <Textarea
          required
          label="Setting"
          placeholder="In a place unbeknownst to man..."
          name="setting"
          onChange={handleChange}
          value={formData.setting}
          autoComplete="off"
        />
        <FormErrorsContainer errors={errors} />
        <Group position="center" mt="md">
          <Button type="submit">Create Adventure!</Button>
        </Group>
      </form>
    </Box>
  )
}

export default CampaignForm
