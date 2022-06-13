import {
  Button,
  Card,
  Group,
  Image,
  LoadingOverlay,
  Modal,
  PasswordInput,
  Text,
  useMantineTheme,
} from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { client } from '../../api/client'
import { joinCampaign, reset } from '../campaign-user/campaignUserSlice'
import FormErrorsContainer from '../error/FormErrorsContainer'

function CampaignSearchCard({ campaign }) {
  const [opened, setOpened] = useState(false)
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState('idle')
  const theme = useMantineTheme()
  // const { status } = useSelector((state) => state.campaignUser)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7]

  const { setting, name, image_url, id } = campaign
  const enabled = password.length > 0

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    const response = await client.post(`/api/campaigns/${id}/campaign_users`, {
      campaign: {
        id: campaign.id,
        password,
      },
    })

    if (response.ok) {
      navigate(`/campaigns/${id}`)
    } else {
      const body = await response.json()
      setStatus('failed')
      setErrors(body.errors)
    }
  }

  function handleChange(e) {
    if (status === 'failed') {
      setStatus('idle')
      setErrors([])
    }
    setPassword(e.target.value)
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
        <form style={{ position: 'relative' }} onSubmit={handleSubmit}>
          <LoadingOverlay visible={status === 'loading'} />
          <PasswordInput
            required
            autoComplete="off"
            label="Password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={password}
          />
          <FormErrorsContainer errors={errors} />
          <Group position="right" mt="md">
            <Button disabled={!enabled} type="submit">
              Join the Adventure!
            </Button>
          </Group>
        </form>
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
