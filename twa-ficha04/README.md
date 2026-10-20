# Ficha 04 — Catálogo de Jogos em Vue

## Descrição

Aplicação web desenvolvida com Vue.js e Vite, utilizando o catálogo de jogos criado nas Fichas 02 e 03.

## Funcionalidades

- Carregamento de jogos com `fetch` e `async/await`.
- Tratamento dos estados `loading`, `error` e `ready`.
- Gestão do estado com `ref`.
- Utilização de `computed` para pesquisa, categorias e jogo selecionado.
- Pesquisa de jogos por nome ou tags.
- Filtro por categoria.
- Ordenação por preço crescente e decrescente.
- Visualização dos detalhes de cada jogo.
- Botão para tentar carregar novamente em caso de erro.
- Utilização de `v-model`, `v-if`, `v-for`, `:key` e `@click`.
- Estilos definidos com `<style scoped>`.

## Como executar

Na pasta `twa-ficha04`, executar:

```bash
npm install
npm run dev
```

Abrir no navegador o endereço apresentado pelo Vite.

Para executar os testes:

```bash
node check.js
```

## Perguntas de reflexão

**1. O que desapareceu do main.js da Ficha 03 e para onde foi cada parte?**

O estado passou para os `ref` do `App.vue`. A função `render()` deixou de ser necessária porque o Vue atualiza automaticamente a página. Os eventos passaram a ser tratados diretamente no template, através de `v-model` e `@click`.

**2. Porque é que escrevemos items.value no script e items no template?**

No script, `.value` permite aceder ao valor guardado num `ref`. No template, o Vue faz esse acesso automaticamente.

**3. Porque é que visible é um computed e não um ref atualizado em cada evento?**

Porque `computed` recalcula automaticamente a lista quando os dados, a pesquisa, a categoria ou a ordenação mudam. Com um `ref` atualizado manualmente, poderíamos esquecer-nos de atualizar a lista em algum evento.

**4. O que evita o :key? O que acontece se usarmos o índice?**

O `:key` permite ao Vue identificar cada elemento da lista. Se usarmos o índice numa lista que muda de ordem, o Vue pode reutilizar elementos incorretamente, provocando inconsistências na interface.

## Utilização de Inteligência Artificial

Foi utilizado o ChatGPT em casa como ferramenta de apoio à implementação da aplicação Vue, explicação dos conceitos, correção de erros e preparação dos testes e da documentação. O código foi executado e verificado localmente.
