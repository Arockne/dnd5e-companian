import { rest } from 'msw'

const characters = [
  {
    id: 1,
    name: 'Rocko',
    background: 'Noble',
    race: 'Dwarf',
    klass: 'Fighter',
    alignment: 'Neutral',
    experience: 0,
    image_url:
      'https://i.pinimg.com/736x/4c/bf/af/4cbfafee43753bcf121ccf636c034a7a.jpg',
    strength: 18,
    dexterity: 18,
    constitution: 18,
    intelligence: 18,
    wisdom: 18,
    charisma: 18,
    campaign: {
      id: 1,
      name: 'Star Wards',
    },
  },
]

const [character1] = characters
const indexRoute = '/api/characters'
const showRoute = `/api/campaigns/${character1.campaign.id}/characters/${character1.id}`
const postRoute = `/api/campaigns/1/characters`
const deleteRoute = `/api/campaigns/${character1.campaign.id}/characters/${character1.id}`

export const handlers = [
  rest.get(indexRoute, (req, res, ctx) => {
    return res(ctx.json(characters), ctx.status(200))
  }),
  rest.get(showRoute, (req, res, ctx) => {
    return res(ctx.json(character1), ctx.status(200))
  }),
  rest.post(postRoute, (req, res, ctx) => {
    req.id = 3
    return res(ctx.json(req), ctx.status(201))
  }),
  rest.delete(deleteRoute, (req, res, ctx) => {
    return res(ctx.status(200))
  }),
]
