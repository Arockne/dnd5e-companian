import React from 'react'
import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Group,
} from '@mantine/core'
import { Link } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
    backgroundColor: theme.colors.dark[8],
    height: '100%',
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color:
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.red,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}))

export function NotAuthorized() {
  const { classes } = useStyles()

  return (
    <Container className={classes.root}>
      <div className={classes.label}>401</div>
      <Title className={classes.title}>
        You are not authorized to view this page.
      </Title>
      <Text
        color="dimmed"
        size="lg"
        align="center"
        className={classes.description}
      >
        Unfortunately, you have reached a page you do not have access to.
      </Text>
      <Group position="center">
        <Button component={Link} to="/" variant="subtle" size="md">
          Take me back to home page
        </Button>
      </Group>
    </Container>
  )
}

export default NotAuthorized
