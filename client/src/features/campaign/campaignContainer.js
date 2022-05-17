import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCampaigns } from './campaignSlice'
import { Stack, TextInput, Container } from '@mantine/core'
import CampaignCard from './CampaignCard'

function CampaignContainer() {
  const dispatch = useDispatch()
  const { campaigns, status } = useSelector((state) => state.campaign)

  useEffect(() => {
    dispatch(getCampaigns())
  }, [])

  return status === 'succeeded' ? (
    <Stack
      align="flex-start"
      justify="stretch"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
      })}
    >
      <Container>
        <TextInput
          label="Search for a Campaign:"
          placeholder="Campaign Search"
          size="xs"
        />
      </Container>
      <Container>
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </Container>
    </Stack>
  ) : null
}

export default CampaignContainer
