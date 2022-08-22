import { Avatar, Button, Group, Text } from '@mantine/core'
import React from 'react'

function Request({ user }) {
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
          <Button>Accept</Button>
          <Button>Deny</Button>
        </Group>
      </td>
    </tr>
  )
}

export default Request
