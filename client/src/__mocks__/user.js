import { rest } from 'msw'

export const handlers = [
  rest.post('/api/login', (req, res, ctx) => {
    const { username } = req.body
    return res(ctx.json({ username }), ctx.status(201))
  }),
  rest.post('/api/signup', (req, res, ctx) => {
    return res(ctx.status(201))
  }),
  rest.get('/api/me', (req, res, ctx) => {
    return res(ctx.json({ id: 1, username: 'test' }), ctx.status(200))
  }),
]
