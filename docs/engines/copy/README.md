# Copy Engine

## Responsabilidade

A Copy Engine converte uma `decision_strategy` aprovada em título, bullets, descrição e CTA. Ela preserva a hierarquia decidida e registra quais claims sustentam cada elemento persuasivo.

## Contratos

- Produto: `marketplace_ad@0.2.0`
- Estratégia: `decision_strategy@0.3.0`
- Pedido: [`copy_request@0.4.0`](../../../schemas/v0.4.0/copy-request.schema.json)
- Saída: [`copy_package@0.4.0`](../../../schemas/v0.4.0/copy-package.schema.json)

## Comportamento inicial

Esta implementação é determinística e baseada em templates, apropriada como baseline auditável. O título combina nome do produto e palavras-chave não repetidas. Bullets derivam exclusivamente da hierarquia de claims suportadas. A descrição organiza introdução, benefícios e CTA sem criar fatos adicionais.

## Rastreabilidade

Bullets e descrição contêm `source_claim_ids`. O título usa apenas identidade do produto e palavras-chave fornecidas, portanto não declara benefício autônomo. Qualquer mensagem cuja claim deixe de ser suportada bloqueia a conformidade.

## Limites

- respeita limites configurados de caracteres e quantidade;
- registra toda truncagem para revisão;
- recusa estratégia bloqueada;
- recusa locale diferente do marketplace;
- não cria preço, urgência, garantia, estoque ou benefício;
- não substitui adapter de marketplace;
- `tone` está contratado, mas variações estilísticas serão adicionadas somente com regras e testes próprios.

## Uso

```js
import { generateCopy } from "./src/engines/copy/index.mjs";

const copyPackage = generateCopy(canonicalAd, decisionStrategy, copyRequest);
```

Modelos generativos futuros deverão produzir o mesmo contrato, passar pelo mesmo verificador de claims e ser comparados contra esta baseline determinística.