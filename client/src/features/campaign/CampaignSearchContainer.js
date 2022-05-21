import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCampaigns } from './campaignSlice'
import { Stack, TextInput, Container, Pagination, Grid } from '@mantine/core'
import CampaignSearchCard from './CampaignSearchCard'

function CampaignSearchContainer() {
  const [searchByName, setSearchByName] = useState('')
  const [activePage, setActivePage] = useState(1)
  const dispatch = useDispatch()
  const { campaigns, status, errors } = useSelector((state) => state.campaign)

  useEffect(() => {
    if (!campaigns) {
      dispatch(getCampaigns())
    }
  }, [])

  function handlePaginationChange(page) {
    setActivePage(page)
  }

  const itemsPerPage = 5

  const campaignIndex =
    (activePage * itemsPerPage - itemsPerPage) % campaigns?.length

  const campaignSearchResults = campaigns?.filter(({ name }) =>
    name.toLowerCase().includes(searchByName)
  )

  const pages = Math.ceil(campaignSearchResults?.length / itemsPerPage)

  const campaignsPerPage = campaignSearchResults?.slice(
    campaignIndex,
    campaignIndex + itemsPerPage
  )

  return (
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
      <Grid columns={6} style={{ width: '100vw' }} justify="center">
        {campaignsPerPage?.map((campaign) => (
          <Grid.Col span={1} key={campaign.id}>
            <CampaignSearchCard campaign={campaign} />
          </Grid.Col>
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
  )
}

export default CampaignSearchContainer
