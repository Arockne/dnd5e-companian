import { Card, Group, Image, Text, useMantineTheme } from '@mantine/core'
import React from 'react'

function CampaignSearchCard({ campaign }) {
  const theme = useMantineTheme()

  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7]

  return (
    <div style={{ width: 180, margin: 'auto' }}>
      <Card shadow="sm" p="lg">
        <Card.Section>
          <Image
            src={campaign.image_url}
            height={200}
            alt="campaign"
            withPlaceholder={true}
          />
        </Card.Section>

        <Group
          position="center"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text weight={500} align="center">
            {campaign.name}
          </Text>
        </Group>

        <Text
          size="xs"
          style={{ color: secondaryColor, lineHeight: 1.5 }}
          align="center"
        >
          {campaign.setting}
        </Text>
      </Card>
    </div>
  )
}

export default CampaignSearchCard
