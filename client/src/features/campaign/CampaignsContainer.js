import { Container, Group, Loader, Stack, Title } from '@mantine/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../common/Loading'
import { getCurrentCampaigns } from './campaignSlice'
import CampaignsOwnedContainer from './CampaignsOwnedContainer'
import CampaignsPlayedContainer from './CampaignsPlayedContainer'
import CampaignsTable from './CampaignsTable'

function CampaignsContainer() {
  const dispatch = useDispatch()
  const {
    campaigns: { owned_campaigns, campaigns },
  } = useSelector((state) => state.campaign)

  useEffect(() => {
    dispatch(getCurrentCampaigns())
  }, [])

  return campaigns ? (
    <Group align="center" position="center" spacing={100} grow>
      <CampaignsOwnedContainer />
      <CampaignsPlayedContainer />
    </Group>
  ) : (
    <Loading />
  )
}

export default CampaignsContainer
