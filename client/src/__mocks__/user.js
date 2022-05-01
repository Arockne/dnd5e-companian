import { rest } from 'msw'

export const handlers = [
  rest.post('/api/login', (req, res, ctx) => {
    const { username } = req
    return res(ctx.res({ username }), ctx.status(201))
  }),
  rest.post('/api/signup', (req, res, ctx) => {
    return res(ctx.json(201))
  }),
]
