import React, { useState } from 'react'
import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Burger,
  Anchor,
  Header,
  Title,
  Drawer,
} from '@mantine/core'
import { useBooleanToggle } from '@mantine/hooks'
import { Link } from 'react-router-dom'
import {
  Logout,
  Settings,
  ChevronDown,
  Swords,
  Book2,
} from 'tabler-icons-react'
import { useSelector } from 'react-redux'

const useStyles = createStyles((theme) => {
  return {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100%',
    },

    title: {
      textDecoration: 'none',
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[0]
          : theme.colors.gray[7],
    },

    links: {
      [theme.fn.smallerThan('sm')]: {
        display: 'none',
      },
    },

    burger: {
      [theme.fn.largerThan('sm')]: {
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

    userMenu: {
      [theme.fn.smallerThan('sm')]: {
        display: 'none',
      },
    },

    user: {
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      transition: 'background-color 100ms ease',

      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      },
    },

    userActive: {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },
  }
})

function MainHeader({ links }) {
  const [opened, toggleOpened] = useBooleanToggle(false)
  const [userMenuOpened, setUserMenuOpened] = useState(false)
  const [active, setActive] = useState('')
  const { classes, theme, cx } = useStyles()
  const { user } = useSelector(({ user }) => user)

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
        <Title
          component={Link}
          to="/"
          order={2}
          className={classes.title}
          onClick={() => {
            setActive('/')
          }}
        >
          D&D 5e Companion
        </Title>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <Group position="apart">
          <Menu
            size={260}
            placement="end"
            transition="pop-top-right"
            className={classes.userMenu}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            control={
              <UnstyledButton
                className={cx(classes.user, {
                  [classes.userActive]: userMenuOpened,
                })}
              >
                <Group spacing={7}>
                  <Avatar
                    src={user.image}
                    alt={user.name}
                    radius="xl"
                    size={20}
                  />
                  <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                    {user.username}
                  </Text>
                  <ChevronDown size={12} />
                </Group>
              </UnstyledButton>
            }
          >
            <Menu.Item
              component={Link}
              to="/characters"
              onClick={() => {
                setActive('/characters')
              }}
              icon={<Book2 size={14} />}
            >
              Characters
            </Menu.Item>
            <Menu.Item
              component={Link}
              to="/campaigns"
              onClick={() => {
                setActive('/campaigns')
              }}
              icon={<Swords size={14} />}
            >
              Campaigns
            </Menu.Item>

            <Menu.Label>Settings</Menu.Label>
            <Menu.Item icon={<Settings size={14} />}>
              Account settings
            </Menu.Item>
            <Menu.Item icon={<Logout size={14} />}>Logout</Menu.Item>
          </Menu>
        </Group>

        <Burger
          opened={opened}
          onClick={() => toggleOpened()}
          className={classes.burger}
          size="md"
        />

        <Drawer
          opened={opened}
          onClose={() => toggleOpened()}
          position="top"
          title="D&D 5e Companion"
          padding="xl"
          size="xl"
        >
          {}
        </Drawer>
      </Container>
    </Header>
  )
}

export default MainHeader
