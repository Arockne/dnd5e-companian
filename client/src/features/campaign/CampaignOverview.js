import { Container, Group, Image, Text } from '@mantine/core'
import React from 'react'
import { useSelector } from 'react-redux'

function CampaignOverview() {
  const { campaign } = useSelector((state) => state.campaign)

  return (
    <Group direction="row">
      <Container>
        <Image
          withPlaceholder={true}
          src={campaign?.image_url}
          alt="campaign image"
          width={400}
          height={225}
        />
      </Container>
      <Container>
        <Text>{campaign?.setting}</Text>
      </Container>
    </Group>
  )
}

export default CampaignOverview
