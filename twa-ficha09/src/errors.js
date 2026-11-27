
import { z, ZodError } from 'zod'

// Erro HTTP com um codigo de estado
export class HttpError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

// Atalho para criar erros 404
export const notFound = (what = 'not found') =>
  new HttpError(404, what)

// Transformar erros do Zod numa mensagem por campo
export const fieldErrors = (zodError) =>
  Object.fromEntries(
    Object.entries(
      z.flattenError(zodError).fieldErrors
    ).map(([field, messages]) => [
      field,
      messages[0]
    ])
  )

// Middleware central de tratamento de erros
export function errorHandler(err, req, res, next) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      errors: fieldErrors(err)
    })
  }

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      error: 'invalid JSON body'
    })
  }

  const status = err.status ?? 500

  if (status >= 500) {
    console.error(err)
  }

  res.status(status).json({
    error: status >= 500
      ? 'internal error'
      : err.message
  })
}
