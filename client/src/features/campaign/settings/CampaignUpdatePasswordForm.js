import { Button, Group, PasswordInput } from '@mantine/core'
import React, { useState } from 'react'
import { client } from '../../../api/client'

function CampaignUpdatePasswordForm({ campaign }) {
  const [formData, setFormData] = useState({
    old_password: '',
    new_password: '',
    new_password_confirmation: '',
  })
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState('idle')

  function handleChange(e) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const { old_password, new_password } = formData

    const response = await client.patch(
      `/api/campaigns/${campaign.id}/password`,
      {
        campaign: { old_password, new_password },
      }
    )

    if (response.ok) {
      setStatus('succeeded')
    } else {
      const body = await response.json()
      setErrors(body.errors)
      setStatus('failed')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PasswordInput
        required
        label="Old password"
        name="old_password"
        value={formData.old_password}
        onChange={handleChange}
      />
      <PasswordInput
        required
        label="New password"
        name="new_password"
        value={formData.new_password}
        onChange={handleChange}
      />
      <PasswordInput
        required
        label="New password confirmation"
        name="new_password_confirmation"
        value={formData.new_password_confirmation}
        onChange={handleChange}
      />
      <Group position="left" mt="md">
        <Button type="submit">Update password</Button>
      </Group>
    </form>
  )
}

export default CampaignUpdatePasswordForm
