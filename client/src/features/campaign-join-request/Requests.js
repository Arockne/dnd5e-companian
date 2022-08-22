import { Table, ScrollArea } from '@mantine/core'
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

  return (
    <ScrollArea>
      <Table verticalSpacing="md" striped>
        <tbody>
          {requests.map(({ user }) => (
            <Request key={user.id} user={user} />
          ))}
        </tbody>
      </Table>
    </ScrollArea>
  )
}

export default Requests
