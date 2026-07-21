# Carousel Engine

## Responsabilidade

A Carousel Engine converte estratégia e copy aprovadas em especificações visuais ordenadas. Ela não renderiza imagens: produz um plano auditável para designers, modelos de imagem ou pipelines gráficos.

## Contratos

- Pedido: [`carousel_request@0.5.0`](../../../schemas/v0.5.0/carousel-request.schema.json)
- Saída: [`carousel_plan@0.5.0`](../../../schemas/v0.5.0/carousel-plan.schema.json)

## Narrativa

A sequência-base cobre capa, vistas, benefício, detalhe, lifestyle, material, medidas, confiança e CTA. A quantidade é configurável de 3 a 10 slides; capa e CTA preservam posições extremas. Mensagens de benefício vêm somente da hierarquia estratégica.

## Preservação

O pedido exige preservação de cor, estampa, proporções e material. Cada slide repete proibições e critérios de aceite para que essas regras não se percam ao chegar à ferramenta visual. Assets com direitos desconhecidos não são utilizados automaticamente.

## Qualidade

- uma mensagem principal por slide;
- safe zone configurável;
- legibilidade mobile;
- referências explícitas de assets e claims;
- cobertura mensurável das mensagens suportadas;
- warning quando medidas forem solicitadas sem fonte suficiente.

## Uso

```js
import { planCarousel } from "./src/engines/carousel/index.mjs";
const plan = planCarousel(ad, strategy, copyPackage, carouselRequest);
```