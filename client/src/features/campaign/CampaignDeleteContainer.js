import {
  Button,
  Divider,
  Group,
  Input,
  Modal,
  Text,
  Title,
} from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteCampaign } from './campaignSlice'

function CampaignDeleteContainer({ campaign, status }) {
  const [opened, setOpened] = useState(false)
  const [inputData, setInputData] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const textUserNeedsToMatch = `destroy ${campaign?.name}`
  const inputMatchesRequirement = textUserNeedsToMatch === inputData

  function handleInputChange(e) {
    setInputData(e.target.value)
  }

  useEffect(() => {
    if (!campaign) {
      navigate('/')
    }
  }, [campaign])

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(deleteCampaign(campaign.id))
    navigate('/')
  }
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={`Delete ${campaign?.name}?`}
        centered
      >
        <form onSubmit={handleSubmit}>
          <Text size="sm">
            Are you absolutely certain you want this campaign deleted?
          </Text>
          <Text size="sm">
            This will permanently delete this campaign and all of its associated
            player&#39;s characters.
          </Text>
          <br />
          <Text size="sm">
            Please type <strong>{textUserNeedsToMatch}</strong> to confirm
          </Text>
          <Input required value={inputData} onChange={handleInputChange} />
          <Group position="center" grow>
            <Button
              type="submit"
              disabled={!inputMatchesRequirement}
              loading={status === 'loading'}
            >
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
    </>
  )
}

export default CampaignDeleteContainer
