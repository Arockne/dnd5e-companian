import { rest } from 'msw'

const campaigns = [
  {
    id: 1,
    name: 'Star Wards',
    image_url:
      'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/149534907/original/4ecabb1863e0b9306d653d1921d54eae60bc787a/paint-detailed-fantasy-landscape.jpg',
    setting: 'In a hospital far far away...',
  },
]

const currentlyOwned = [
  {
    id: 1,
    name: 'Star Wards',
    image_url:
      'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/149534907/original/4ecabb1863e0b9306d653d1921d54eae60bc787a/paint-detailed-fantasy-landscape.jpg',
    setting: 'In a hospital far far away...',
    owner: {
      id: 1,
      username: 'test',
    },
  },
]

const currentlyPlaying = [
  {
    id: 1,
    name: 'Knights of the Square Table',
    image_url:
      'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/149534907/original/4ecabb1863e0b9306d653d1921d54eae60bc787a/paint-detailed-fantasy-landscape.jpg',
    setting: 'In the kindom of...',
    owner: {
      id: 2,
      username: 'otherTest',
    },
  },
]

const [campaign1] = campaigns
const indexRoute = '/api/campaigns'
const showRoute = `/api/campaigns/${campaign1.id}`
const postRoute = '/api/campaigns'
const deleteRoute = `/api/campaigns/${campaign1.id}`
const updateRoute = `/api/campaigns/${campaign1.id}`
const currentlyOwnedRoute = '/api/campaigns/currently_owned'
const currenltyPlayingRoute = '/api/campaigns/currently_playing'

export const campaignHandlers = [
  rest.get(indexRoute, (req, res, ctx) => {
    return res(ctx.json(campaigns), ctx.status(200))
  }),
  rest.get(currentlyOwnedRoute, (req, res, ctx) => {
    return res(ctx.json(currentlyOwned), ctx.status(200))
  }),
  rest.get(currenltyPlayingRoute, (req, res, ctx) => {
    return res(ctx.json(currentlyPlaying), ctx.status(200))
  }),
  rest.get(showRoute, (req, res, ctx) => {
    return res(ctx.json(campaign1), ctx.status(200))
  }),
  rest.post(postRoute, (req, res, ctx) => {
    req.id = 3
    return res(ctx.json(req), ctx.status(201))
  }),
  rest.patch(updateRoute, (req, res, ctx) => {
    const updatedCampaign = { ...campaign1, ...req.body }
    return res(ctx.json(updatedCampaign), ctx.status(200))
  }),
  rest.delete(deleteRoute, (req, res, ctx) => {
    return res(ctx.status(200))
  }),
]
