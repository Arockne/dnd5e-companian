import { Divider, Space, Title } from '@mantine/core'
import React from 'react'
import CampaignUpdateForm from './CampaignUpdateForm'
import CampaignUpdatePasswordForm from './CampaignUpdatePasswordForm'

function CampaignUpdateContainer({ campaign, status, errors }) {
  return (
    <>
      <CampaignUpdateForm campaign={campaign} status={status} errors={errors} />
      <Space h="lg" />
      <CampaignUpdatePasswordForm campaign={campaign} />
    </>
  )
}

export default CampaignUpdateContainer
