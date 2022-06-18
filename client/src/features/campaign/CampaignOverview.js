import { Container, Group, Image, ScrollArea, Text } from '@mantine/core'
import React from 'react'
import { useSelector } from 'react-redux'

function CampaignOverview() {
  const { campaign } = useSelector((state) => state.campaign)

  return (
    <Group direction="column" align="center" spacing="xl">
      <Image
        withPlaceholder={true}
        src={campaign?.image_url}
        alt="campaign image"
        width={400}
        height={225}
      />
      <ScrollArea style={{ height: 200, maxWidth: 800 }}>
        <Text>{campaign?.setting}</Text>
      </ScrollArea>
    </Group>
  )
}

export default CampaignOverview
