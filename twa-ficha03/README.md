\## Perguntas de reflexão — Ficha 03



\*\*1. Porque é que o fetch não lança uma exceção com um 404? Em que casos lança?\*\*



O `fetch` não lança uma exceção com um erro 404 porque recebeu uma resposta do servidor, mesmo sendo um erro HTTP. Lança exceções em situações como falhas de rede ou quando o pedido é interrompido. Por isso, devemos verificar `res.ok`.



\*\*2. O que acontece se te esqueceres do await antes de res.json()? O que vês na página?\*\*



Sem o `await`, o `res.json()` devolve uma `Promise` em vez dos dados JSON. Como o código espera uma lista de jogos, pode ocorrer um erro e a página não apresenta os jogos corretamente.



\*\*3. Porque é que innerHTML com dados de uma API é perigoso, e qual é o equivalente no Django (ou no Blade)?\*\*



O `innerHTML` pode permitir ataques XSS se os dados da API contiverem código HTML malicioso. No Django, o equivalente é utilizar `|safe`, que desativa a proteção automática de HTML. O mais seguro é utilizar `textContent` em JavaScript e manter o escape automático nos templates.



\*\*4. No teu render(), o que é que o Vue vai fazer por ti na próxima semana?\*\*



O Vue vai atualizar automaticamente a interface quando os dados mudarem, sem precisarmos de chamar manualmente a função `render()`. Também vai facilitar a gestão dos eventos, dos filtros e da ordenação através de diretivas e propriedades reativas.

