# Decision Engine

## Responsabilidade

A Decision Engine transforma claims já validadas e prioridades comerciais explícitas em uma estratégia ordenada. Ela decide **o que comunicar primeiro**; não redige copy final, não cria imagens, não pesquisa políticas e não publica anúncios.

## Contratos

- Entrada de produto: `marketplace_ad@0.2.0`
- Pedido estratégico: [`decision_request@0.3.0`](../../../schemas/v0.3.0/decision-request.schema.json)
- Saída: [`decision_strategy@0.3.0`](../../../schemas/v0.3.0/decision-strategy.schema.json)
- Algoritmo: `decision-ranking@0.3.0`

## Algoritmo inicial

Somente claims com status `supported` concorrem à hierarquia. Cada candidata recebe:

```text
score = evidence_score × 70% + business_priority_normalized × 30%
```

O `evidence_score` combina confiança e força da fonte:

| Evidência | Peso |
|---|---:|
| verified | 100 |
| observed | 90 |
| provided | 80 |
| inferred | 40 |

Empates são resolvidos por `claim_id`, garantindo determinismo. Os pesos são parte do algoritmo versionado; alterá-los exige teste, changelog e avaliação SemVer.

## Saída explicável

Cada mensagem registra rank, claim, evidências, score de evidência, prioridade comercial, score final e fórmula aplicada. `decision_trace` registra candidatos aceitos/rejeitados e versão do algoritmo.

## Status

- `ready`: há proposta sustentada e nenhum risco pendente;
- `needs_review`: há estratégia utilizável, mas confiança, direitos ou objeções exigem revisão;
- `blocked`: não há claim suportada ou existe risco bloqueador.

## Limites de segurança

- hipótese nunca vira claim suportada;
- claim proibida gera blocker;
- referência desconhecida interrompe a execução;
- direitos de asset desconhecidos geram revisão;
- objeção sem resposta suportada permanece visível;
- a engine não inventa público: ele é fornecido no pedido estratégico.

## Uso

```js
import { decide } from "./src/engines/decision/index.mjs";

const strategy = decide(canonicalAd, decisionRequest);
```

Entradas devem ser validadas contra seus schemas antes da execução em produção.