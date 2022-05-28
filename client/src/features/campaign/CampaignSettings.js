import { Button, Container, Divider, Group, Text, Title } from '@mantine/core'
import React from 'react'

function CampaignSettings() {
  return (
    <Group direction="column">
      <Title order={3}>Delete Campaign</Title>
      <Divider size="lg" />
      <Text>Once deleted, there is no going back</Text>
      <Button variant="outline" color="red">
        Delete this campaign
      </Button>
    </Group>
  )
}

export default CampaignSettings
