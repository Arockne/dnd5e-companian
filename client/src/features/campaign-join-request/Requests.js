import { Table, ScrollArea, Header, Title } from '@mantine/core'
import { useEffect, useState } from 'react'
import Request from './Request'

export function Requests({ campaign }) {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    fetch(`/api/campaigns/${campaign.id}/campaign_join_requests`).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setRequests(data)
        })
      }
    })
  }, [])

  function handleRequestDelete(request) {
    setRequests((requests) => requests.filter(({ id }) => id !== request.id))
  }

  return (
    <ScrollArea>
      <Title order={2} align="center">
        Requests to Join
      </Title>
      <Table verticalSpacing="md" striped>
        <tbody>
          {requests.map((request) => (
            <Request
              key={request.id}
              request={request}
              handleRequestDelete={handleRequestDelete}
            />
          ))}
        </tbody>
      </Table>
    </ScrollArea>
  )
}

export default Requests
