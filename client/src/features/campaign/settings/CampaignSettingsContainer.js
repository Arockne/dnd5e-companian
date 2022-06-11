import { Space } from '@mantine/core'
import React from 'react'
import { useSelector } from 'react-redux'
import CampaignDeleteContainer from './CampaignDeleteContainer'
import CampaignUpdateForm from './CampaignUpdateForm'
import CampaignUpdatePasswordForm from './CampaignUpdatePasswordForm'

function CampaignSettingsContainer() {
  const { campaign, status, errors } = useSelector((state) => state.campaign)

  return (
    <>
      <CampaignUpdateForm campaign={campaign} status={status} errors={errors} />
      <Space h="lg" />
      <CampaignUpdatePasswordForm campaign={campaign} />
      <Space h="lg" />
      <CampaignDeleteContainer campaign={campaign} status={status} />
    </>
  )
}

export default CampaignSettingsContainer
