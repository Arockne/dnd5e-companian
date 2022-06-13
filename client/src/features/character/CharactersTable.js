import { createStyles, ScrollArea, Table } from '@mantine/core'
import React, { useState } from 'react'
import CharactersTableRow from './CharactersTableRow'

const useStyles = createStyles((theme) => ({
  header: {
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

function CharactersTable({ characters }) {
  const { classes, cx } = useStyles()
  const [scrolled, setScrolled] = useState(false)

  return (
    <ScrollArea
      sx={{ height: 300 }}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table highlightOnHover>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Str</th>
            <th>Dex</th>
            <th>Con</th>
            <th>Int</th>
            <th>Wis</th>
            <th>Cha</th>
            <th>Campaign</th>
          </tr>
        </thead>
        <tbody>
          {characters?.map((character) => (
            <CharactersTableRow key={character.id} character={character} />
          ))}
        </tbody>
      </Table>
    </ScrollArea>
  )
}

export default CharactersTable
