import { Divider, Space, Title } from '@mantine/core'
import React from 'react'
import CampaignUpdateForm from './CampaignUpdateForm'
import CampaignUpdatePasswordForm from './CampaignUpdatePasswordForm'

function CampaignUpdateContainer({ campaign, status, errors }) {
  return (
    <>
      <CampaignUpdateForm campaign={campaign} status={status} errors={errors} />
      <Space h="lg" />
      <Title order={3}>Update Password</Title>
      <Divider />
      <CampaignUpdatePasswordForm campaign={campaign} />
    </>
  )
}

export default CampaignUpdateContainer
