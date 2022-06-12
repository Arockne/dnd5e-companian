import {
  ColorInput,
  NumberInput,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core'
import React from 'react'

function CharacterForm() {
  return (
    <form>
      <TextInput label="Name" />
      <TextInput label="Image" />
      <ColorInput label="Eyes" />
      <ColorInput label="Hair" />
      <ColorInput label="Skin" />
      <Textarea label="Appearance" />
      <Textarea label="Backstory" />
      {/* <Select label="Race" />
      <Select label="Class" />
      <Select label="Background" />
      <Select label="Alignment" />
      <Select label="Gender" /> */}
      <NumberInput label="Age" />
      <NumberInput label="Height" />
      <NumberInput label="Weight" />
      <NumberInput label="Strength" />
      <NumberInput label="Dexterity" />
      <NumberInput label="Constitution" />
      <NumberInput label="Intelligence" />
      <NumberInput label="Wisdom" />
      <NumberInput label="Charisma" />
    </form>
  )
}

export default CharacterForm
