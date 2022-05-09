import React, { useState } from 'react'
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Title,
  Anchor,
} from '@mantine/core'
import { useBooleanToggle } from '@mantine/hooks'
import { Link } from 'react-router-dom'

const useStyles = createStyles((theme) => {
  return {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100%',
    },

    links: {
      [theme.fn.smallerThan('md')]: {
        display: 'none',
      },
    },

    burger: {
      [theme.fn.largerThan('md')]: {
        display: 'none',
      },
    },

    link: {
      display: 'block',
      lineHeight: 1,
      padding: '8px 12px',
      borderRadius: theme.radius.sm,
      textDecoration: 'none',
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[0]
          : theme.colors.gray[7],
      fontSize: theme.fontSizes.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
      },
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
            : theme.colors[theme.primaryColor][0],
        color:
          theme.colors[theme.primaryColor][
            theme.colorScheme === 'dark' ? 3 : 7
          ],
      },
    },
  }
})

function MainHeader({ links }) {
  const [opened, toggleOpened] = useBooleanToggle(false)
  const [active, setActive] = useState('')
  const { classes, cx } = useStyles()

  const items = links.map((link) => (
    <Anchor
      component={Link}
      key={link.label}
      to={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
      onClick={() => {
        setActive(link.link)
      }}
    >
      {link.label}
    </Anchor>
  ))

  return (
    <Header height={60} mb={120}>
      <Container className={classes.header}>
        <Title order={3}>D&D 5e Companion</Title>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <Burger
          opened={opened}
          onClick={() => toggleOpened()}
          className={classes.burger}
          size="md"
        />
      </Container>
    </Header>
  )
}

export default MainHeader
