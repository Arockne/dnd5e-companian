import React, { useEffect } from 'react'
import {
  Anchor,
  Box,
  createStyles,
  Divider,
  Grid,
  Group,
  Loader,
  Navbar,
  Stack,
  Tabs,
  Text,
  Title,
} from '@mantine/core'
import {
  Logout,
  MessageCircle,
  Photo,
  Settings,
  SwitchHorizontal,
} from 'tabler-icons-react'
import { Link, NavLink, Outlet, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCampaign } from './campaignSlice'

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon')
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25)
            : theme.colors[theme.primaryColor][0],
        color:
          theme.colorScheme === 'dark'
            ? theme.white
            : theme.colors[theme.primaryColor][7],
        [`& .${icon}`]: {
          color:
            theme.colors[theme.primaryColor][
              theme.colorScheme === 'dark' ? 5 : 7
            ],
        },
      },
    },
  }
})

export function CampaignHeader({ campaign, owner }) {
  const { classes, cx } = useStyles()

  return (
    <Grid grow>
      <Grid.Col span={1}>
        <Navbar height={700} width={{ sm: 300 }} p="md">
          <Navbar.Section grow>
            <Group className={classes.header} position="apart">
              {campaign?.name}
            </Group>
            <NavLink
              to={`/campaigns/${campaign?.id}`}
              className={({ isActive }) =>
                cx(classes.link, { [classes.linkActive]: isActive })
              }
              end={`/campaigns/${campaign?.id}`}
            >
              Overview
            </NavLink>
            {/* <NavLink
              to={`/campaigns/${campaign?.id}/players`}
              className={({ isActive }) =>
                cx(classes.link, { [classes.linkActive]: isActive })
              }
            >
              Players
            </NavLink>
            <NavLink
              to={`/campaigns/${campaign?.id}/messages`}
              className={({ isActive }) =>
                cx(classes.link, { [classes.linkActive]: isActive })
              }
            >
              Messages
            </NavLink> */}
            {owner ? (
              <>
                {/* <NavLink
                  to={`/campaigns/${campaign?.id}/logs`}
                  className={({ isActive }) =>
                    cx(classes.link, { [classes.linkActive]: isActive })
                  }
                >
                  Logs
                </NavLink> */}
                <NavLink
                  to={`/campaigns/${campaign?.id}/settings`}
                  className={({ isActive }) =>
                    cx(classes.link, { [classes.linkActive]: isActive })
                  }
                >
                  Settings
                </NavLink>
              </>
            ) : null}
          </Navbar.Section>
        </Navbar>
      </Grid.Col>
      <Grid.Col span={9}>
        <Group position="center">
          <Title order={2}>{campaign?.name}</Title>
        </Group>
        <Outlet />
      </Grid.Col>
    </Grid>
  )
}

export default CampaignHeader
