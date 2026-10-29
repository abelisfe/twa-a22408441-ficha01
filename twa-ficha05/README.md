# Ficha 05 — Componentes e Formulários em Vue

## Descrição

Nesta ficha foi desenvolvido um catálogo de jogos em Vue.js, dando continuidade à Ficha 04. A aplicação foi dividida em componentes reutilizáveis, com um formulário para adicionar novos jogos.

## Funcionalidades implementadas

- Componente `ItemList.vue` para apresentar e selecionar jogos.
- Componente `ItemDetail.vue` para apresentar os detalhes.
- Componente `ItemForm.vue` para adicionar jogos.
- Comunicação entre componentes com `defineProps` e `defineEmits`.
- Formulário com `reactive`, `v-model.trim` e `v-model.number`.
- Validação HTML e validação reativa com `computed`.
- Adição de jogos com identificadores únicos.
- Carregamento dos dados através de `getJSON()` e `useLoad()`.
- Tratamento dos estados `loading`, `error` e `ready`.
- Utilização de `watch` para limpar a seleção quando a pesquisa muda.
- Pesquisa, filtragem por categoria e ordenação por preço.

## Como executar

Na pasta `twa-ficha05`, executar:

```bash
npm install
npm run dev
```

Abrir o endereço apresentado pelo Vite no navegador.

Para executar os testes:

```bash
node check.js
```

## Perguntas de reflexão

**1. Porque é que o ItemList não escreve diretamente em selectedId? O que ganhamos com emit?**

Porque o estado pertence ao componente pai e as props devem ser tratadas como só de leitura. Com `emit`, o filho comunica a seleção ao pai, que decide como atualizar o estado. Isto permite reutilizar o componente.

**2. Porque é que visible é um computed e limpar a seleção é um watch?**

Utilizamos `computed` quando queremos calcular um valor a partir de outros dados, como a lista de jogos visíveis. Utilizamos `watch` quando queremos executar uma ação em resposta a uma alteração, como limpar o jogo selecionado quando a pesquisa muda.

**3. O que é que useLoad nos poupa no projeto? O que aconteceria se onMounted estivesse fora dele?**

O `useLoad` permite reutilizar a lógica de carregamento e dos três estados em vários ecrãs, evitando repetir código. Se `onMounted` estivesse fora do composable, cada componente teria de chamar e registar o carregamento individualmente.

**4. Porque é que o formulário valida em HTML, computed e novamente na API? Qual protege os dados?**

A validação HTML fornece verificações imediatas do navegador. O `computed` aplica as regras da aplicação e apresenta mensagens personalizadas. A API volta a validar porque as verificações no navegador podem ser contornadas. A validação no servidor é a que efetivamente protege os dados.

## Utilização de Inteligência Artificial

Foi utilizado o ChatGPT (OpenAI) como ferramenta de apoio à realização da Ficha 05 em casa, nomeadamente na implementação dos componentes, explicação dos conceitos, validação do formulário, identificação de erros e preparação da documentação. O código foi testado localmente.