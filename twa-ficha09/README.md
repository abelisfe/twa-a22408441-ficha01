# Ficha 09 — Estrutura, Validação e Tratamento de Erros

## Descrição

Nesta ficha foi reorganizada a API REST da Ficha 08, mantendo as funcionalidades existentes e introduzindo validação com Zod, configuração através de variáveis de ambiente e tratamento centralizado de erros.

## Funcionalidades implementadas

- Separação entre `server.js`, `app.js` e `config.js`.
- Configuração de ambiente através de `.env` e `.env.example`.
- Organização dos jogos em `data.js`, `schema.js` e `router.js`.
- Validação de POST, PUT e PATCH com Zod.
- Middleware reutilizável `validate(schema)`.
- Limpeza e normalização dos dados recebidos.
- Validação dos parâmetros de pesquisa e paginação.
- Tratamento centralizado de erros HTTP 400, 404 e 500.
- Respostas de erro em JSON sem exposição de informações internas.
- Manutenção das operações GET, POST, PUT e DELETE da Ficha 08.
- Suporte para PATCH e paginação opcional.

## Como executar

Na pasta `twa-ficha09`:

```bash
npm install
npm run dev
```

O servidor utiliza a porta definida no ficheiro `.env` ou, por omissão, a porta 3000.

Para testar, com o servidor ligado na porta 3001, executar no CMD:

```bat
set "BASE=http://localhost:3001/api"
node check.mjs
```

Os testes automáticos terminam sem apresentar mensagens quando passam.

## Estrutura

- `src/server.js` — inicia o servidor.
- `src/app.js` — configura o Express e os middlewares.
- `src/config.js` — centraliza as variáveis de ambiente.
- `src/errors.js` — define e trata os erros HTTP.
- `src/validate.js` — valida os pedidos através de Zod.
- `src/entities/items/data.js` — gere os jogos em memória.
- `src/entities/items/schema.js` — define as regras de validação.
- `src/entities/items/router.js` — implementa os métodos REST.
- `.env.example` — documenta a configuração necessária.
- `check.mjs` — testes automáticos.

## Perguntas de reflexão

**1. Porque é que o servidor valida novamente? O que acrescenta o Zod?**

A validação no navegador pode ser contornada. O servidor protege os dados. O Zod valida tipos, normaliza valores, aplica campos por omissão e remove propriedades desconhecidas, como `foo` e `id`.

**2. Onde deve ser tratado o 404? E o CastError do Mongoose?**

A rota identifica o recurso inexistente e lança o erro; o middleware central define a resposta HTTP. Assim evitamos repetição e mantemos respostas consistentes. No M2, um CastError deverá ser convertido num erro adequado, sem expor detalhes internos.

**3. Qual a diferença entre .env e .env.example?**

O `.env` contém a configuração específica de cada computador e pode incluir credenciais, pelo que não deve ser publicado. O `.env.example` documenta as variáveis necessárias, com valores de exemplo, permitindo configurar o projeto após o clone.

**4. Express, Fastify e Hono: o que têm em comum e qual escolherias?**

Os três permitem criar rotas e devolver respostas HTTP com JSON. Express utiliza middlewares; Fastify oferece validação por esquemas e funcionalidades integradas; Hono é leve e suporta diferentes runtimes. Para Cloudflare Workers escolheria Hono, pela compatibilidade com esse ambiente.

## Utilização de Inteligência Artificial

Foi utilizado o ChatGPT (OpenAI) como ferramenta de apoio à realização da ficha em casa, incluindo a reorganização do projeto Express, implementação dos esquemas Zod, tratamento de erros, testes e preparação da documentação.

O funcionamento da API e a compatibilidade com os testes da Ficha 08 devem ser confirmados localmente antes da entrega.