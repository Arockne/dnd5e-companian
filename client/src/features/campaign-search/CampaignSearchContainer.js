import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCampaigns } from './campaignSearchSlice'
import {
  Stack,
  TextInput,
  Container,
  Pagination,
  Grid,
  Group,
} from '@mantine/core'
import CampaignSearchCard from './CampaignSearchCard'

function CampaignSearchContainer() {
  const [searchByName, setSearchByName] = useState('')
  const [activePage, setActivePage] = useState(1)
  const dispatch = useDispatch()
  const { campaigns } = useSelector((state) => state.campaignSearch)

  useEffect(() => {
    dispatch(getCampaigns())
  }, [])

  function handlePaginationChange(page) {
    setActivePage(page)
  }

  const itemsPerPage = 5

  const campaignIndex =
    (activePage * itemsPerPage - itemsPerPage) % campaigns?.length

  const campaignSearchResults = campaigns?.filter(({ name }) =>
    name.toLowerCase().includes(searchByName.toLowerCase())
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
      <Group style={{ width: '100vw' }} position="center">
        {campaignsPerPage?.map((campaign) => (
          <CampaignSearchCard key={campaign.id} campaign={campaign} />
        ))}
      </Group>
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
