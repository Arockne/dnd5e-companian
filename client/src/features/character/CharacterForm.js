import {
  ColorInput,
  NumberInput,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core'
import React, { useState } from 'react'

function CharacterForm() {
  const [form, setForm] = useState({
    name: '',
    image_url: '',
    appearance: '',
    backstory: '',
    race: '',
    profession: '',
    background: '',
    alignment: '',
    gender: '',
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

  function handleChange(e) {
    const { name, value } = e.target
    const updatedForm = { ...form, [name]: value }
    setForm(updatedForm)
  }

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

  // Warlock Wizard

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

  return (
    <form>
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
      />
      <Select
        label="Class"
        name="profession"
        data={professions}
        value={profession}
        onChange={setProfession}
      />
      {/* <Select label="Background" name="background" value={form.background} onChange={handleChange} />
      <Select label="Alignment" name="alignment" value={form.alignment} onChange={handleChange} />
      <Select label="Gender" name="gender" value={form.gender} onChange={handleChange} /> */}
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
    </form>
  )
}

export default CharacterForm
