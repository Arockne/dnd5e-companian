import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCampaigns } from './campaignSlice'
import { Stack, TextInput, Container } from '@mantine/core'
import CampaignCard from './CampaignCard'

function CampaignContainer() {
  const [searchByName, setSearchByName] = useState('')
  const dispatch = useDispatch()
  const { campaigns, status } = useSelector((state) => state.campaign)

  useEffect(() => {
    dispatch(getCampaigns())
  }, [])

  const campaignSearchResults = campaigns?.filter(({ name }) =>
    name.toLowerCase().includes(searchByName)
  )

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
          onChange={(e) => setSearchByName(e.target.value)}
          value={searchByName}
        />
      </Container>
      <Container>
        {campaignSearchResults.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </Container>
    </Stack>
  ) : null
}

export default CampaignContainer
