import React from 'react'
import { Tabs } from '@mantine/core'
import { MessageCircle, Photo, Settings } from 'tabler-icons-react'

export function CampaignHeader() {
  return (
    <Tabs variant="outline" orientation="vertical">
      <Tabs.Tab label="Overview" icon={<Photo size={14} />}>
        Overview tab content
      </Tabs.Tab>
      <Tabs.Tab label="Players" icon={<Photo size={14} />}>
        Players tab content
      </Tabs.Tab>
      <Tabs.Tab label="Messages" icon={<MessageCircle size={14} />}>
        Messages tab content
      </Tabs.Tab>
      <Tabs.Tab label="Logs" icon={<Settings size={14} />}>
        Logs tab content
      </Tabs.Tab>
    </Tabs>
  )
}

export default CampaignHeader
