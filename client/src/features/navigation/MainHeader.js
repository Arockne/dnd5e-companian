import React from 'react'
import {
  createStyles,
  Container,
  Burger,
  Header,
  Title,
  Drawer,
} from '@mantine/core'
import { useBooleanToggle } from '@mantine/hooks'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MainHeaderBurgerMenu from './MainHeaderBurgerMenu'
import UserMenu from './UserMenu'

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
      display: 'flex',
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

function MainHeader() {
  const [opened, toggleOpened] = useBooleanToggle(false)
  const { classes, theme, cx } = useStyles()
  const { user } = useSelector(({ user }) => user)

  return (
    <>
      <Header height={60}>
        <Container className={classes.header}>
          <Title component={Link} to="/" order={2} className={classes.title}>
            D&D 5e Companion
          </Title>
          <Container className={classes.links}>
            <NavLink
              to={'/campaigns/create'}
              className={({ isActive }) =>
                cx(classes.link, {
                  [classes.linkActive]: isActive,
                })
              }
            >
              Create Campaign
            </NavLink>
            <NavLink
              to={'/campaigns/search'}
              className={({ isActive }) =>
                cx(classes.link, {
                  [classes.linkActive]: isActive,
                })
              }
            >
              Search Campaigns
            </NavLink>
          </Container>
          <UserMenu user={user} />
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
            <MainHeaderBurgerMenu user={user} toggleOpened={toggleOpened} />
          </Drawer>
        </Container>
      </Header>
      <Outlet />
    </>
  )
}

export default MainHeader
