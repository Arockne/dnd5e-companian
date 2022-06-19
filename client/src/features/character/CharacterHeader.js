import {
  createStyles,
  Grid,
  Group,
  Navbar,
  Stack,
  Switch,
  Title,
} from '@mantine/core'
import { ArrowBarToLeft } from 'tabler-icons-react'
import React, { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateCharacter } from './characterSlice'

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

function CharacterHeader({ character }) {
  const { classes, cx } = useStyles()
  const dispatch = useDispatch()

  function handleCharacterVisibility(e) {
    const { checked: enablingVisibility } = e.target
    dispatch(
      updateCharacter({
        campaign_id: character.campaign.id,
        character: { id: character.id, visible: enablingVisibility },
      })
    )
  }

  return (
    <Group position="center" align="start" grow>
      <Navbar height={700} width={{ sm: 300 }} style={{ maxWidth: 300 }} p="md">
        <Navbar.Section grow>
          <Group className={classes.header} position="apart">
            {character?.name}
            <Switch
              label="Visible"
              checked={character?.visible || false}
              onChange={handleCharacterVisibility}
            />
          </Group>
          <NavLink
            to={`/campaigns/${character?.campaign.id}/characters/${character?.id}`}
            className={({ isActive }) =>
              cx(classes.link, { [classes.linkActive]: isActive })
            }
            end={`/campaigns/${character?.campaign.id}/characters/${character?.id}`}
          >
            Overview
          </NavLink>
        </Navbar.Section>
        <Navbar.Section className={classes.footer}>
          <NavLink
            to={`/campaigns/${character?.campaign.id}`}
            className={classes.link}
          >
            <ArrowBarToLeft className={classes.linkIcon} />
            <span>{character?.campaign.name}</span>
          </NavLink>
        </Navbar.Section>
      </Navbar>
      <Group direction="column" grow>
        <Outlet />
      </Group>
    </Group>
  )
}

export default CharacterHeader
