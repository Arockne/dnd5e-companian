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
import { joinCampaign, reset } from '../campaign-user/campaignUserSlice'
import FormErrorsContainer from '../error/FormErrorsContainer'

function CampaignSearchCard({ campaign }) {
  const [opened, setOpened] = useState(false)
  const [password, setPassword] = useState('')
  const theme = useMantineTheme()
  const { status, errors } = useSelector((state) => state.campaignUser)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7]

  const { setting, name, image_url, id } = campaign
  const enabled = password.length > 0

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(joinCampaign({ id: campaign.id, password }))
  }

  function handleChange(e) {
    if (status === 'failed') {
      dispatch(reset())
    }
    setPassword(e.target.value)
  }

  function handleClose() {
    if (status === 'failed') {
      dispatch(reset())
    }
    setOpened(false)
  }

  useEffect(() => {
    if (status === 'succeeded') {
      setOpened(false)
      dispatch(reset())
      navigate(`/campaigns/${id}`)
    }
  }, [status])

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
