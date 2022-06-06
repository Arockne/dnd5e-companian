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
                {/* <Skeleton height={250} radius="md" animate={false} /> */}
                <CharacterStats character={character} />
                <Stack spacing={0}>
                  <Text size="xs">Age: {character?.character_profile.age}</Text>
                  <Text size="xs">
                    Eyes: {character?.character_profile.eyes}
                  </Text>
                  <Text size="xs">
                    Gender: {character?.character_profile.gender}
                  </Text>
                  <Text size="xs">
                    Weight: {character?.character_profile.weight}
                  </Text>
                  <Text size="xs">
                    Height: {character?.character_profile.height}
                  </Text>
                  <Text size="xs">Race: {character?.race}</Text>
                </Stack>
              </Group>
            </Grid.Col>
            <Grid.Col>
              <Group position="center">
                <Skeleton height={100} radius="md" animate={false} />
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
