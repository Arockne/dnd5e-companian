import {
  Box,
  Button,
  Group,
  PasswordInput,
  Textarea,
  TextInput,
} from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createCampaign, resetStatus } from './campaignSlice'

function CampaignForm() {
  const [formData, setFormData] = useState({
    name: '',
    image_url: '',
    setting: '',
    password: '',
  })

  const { status } = useSelector((state) => state.campaign)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (status === 'succeeded') {
      setFormData({
        name: '',
        image_url: '',
        setting: '',
        password: '',
      })
      dispatch(resetStatus())
      //temporary navigate to '/', needs to navigate to '/campaigns/:id'
      navigate('/')
    }
  }, [status])

  function handleChange(e) {
    const { name, value } = e.target
    const updatedFormData = { ...formData, [name]: value }
    setFormData(updatedFormData)
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(createCampaign(formData))
  }

  return (
    <Box sx={{ maxWidth: 400 }} mx="auto">
      <form style={{ position: 'relative' }} onSubmit={handleSubmit}>
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
        <PasswordInput
          required
          label="Password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          autoComplete="off"
        />
        <Group position="right" mt="md">
          <Button type="submit">Create Adventure!</Button>
        </Group>
      </form>
    </Box>
  )
}

export default CampaignForm
