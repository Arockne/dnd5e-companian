import { Avatar, Button, Group, Text } from '@mantine/core'
import React from 'react'
import { client } from '../../api/client'

function Request({ request, handleRequestDelete }) {
  const { id, campaign_id, user } = request

  async function accept() {
    const response = await client.post(
      `/api/campaigns/${campaign_id}/campaign_join_requests/${id}/accept`
    )
    const body = await response.json()

    if (response.ok) {
      handleRequestDelete(body)
    }
  }

  return (
    <tr>
      <td>
        <Group spacing="sm">
          <Avatar size={40} src={user.image_url} radius={40} />
          <div>
            <Text size="sm" weight={500}>
              {user.username}
            </Text>
          </div>
        </Group>
      </td>
      <td>
        <Group position="right">
          <Button onClick={accept}>Accept</Button>
          <Button>Deny</Button>
        </Group>
      </td>
    </tr>
  )
}

export default Request
