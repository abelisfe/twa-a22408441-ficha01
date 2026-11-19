\# Ficha 08 — API REST com Express



\## Descrição



Nesta ficha foi desenvolvida uma API REST utilizando Node.js e Express 5, com base no catálogo de jogos das fichas anteriores.



A API permite consultar, pesquisar, adicionar, atualizar e eliminar jogos, utilizando dados guardados temporariamente em memória.



\## Funcionalidades implementadas



\- `GET /api/health` — verificar o estado do servidor.

\- `GET /api/items` — listar todos os jogos.

\- `GET /api/items?q=texto` — pesquisar jogos.

\- `GET /api/items/:id` — consultar um jogo pelo ID.

\- `POST /api/items` — criar jogos com validação.

\- `PUT /api/items/:id` — atualizar um jogo.

\- `DELETE /api/items/:id` — eliminar um jogo.

\- Utilização de `Router()` para organizar as rotas.

\- Utilização de `express.json()` para interpretar pedidos JSON.

\- Middleware logger para registar os pedidos.

\- Middleware 404 para endereços inexistentes.

\- Respostas HTTP com os códigos 200, 201, 204, 400 e 404.



\## Como executar



Na pasta `twa-ficha08`, executar:



```bash

npm install

npm run dev

```



O servidor fica disponível em:



`http://localhost:3000`



Para executar os testes automáticos, mantendo o servidor ligado, abrir outro terminal e executar:



```bash

node check.mjs

```



Os testes terminam sem mensagens quando todas as verificações passam.



\## Estrutura do projeto



\- `src/app.js` — configuração do Express e middlewares.

\- `src/items/router.js` — rotas REST dos jogos.

\- `src/catalog.js` — funções reutilizadas das fichas anteriores.

\- `data/items.json` — catálogo inicial.

\- `check.mjs` — testes automáticos da API.



\## Perguntas de reflexão



\*\*1. Quem decide o código de estado HTTP? Porque é que o fetch não lança exceção num 404?\*\*



O servidor decide o código de estado através de `res.status()`. O `fetch` não lança exceção num 404 porque recebeu uma resposta HTTP válida, mesmo que o recurso não exista. O cliente deve verificar `res.ok`.



\*\*2. Porque é que express.json() tem de estar antes das rotas? O que acontece sem Content-Type: application/json?\*\*



Porque o `express.json()` interpreta o corpo JSON antes de o pedido chegar às rotas. Sem o cabeçalho adequado, o corpo não é interpretado como JSON e `req.body` pode ficar indefinido, levando a erros de validação.



\*\*3. Porque desaparecem os jogos criados quando reiniciamos o servidor? Qual é a diferença relativamente ao M1?\*\*



Porque os jogos são guardados num array em memória. No M1, os dados locais estavam na memória do navegador; agora estão na memória do servidor Node.js, partilhada pelos clientes. No M2 será utilizada uma base de dados para persistir os dados.



\*\*4. Como seria implementado o mesmo GET /api/items/:id em Laravel?\*\*



Em Laravel também existiria uma rota associada a um handler que devolve JSON e um código HTTP. A diferença é que Laravel fornece funcionalidades como Eloquent e validação integrada. O processo Node.js mantém o array em memória entre pedidos; no modelo habitual de PHP, cada pedido tem um ciclo de execução próprio.



\## Utilização de Inteligência Artificial



Foi utilizado o ChatGPT (OpenAI) como ferramenta de apoio à realização da ficha em casa, nomeadamente na implementação das rotas Express, validação dos pedidos, organização dos middlewares, resolução de erros, elaboração dos testes e revisão da documentação.



A API foi executada localmente e foram verificados os métodos GET, POST, PUT e DELETE, bem como os códigos HTTP e os testes automáticos com `check.mjs`.

