import { Button, Group, PasswordInput } from '@mantine/core'
import React, { useState } from 'react'

function CampaignUpdatePasswordForm() {
  const [formData, setFormData] = useState({
    old_password: '',
    new_password: '',
    new_password_confirmation: '',
  })

  function handleChange(e) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <form>
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
