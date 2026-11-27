
import express from 'express'

import itemsRouter from './entities/items/router.js'
import { errorHandler, notFound } from './errors.js'

export const app = express()

// Logger
app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})

// Interpretar o corpo JSON
app.use(express.json())

// Verificar o estado do servidor
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    time: new Date()
  })
})

// Rotas do catalogo
app.use('/api/items', itemsRouter)

// Rota inexistente
app.use((req, res, next) => {
  next(
    notFound(`no route for ${req.method} ${req.originalUrl}`)
  )
})

// Tratamento centralizado de erros
app.use(errorHandler)
