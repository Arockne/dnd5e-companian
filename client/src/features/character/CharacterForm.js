import {
  Button,
  ColorInput,
  Group,
  NumberInput,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { client } from '../../api/client'
import FormErrorsContainer from '../error/FormErrorsContainer'

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
  const [age, setAge] = useState(0)
  const [height, setHeight] = useState(0)
  const [weight, setWeight] = useState(0)
  const [strength, setStrength] = useState(0)
  const [dexterity, setDexterity] = useState(0)
  const [constitution, setConstitution] = useState(0)
  const [intelligence, setIntelligence] = useState(0)
  const [wisdom, setWisdom] = useState(0)
  const [charisma, setCharisma] = useState(0)
  const [race, setRace] = useState('')
  const [profession, setProfession] = useState('')
  const [background, setBackground] = useState('')
  const [alignment, setAlignment] = useState('')
  const [gender, setGender] = useState('')

  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState([])

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
    profession,
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

  const professions = [
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
    setStatus('loading')
    const response = await client.post(
      `/api/campaigns/${campaign?.id}/characters/`,
      characterData
    )
    const body = await response.json()

    if (response.ok) {
      navigate(`/campaigns/${campaign?.id}/characters/${body.id}`)
    } else {
      setStatus('failed')
      setErrors(body.errors)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
      />
      <TextInput
        label="Image"
        name="image_url"
        value={form.image_url}
        onChange={handleChange}
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
        name="profession"
        data={professions}
        value={profession}
        onChange={setProfession}
        searchable
        nothingFound="Class not found"
      />
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
      <FormErrorsContainer errors={errors} />
      <Group position="left" mt="md">
        <Button type="submit">Create Character</Button>
      </Group>
    </form>
  )
}

export default CharacterForm
