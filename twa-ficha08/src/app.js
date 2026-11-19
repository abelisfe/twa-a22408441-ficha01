
import express from 'express'
import itemsRouter from './items/router.js'

const app = express()

// Logger: regista cada pedido HTTP
app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})

// Permite receber pedidos com corpo JSON
app.use(express.json())

// Verificar se o servidor esta a funcionar
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    time: new Date()
  })
})

// Rotas dos jogos
app.use('/api/items', itemsRouter)

// Resposta para enderecos inexistentes
app.use((req, res) => {
  res.status(404).json({
    error: 'not found'
  })
})

app.listen(3000, () => {
  console.log('Servidor: http://localhost:3000')
})
