import { Button, Divider, Modal, Text, Title } from '@mantine/core'
import React, { useState } from 'react'
import CampaignDeleteForm from './CampaignDeleteForm'

function CampaignDeleteContainer({ campaign, status }) {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={`Delete ${campaign?.name}?`}
        centered
      >
        <CampaignDeleteForm campaign={campaign} status={status} />
      </Modal>
      <Title order={3}>Delete Campaign</Title>
      <Divider size="lg" />
      <Text>Once deleted, there is no going back</Text>
      <Button variant="outline" color="red" onClick={() => setOpened(true)}>
        Delete this campaign
      </Button>
    </>
  )
}

export default CampaignDeleteContainer
