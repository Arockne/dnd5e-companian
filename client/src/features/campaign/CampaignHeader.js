import React, { useEffect } from 'react'
import {
  Anchor,
  Box,
  createStyles,
  Divider,
  Grid,
  Group,
  Loader,
  Stack,
  Tabs,
  Title,
} from '@mantine/core'
import { MessageCircle, Photo, Settings } from 'tabler-icons-react'
import { Link, NavLink, Outlet, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCampaign } from './campaignSlice'

const useStyles = createStyles((theme) => ({
  link: {
    ...theme.fn.focusStyles(),
    display: 'block',
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    lineHeight: 1.2,
    fontSize: theme.fontSizes.sm,
    padding: theme.spacing.xs,
    borderTopLeftRadius: theme.radius.sm,
    borderBottomLeftRadius: theme.radius.sm,
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    borderRightColor:
      theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 6 : 7],
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 2 : 7],

    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
    },
  },
}))

export function CampaignHeader({ campaign, owner }) {
  const { classes, cx } = useStyles()

  return (
    <Grid grow style={{ margin: '0 150px' }}>
      <Grid.Col span={1}>
        <Stack spacing={0}>
          <NavLink
            to={`/campaigns/${campaign?.id}`}
            className={({ isActive }) =>
              cx(classes.link, { [classes.linkActive]: isActive })
            }
            end={`/campaigns/${campaign?.id}`}
          >
            Overview
          </NavLink>
          <NavLink
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
          </NavLink>
          {owner ? (
            <>
              <NavLink
                to={`/campaigns/${campaign?.id}/logs`}
                className={({ isActive }) =>
                  cx(classes.link, { [classes.linkActive]: isActive })
                }
              >
                Logs
              </NavLink>
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
        </Stack>
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
