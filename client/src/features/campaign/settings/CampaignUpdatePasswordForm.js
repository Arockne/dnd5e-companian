import { Button, Group, PasswordInput } from '@mantine/core'
import React from 'react'

function CampaignUpdatePasswordForm() {
  return (
    <form>
      <PasswordInput label="Old password" />
      <PasswordInput label="New password" />
      <PasswordInput label="New password confirmation" />
      <Group position="left" mt="md">
        <Button type="submit">Update password</Button>
      </Group>
    </form>
  )
}

export default CampaignUpdatePasswordForm
