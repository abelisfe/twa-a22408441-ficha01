# Ficha 06 — Rotas e Paginação em Vue

## Descrição

Nesta ficha foi desenvolvida uma aplicação Vue.js com navegação entre páginas através do Vue Router, dando continuidade ao catálogo de jogos das fichas anteriores.

## Funcionalidades implementadas

- Navegação com Vue Router, `RouterLink` e `RouterView`.
- Página inicial com catálogo de jogos, pesquisa, categorias e ordenação.
- Página de detalhe de cada jogo através de `/items/:id`.
- Formulário para adicionar novos jogos em `/items/new`.
- Estado partilhado entre páginas através de `store.js`.
- Navegação automática para o detalhe após adicionar um jogo.
- Página 404 para endereços inexistentes.
- Página de Pokémon com dados da PokéAPI.
- Paginação através de `?page=N`, com botões Anterior e Seguinte.
- Carregamento assíncrono com tratamento dos estados `loading`, `error` e `ready`.

## Como executar

Na pasta `twa-ficha06`, executar:

```bash
npm install
npm run dev
```

Abrir no navegador o endereço indicado pelo Vite.

Para executar os testes:

```bash
node check.js
```

## Perguntas de reflexão

**1. A página de resultados vive no URL (`?page=3`) e não num `ref`. O que deixaria de funcionar com um `ref`?**

Se a página fosse guardada apenas num `ref`, perderíamos a página atual ao atualizar o navegador. Também não seria possível partilhar um link diretamente para uma página específica, e os botões Voltar e Avançar do navegador não acompanhariam corretamente a paginação.

**2. Criaste um item em `/items/new`, voltaste à lista e lá estava; fizeste reload e desapareceu. Explica as duas coisas e o que muda no M2.**

O item continua na lista porque o `store.js` guarda os dados em memória e partilha-os entre as páginas. Quando fazemos reload, a aplicação reinicia e volta a carregar os dados originais. No M2, os itens serão guardados através de uma API no servidor, permitindo persistir os dados.

**3. `/items/1` → `/items/2` reutiliza o `ItemPage`; `/` → `/items/1` monta-o de novo. Quando chega o `onMounted` e quando é preciso um `watch`?**

O `onMounted` é executado quando o componente é montado pela primeira vez. Quando navegamos entre URLs que utilizam o mesmo componente, este pode ser reutilizado, pelo que precisamos de um `watch` sobre o parâmetro `id` para reagir à alteração.

**4. SPA, SSR ou SSG: qual escolherias para o vosso projeto e qual para o site público da ISLA? Porquê?**

Para o projeto escolheria SPA, porque é uma aplicação interativa com navegação e dados obtidos de APIs, sem grande necessidade de indexação nos motores de busca. Para o site público da ISLA escolheria SSR ou SSG, porque permitem apresentar conteúdo mais rapidamente e facilitam o SEO. SSG seria adequado para páginas estáticas e SSR para conteúdos que precisem de ser gerados dinamicamente no servidor.

## Utilização de Inteligência Artificial

Foi utilizado o ChatGPT (OpenAI) como ferramenta de apoio à realização da Ficha 06 em casa, nomeadamente na implementação das rotas, organização do estado, paginação, explicação dos conceitos e preparação dos testes e da documentação. O código foi executado e verificado localmente.
