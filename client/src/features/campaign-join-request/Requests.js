import { Avatar, Table, Group, Text, ScrollArea, Button } from '@mantine/core'
import { useEffect, useState } from 'react'
import Request from './request'

export function Requests({ campaign }) {
  const [requests, setRequests] = useState([])
  const data = [
    {
      avatar:
        'https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
      name: 'Robert Wolfkisser',
      job: 'Engineer',
      email: 'rob_wolf@gmail.com',
      rate: 22,
    },
    {
      avatar:
        'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
      name: 'Jill Jailbreaker',
      job: 'Engineer',
      email: 'jj@breaker.com',
      rate: 45,
    },
    {
      avatar:
        'https://images.unsplash.com/photo-1632922267756-9b71242b1592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
      name: 'Henry Silkeater',
      job: 'Designer',
      email: 'henry@silkeater.io',
      rate: 76,
    },
    {
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
      name: 'Bill Horsefighter',
      job: 'Designer',
      email: 'bhorsefighter@gmail.com',
      rate: 15,
    },
    {
      avatar:
        'https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
      name: 'Jeremy Footviewer',
      job: 'Manager',
      email: 'jeremy@foot.dev',
      rate: 98,
    },
  ]

  useEffect(() => {
    fetch(`/api/campaigns/${campaign.id}/campaign_join_requests`).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setRequests(data)
        })
      }
    })
  }, [])

  const rows = data.map((item) => (
    <tr key={item.name}>
      <td>
        <Group spacing="sm">
          <Avatar size={40} src={item.avatar} radius={40} />
          <div>
            <Text size="sm" weight={500}>
              {item.name}
            </Text>
          </div>
        </Group>
      </td>
      <td>
        <Group position="right">
          <Button>Accept</Button>
          <Button>Deny</Button>
        </Group>
      </td>
    </tr>
  ))

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
