import {
  Button,
  Card,
  Group,
  Image,
  LoadingOverlay,
  Modal,
  Text,
  useMantineTheme,
} from '@mantine/core'
import React, { useState } from 'react'
import { client } from '../../api/client'
import FormErrorsContainer from '../error/FormErrorsContainer'

function CampaignSearchCard({ campaign }) {
  const [opened, setOpened] = useState(false)
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState('idle')
  const theme = useMantineTheme()

  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7]

  const { setting, name, image_url, id } = campaign

  async function handleJoinRequest() {
    setStatus('loading')
    const response = await client.post(
      `/api/campaigns/${id}/campaign_join_requests`
    )
    const body = await response.json()

    if (response.ok) {
      setOpened(false)
    } else {
      setStatus('failed')
      setErrors(body.errors)
    }
  }

  function handleClose() {
    if (status === 'failed') {
      setStatus('idle')
      setErrors([])
    }
    setOpened(false)
  }

  return (
    <>
      <Modal centered opened={opened} onClose={handleClose} title={name}>
        <LoadingOverlay visible={status === 'loading'} />
        <Group position="center" mt="md">
          <Button
            uppercase
            loading={status === 'loading'}
            onClick={handleJoinRequest}
          >{`Request to join ${name}`}</Button>
        </Group>
        <Group position="center">
          <FormErrorsContainer errors={errors} />
        </Group>
      </Modal>
      <Card
        shadow="sm"
        p="lg"
        style={{ width: 180, cursor: 'pointer' }}
        onClick={() => setOpened(true)}
      >
        <Card.Section>
          <Image
            src={image_url}
            height={200}
            alt="campaign"
            withPlaceholder={true}
          />
        </Card.Section>

        <Group
          position="center"
          style={{
            marginBottom: 5,
            marginTop: theme.spacing.sm,
          }}
        >
          <Text
            weight={500}
            align="center"
            style={{ position: 'absolute', height: 20 }}
          >
            {name}
          </Text>
        </Group>

        <Group position="center" style={{ height: 100 }}>
          <Text
            size="xs"
            style={{
              color: secondaryColor,
              lineHeight: 1.5,
              position: 'absolute',
              height: 15,
            }}
            align="center"
          >
            {setting}
          </Text>
        </Group>
      </Card>
    </>
  )
}

export default CampaignSearchCard
