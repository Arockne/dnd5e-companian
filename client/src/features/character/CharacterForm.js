import {
  Button,
  ColorInput,
  Divider,
  Group,
  Image,
  NumberInput,
  Select,
  Stack,
  Stepper,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { client } from '../../api/client'
import DialogPopUpErrors from '../error/DialogPopUpErrors'
import CharacterOverview from './CharacterOverview'

function CharacterForm() {
  const [form, setForm] = useState({
    name: '',
    image_url: '',
    appearance: '',
    backstory: '',
  })

  const [eyes, setEyes] = useState('')
  const [hair, setHair] = useState('')
  const [skin, setSkin] = useState('')
  const [age, setAge] = useState()
  const [height, setHeight] = useState()
  const [weight, setWeight] = useState()
  const [strength, setStrength] = useState()
  const [dexterity, setDexterity] = useState()
  const [constitution, setConstitution] = useState()
  const [intelligence, setIntelligence] = useState()
  const [wisdom, setWisdom] = useState()
  const [charisma, setCharisma] = useState()
  const [race, setRace] = useState('')
  const [klass, setklass] = useState('')
  const [background, setBackground] = useState('')
  const [alignment, setAlignment] = useState('')
  const [gender, setGender] = useState('')

  const [errors, setErrors] = useState([])

  const [activeStep, setActiveStep] = useState(0)
  const nextStep = () =>
    setActiveStep((current) => (current < 3 ? current + 1 : current))
  const prevStep = () =>
    setActiveStep((current) => (current > 0 ? current - 1 : current))

  const navigate = useNavigate()

  const characterData = {
    ...form,
    eyes,
    hair,
    skin,
    age,
    height,
    weight,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
    race,
    klass,
    background,
    alignment,
    gender,
  }

  const campaign = useSelector((state) => state.campaign.campaign)

  const races = [
    { value: 'Dwarf', label: 'Dwarf' },
    { value: 'Elf', label: 'Elf' },
    { value: 'Halfling', label: 'Halfling' },
    { value: 'Human', label: 'Human' },
    { value: 'Dragonborn', label: 'Dragonborn' },
    { value: 'Gnome', label: 'Gnome' },
    { value: 'Half-Elf', label: 'Half-Elf' },
    { value: 'Half-Orc', label: 'Half-Orc' },
    { value: 'Tiefling', label: 'Tiefling' },
  ]

  const klasss = [
    { value: 'Barbarian', label: 'Barbarian' },
    { value: 'Bard', label: 'Bard' },
    { value: 'Cleric', label: 'Cleric' },
    { value: 'Druid', label: 'Druid' },
    { value: 'Fighter', label: 'Fighter' },
    { value: 'Monk', label: 'Monk' },
    { value: 'Paladin', label: 'Paladin' },
    { value: 'Ranger', label: 'Ranger' },
    { value: 'Rogue', label: 'Rogue' },
    { value: 'Sorcerer', label: 'Sorcerer' },
    { value: 'Warlock', label: 'Warlock' },
    { value: 'Wizard', label: 'Wizard' },
  ]

  const backgrounds = [
    { value: 'Acolyte', label: 'Acolyte' },
    { value: 'Charlatan', label: 'Charlatan' },
    { value: 'Criminal', label: 'Criminal' },
    { value: 'Entertainer', label: 'Entertainer' },
    { value: 'Folk Hero', label: 'Folk Hero' },
    { value: 'Guild Artisan', label: 'Guild Artisan' },
    { value: 'Hermit', label: 'Hermit' },
    { value: 'Noble', label: 'Noble' },
    { value: 'Outlander', label: 'Outlander' },
    { value: 'Sage', label: 'Sage' },
    { value: 'Sailor', label: 'Sailor' },
    { value: 'Soldier', label: 'Soldier' },
    { value: 'Urchin', label: 'Urchin' },
  ]

  const alignments = [
    { value: 'Lawful Good', label: 'Lawful Good' },
    { value: 'Neutral Good', label: 'Neutral Good' },
    { value: 'Chaotic Good', label: 'Chaotic Good' },
    { value: 'Lawful Neutral', label: 'Lawful Neutral' },
    { value: 'Neutral', label: 'Neutral' },
    { value: 'Chaotic Neutral', label: 'Chaotic Neutral' },
    { value: 'Lawful Evil', label: 'Lawful Evil' },
    { value: 'Neutral Evil', label: 'Neutral Evil' },
    { value: 'Chaotic Evil', label: 'Chaotic Evil' },
  ]

  const genders = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Non-binary', label: 'Non-binary' },
  ]

  function handleChange(e) {
    const { name, value } = e.target
    const updatedForm = { ...form, [name]: value }
    setForm(updatedForm)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const response = await client.post(
      `/api/campaigns/${campaign?.id}/characters/`,
      characterData
    )
    const body = await response.json()

    if (response.ok) {
      navigate(`/campaigns/${campaign?.id}/characters/${body.id}`)
    } else {
      setErrors(body.errors)
      setTimeout(() => setErrors([]), 4000)
    }
  }

  return (
    <>
      <Group position="center">
        <Title order={3}>{`Create Character in ${campaign?.name}`}</Title>
      </Group>
      <form onSubmit={handleSubmit}>
        <Stepper
          active={activeStep}
          onStepClick={setActiveStep}
          breakpoint="sm"
        >
          <Stepper.Step label="First step" description="Roll stats">
            <TextInput
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <Select
              label="Race"
              name="race"
              data={races}
              value={race}
              onChange={setRace}
              searchable
              nothingFound="Race not found"
            />
            <Select
              label="Class"
              name="klass"
              data={klasss}
              value={klass}
              onChange={setklass}
              searchable
              nothingFound="Class not found"
            />
            <NumberInput
              label="Strength"
              name="strength"
              value={strength}
              onChange={setStrength}
            />
            <NumberInput
              label="Dexterity"
              name="dexterity"
              value={dexterity}
              onChange={setDexterity}
            />
            <NumberInput
              label="Constitution"
              name="constitution"
              value={constitution}
              onChange={setConstitution}
            />
            <NumberInput
              label="Intelligence"
              name="intelligence"
              value={intelligence}
              onChange={setIntelligence}
            />
            <NumberInput
              label="Wisdom"
              name="wisdom"
              value={wisdom}
              onChange={setWisdom}
            />
            <NumberInput
              label="Charisma"
              name="charisma"
              value={charisma}
              onChange={setCharisma}
            />
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Create biography">
            <Select
              label="Background"
              name="background"
              data={backgrounds}
              value={background}
              onChange={setBackground}
              searchable
              nothingFound="Background not found"
            />
            <Select
              label="Alignment"
              name="alignment"
              data={alignments}
              value={alignment}
              onChange={setAlignment}
              searchable
              nothingFound="Alignment not found"
            />
            <Select
              label="Gender"
              name="gender"
              data={genders}
              value={gender}
              onChange={setGender}
              searchable
              nothingFound="Gender not found"
            />
            <TextInput
              label="Image"
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
            />
            <NumberInput label="Age" name="age" value={age} onChange={setAge} />
            <NumberInput
              label="Height"
              name="height"
              value={height}
              onChange={setHeight}
            />
            <NumberInput
              label="Weight"
              name="weight"
              value={weight}
              onChange={setWeight}
            />
            <ColorInput label="Eyes" value={eyes} onChange={setEyes} />
            <ColorInput label="Hair" value={hair} onChange={setHair} />
            <ColorInput label="Skin" value={skin} onChange={setSkin} />
            <Textarea
              label="Appearance"
              name="appearance"
              value={form.appearance}
              onChange={handleChange}
            />
            <Textarea
              label="Backstory"
              name="backstory"
              value={form.backstory}
              onChange={handleChange}
            />
          </Stepper.Step>
          <Stepper.Step label="Final step" description="Review character">
            <CharacterOverview character={characterData} />
          </Stepper.Step>
          <Stepper.Completed>
            <Stack align="center">
              <Title order={3}>{characterData?.name}</Title>
              <Image
                src={characterData?.image_url}
                alt="Character image"
                withPlaceholder={true}
                radius="lg"
                height={400}
              />
              <Group position="left" mt="md">
                <Button type="submit">{`Create ${characterData?.name}`}</Button>
              </Group>
            </Stack>
          </Stepper.Completed>
        </Stepper>
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button onClick={nextStep}>Next step</Button>
        </Group>
        <DialogPopUpErrors errors={errors} setErrors={setErrors} />
      </form>
    </>
  )
}

export default CharacterForm
