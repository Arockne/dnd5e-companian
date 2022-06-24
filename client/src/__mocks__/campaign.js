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

const [campaign1] = campaigns
const indexRoute = '/campaigns'
const showRoute = `/campaigns/${campaign1.id}`
const postRoute = '/campaigns'
const deleteRoute = `/campaigns/${campaign1.id}`
const updateRoute = `/campaigns/${campaign1.id}`

export const campaignHandlers = [
  rest.get(indexRoute, (req, res, ctx) => {
    return res(ctx.json(campaigns), ctx.status(200))
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
