import {
  Box,
  Button,
  Divider,
  Group,
  List,
  PasswordInput,
  ThemeIcon,
  Title,
} from '@mantine/core'
import React, { useState } from 'react'
import { CircleCheck } from 'tabler-icons-react'
import { client } from '../../../api/client'
import FormErrorsContainer from '../../error/FormErrorsContainer'

function CampaignUpdatePasswordForm({ campaign }) {
  const [formData, setFormData] = useState({
    old_password: '',
    new_password: '',
    new_password_confirmation: '',
  })
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState('idle')

  function handleChange(e) {
    if (errors.length) {
      setErrors([])
    }
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const { old_password, new_password, new_password_confirmation } = formData

    if (new_password !== new_password_confirmation) {
      setErrors(['New password and new password confirmation do not match'])
      return
    }

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
    <Box>
      <Title order={3}>Update Campaign Password</Title>
      <Divider />
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
        {status === 'succeeded' ? (
          <List
            withPadding
            size="sm"
            mt="sm"
            icon={
              <ThemeIcon variant="light" color="teal" size={20} radius="xl">
                <CircleCheck size={18} />
              </ThemeIcon>
            }
          >
            <List.Item>Password has successfully been changed</List.Item>
          </List>
        ) : null}
        <FormErrorsContainer errors={errors} />
        <Group position="left" mt="md">
          <Button type="submit">Update password</Button>
        </Group>
      </form>
    </Box>
  )
}

export default CampaignUpdatePasswordForm
