import {
  Button,
  Divider,
  Group,
  Input,
  Modal,
  Text,
  Title,
} from '@mantine/core'
import React, { useState } from 'react'

function CampaignSettings() {
  const [opened, setOpened] = useState(false)
  return (
    <Group direction="column">
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Delete this campaign"
        centered
      >
        <form>
          <Text size="sm">
            Are you absolutely certain you want this campaign deleted?
          </Text>
          <Text size="sm">
            This will permanently delete this campaign and all of its associated
            player characters.
          </Text>
          <br />
          <Text size="sm">
            Please type <strong>destroy this campaign</strong> to confirm
          </Text>
          <Input />
          <Group position="center" grow>
            <Button type="submit">
              I understand the consequences of my actions
            </Button>
          </Group>
        </form>
      </Modal>
      <Title order={3}>Delete Campaign</Title>
      <Divider size="lg" />
      <Text>Once deleted, there is no going back</Text>
      <Button variant="outline" color="red" onClick={() => setOpened(true)}>
        Delete this campaign
      </Button>
    </Group>
  )
}

export default CampaignSettings
