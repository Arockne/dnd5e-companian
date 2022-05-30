import { Divider, Title } from '@mantine/core'
import React from 'react'
import CampaignUpdateForm from './CampaignUpdateForm'
import CampaignUpdatePasswordForm from './CampaignUpdatePasswordForm'

function CampaignUpdateContainer({ campaign, status }) {
  return (
    <>
      <Title order={3}>Update Campaign</Title>
      <Divider />
      <CampaignUpdateForm campaign={campaign} status={status} />
      <Title order={3}>Update Password</Title>
      <Divider />
      <CampaignUpdatePasswordForm />
    </>
  )
}

export default CampaignUpdateContainer
