## Utilização de IA generativa

Foi utilizado o ChatGPT como ferramenta de apoio na conclusão do trabalho em casa.



## Ficha 02 - JavaScript Moderno

Nesta ficha foi desenvolvido um catalogo de jogos utilizando JavaScript moderno e modulos ES.

### Ficheiros

* data.js: contem os dados de 8 jogos.
* catalog.js: contem as 6 funcoes puras para filtrar, pesquisar, calcular totais, ordenar, listar categorias e aplicar descontos.
* app.js: permite executar comandos no terminal e gerar o ficheiro report.json.
* check.js: contem os testes automaticos com node:assert/strict.

### Comandos

* node app.js - lista todos os jogos.
* node app.js acao - filtra os jogos por categoria.
* node app.js search minecraft - pesquisa jogos.
* node app.js top 3 - mostra os 3 jogos mais caros.
* node app.js report - gera o relatorio JSON.
* node check.js - executa os testes automaticos.

### Utilizacao de IA generativa

Foi utilizado o ChatGPT como ferramenta de apoio na realizacao da Ficha 02 em casa, nomeadamente para orientacao na implementacao, explicacao das funcoes e verificacao dos testes.



\## Ficha 03 — Catálogo de Jogos no Browser



Nesta ficha foi desenvolvida uma aplicação web utilizando Vite e JavaScript vanilla, aproveitando o catálogo de jogos da Ficha 02.



\### Funcionalidades implementadas

\- Carregamento dos jogos a partir de `public/items.json` com `fetch` e `async/await`.

\- Tratamento dos estados `loading`, `error` e `ready`.

\- Apresentação dos jogos através de `createElement` e `textContent`, sem utilizar `innerHTML` com dados.

\- Pesquisa de jogos por nome ou tags.

\- Filtragem por categoria.

\- Ordenação por preço crescente e decrescente.

\- Visualização dos detalhes dos jogos ao clicar num item.

\- Função pura `sortByPrice()` com testes de ordenação e de preservação dos dados originais.



\### Como executar



Na pasta `twa-ficha03`, executar:



```bash

npm install

npm run dev

```



Abrir no navegador o endereço apresentado pelo Vite.



\### Testes



Para executar os testes da ordenação:



```bash

node check.js

```



Foram também testados os estados de carregamento e erro da aplicação.



\### Utilização de Inteligência Artificial



Foi utilizado o ChatGPT como ferramenta de apoio à realização da ficha, nomeadamente para explicação dos conceitos, desenvolvimento do código, identificação e correção de erros e orientação nos testes. O código foi executado e testado localmente.

