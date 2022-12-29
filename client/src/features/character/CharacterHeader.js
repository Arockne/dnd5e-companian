import { Group, Modal, Navbar, Switch } from '@mantine/core'
import { TransferOut } from 'tabler-icons-react'
import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateCharacter } from './characterSlice'
import CharacterVisibilityForm from './CharacterVisibilityForm'
import { characterHeaderStyle } from './characterStyles'

const useStyles = characterHeaderStyle

function CharacterHeader({ character }) {
  const [opened, setOpened] = useState(false)
  const { classes, cx } = useStyles()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const owner = character?.user.id === user?.id

  function handleCharacterVisibility(e) {
    const { checked: enablingVisibility } = e.target
    if (enablingVisibility) {
      setOpened(true)
    } else {
      dispatch(
        updateCharacter({
          ...character,
          visible: false,
        })
      )
    }
  }

  return (
    <Group position="center" align="start" grow>
      <Navbar height={700} width={{ sm: 300 }} style={{ maxWidth: 300 }} p="md">
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title={`Do you want ${character?.name} to be visible?`}
          centered
        >
          <CharacterVisibilityForm
            character={character}
            setOpened={setOpened}
          />
        </Modal>
        <Navbar.Section grow>
          <Group className={classes.header} position="apart">
            {character?.name}
            {owner ? (
              <Switch
                label="Visible"
                checked={character?.visible || false}
                onChange={handleCharacterVisibility}
              />
            ) : null}
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
          {owner ? (
            <NavLink
              to={`/campaigns/${character?.campaign.id}/characters/${character?.id}/settings`}
              className={({ isActive }) =>
                cx(classes.link, { [classes.linkActive]: isActive })
              }
              end={`/campaigns/${character?.campaign.id}/characters/${character?.id}`}
            >
              Settings
            </NavLink>
          ) : null}
        </Navbar.Section>
        <Navbar.Section className={classes.footer}>
          <NavLink
            to={`/campaigns/${character?.campaign.id}`}
            className={classes.link}
          >
            <TransferOut className={classes.linkIcon} />
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
