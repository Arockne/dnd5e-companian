import React from 'react'
import {
  Skeleton,
  Container,
  Group,
  Image,
  Grid,
  Title,
  Stack,
  Text,
} from '@mantine/core'
import CharacterBiography from './CharacterBiography'
import CharacterStats from './CharacterStats'

const child = <Skeleton height={140} radius="md" animate={false} />

export function CharacterOverview({ character }) {
  return (
    <Container my="md">
      <Grid>
        <Grid.Col xs={4}>
          <Grid>
            <Grid.Col>
              <Group position="center">
                <Image
                  alt="Character image"
                  withPlaceholder={true}
                  radius="lg"
                  height={140}
                />
              </Group>
            </Grid.Col>
            <Grid.Col>
              <Group position="center">
                <CharacterStats character={character} />
              </Group>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col xs={6}>
          <Grid>
            <Grid.Col>
              <Group position="center">
                <Title order={2}>{character?.name}</Title>
              </Group>
            </Grid.Col>
            <Grid.Col>
              <Container>
                <CharacterBiography character={character} />
              </Container>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </Container>
  )
}

export default CharacterOverview
