import {
  Avatar,
  createStyles,
  Group,
  ScrollArea,
  Table,
  Text,
} from '@mantine/core'
import React, { useState } from 'react'

const useStyles = createStyles((theme) => ({
  header: {
    display: 'block',
    position: 'sticky',
    top: 0,
    zIndex: 1,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}))

function CampaignsTable({ campaigns = [] }) {
  const { classes, cx } = useStyles()
  const [scrolled, setScrolled] = useState(false)

  const rows = campaigns?.map((row) => (
    <tr key={row.id}>
      <td>
        <Group spacing="sm">
          <Avatar size={26} src={row.image_url} radius={26} />
          <Text size="sm" weight={500}>
            {row.name}
          </Text>
        </Group>
      </td>
    </tr>
  ))

  return (
    <ScrollArea
      sx={{ height: 300 }}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table sx={{ width: '60vw' }} highlightOnHover>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  )
}

export default CampaignsTable
