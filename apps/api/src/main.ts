import * as path from 'path'

import express from 'express'

const app = express()

app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' })
})

const port = process.env.PORT || 3333
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`)
})
server.on('error', console.error)
