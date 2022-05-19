import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCampaigns } from './campaignSlice'
import { Stack, TextInput, Container, Pagination, Grid } from '@mantine/core'
import CampaignSearchCard from './CampaignSearchCard'

function CampaignContainer() {
  const [searchByName, setSearchByName] = useState('')
  const [activePage, setActivePage] = useState(1)
  const dispatch = useDispatch()
  const { campaigns, status } = useSelector((state) => state.campaign)

  useEffect(() => {
    dispatch(getCampaigns())
  }, [])

  function handlePaginationChange(page) {
    setActivePage(page)
  }

  const campaignIndex = (activePage * 5 - 5) % campaigns?.length

  const campaignSearchResults = campaigns?.filter(({ name }) =>
    name.toLowerCase().includes(searchByName)
  )

  const pages = Math.ceil(campaignSearchResults?.length / 5)

  const campaignsPerPage = campaignSearchResults?.slice(
    campaignIndex,
    campaignIndex + 5
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
          onChange={(e) => {
            setSearchByName(e.target.value)
            setActivePage(1)
          }}
          value={searchByName}
        />
      </Container>
      <Grid>
        {campaignsPerPage.map((campaign) => (
          <CampaignSearchCard key={campaign.id} campaign={campaign} />
        ))}
      </Grid>
      <Container>
        <Pagination
          position="center"
          direction="row"
          total={pages}
          page={activePage}
          onChange={handlePaginationChange}
        />
      </Container>
    </Stack>
  ) : null
}

export default CampaignContainer
