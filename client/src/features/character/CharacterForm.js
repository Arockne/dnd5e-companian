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
      <TextInput label="Name" name="name" />
      <TextInput label="Image" name="image_url" />
      <ColorInput label="Eyes" name="eyes" />
      <ColorInput label="Hair" name="hair" />
      <ColorInput label="Skin" name="skin" />
      <Textarea label="Appearance" name="appearance" />
      <Textarea label="Backstory" name="backstory" />
      {/* <Select label="Race" name="race" />
      <Select label="Class" name="profession" />
      <Select label="Background" name="background" />
      <Select label="Alignment" name="alignment" />
      <Select label="Gender" name="gender" /> */}
      <NumberInput label="Age" name="age" />
      <NumberInput label="Height" name="height" />
      <NumberInput label="Weight" name="weight" />
      <NumberInput label="Strength" name="strength" />
      <NumberInput label="Dexterity" name="dexterity" />
      <NumberInput label="Constitution" name="constitution" />
      <NumberInput label="Intelligence" name="intelligence" />
      <NumberInput label="Wisdom" name="wisdom" />
      <NumberInput label="Charisma" name="charisma" />
    </form>
  )
}

export default CharacterForm
