import { Button, createStyles, Modal } from '@mantine/core'
import React, { useState } from 'react'
import { AlertTriangle } from 'tabler-icons-react'
import CampaignLeaveForm from './CampaignLeaveForm'

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon')
  return {
    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    leaveButton: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[1]
          : theme.colors.red[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,
      height: 45,

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
  }
})

function CampaignLeaveContainer({ campaign }) {
  const [opened, setOpened] = useState(false)
  const { classes } = useStyles()
  return (
    <>
      <Modal
        centered
        title={`Leaving ${campaign?.name}?`}
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <CampaignLeaveForm campaign={campaign} />
      </Modal>
      <Button
        variant="subtle"
        className={classes.leaveButton}
        onClick={() => setOpened(true)}
      >
        <AlertTriangle className={classes.linkIcon} />
        <span>Leave Campaign</span>
      </Button>
    </>
  )
}

export default CampaignLeaveContainer
