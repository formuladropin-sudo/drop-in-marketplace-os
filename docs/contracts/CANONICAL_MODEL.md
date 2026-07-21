# Modelo canônico de anúncio

## Objetivo

Representar fatos do produto e da oferta antes de qualquer decisão criativa. O modelo não contém título final, descrição final, estratégia ou carrossel: essas saídas serão acrescentadas por contratos próprios quando as engines forem implementadas.

## Envelope

| Campo | Responsabilidade |
|---|---|
| `schema_version` | Selecionar regras de leitura e migração. |
| `contract_type` | Identificar semanticamente o documento. |
| `project_id` | Relacionar execuções do mesmo projeto. |
| `marketplace` | Definir canal, país, locale e moeda. |
| `product` | Registrar identidade, atributos e variações. |
| `offer` | Registrar preço, expedição e garantia. |
| `evidence` | Sustentar fatos e alegações com origem e confiança. |
| `claims` | Declarar o que pode ou não ser comunicado. |
| `assets` | Referenciar imagens e documentos sem incorporar binários. |
| `metadata` | Garantir rastreabilidade da execução. |

## Evidência

Tipos oficiais:

- `provided`: declarado pelo responsável do produto;
- `observed`: diretamente observável em referência;
- `verified`: confirmado por documento ou fonte controlada;
- `inferred`: conclusão do sistema ainda não aprovada como fato.

`confidence` mede confiança na interpretação, não qualidade comercial. Evidência inferida não pode sustentar sozinha uma claim com status `supported`.

## Claims

- `supported`: permitida porque possui evidência publicável existente;
- `hypothesis`: hipótese para revisão ou teste, não elegível para publicação automática;
- `prohibited`: registrada para impedir uso, mesmo quando atraente comercialmente.

Claims tornam a fronteira entre dado e persuasão explícita. Uma engine poderá reformular uma claim suportada, mas não elevar hipótese a fato.

## Produto e variações

O produto contém atributos comuns. Cada variante possui SKU e atributos discriminadores, como cor ou tamanho. SKUs são únicos no documento. Ativos podem limitar sua aplicação por `variant_skus`; referências inexistentes são inválidas.

## Oferta

Preço é armazenado como número decimal e moeda ISO 4217. `compare_at_price` precisa usar a mesma moeda e não pode ser menor que o preço atual. Tempo de expedição descreve a responsabilidade do vendedor e não deve ser confundido com prazo total de entrega.

## Campos desconhecidos

Objetos de domínio usam `additionalProperties: false`. Isso evita que erros de digitação sejam aceitos como dados legítimos. Extensões precisam passar pelo processo de evolução contratual.

## Identificadores e rastreabilidade

IDs são estáveis dentro do documento e adequados para logs. `run_id` identifica uma execução; `correlation_id` conecta execuções relacionadas. Dados sensíveis não devem ser usados como identificadores.

## Invariantes semânticas

1. IDs de evidência, claim, asset e SKUs são únicos em seu domínio.
2. Toda referência aponta para um objeto existente.
3. Claim suportada possui ao menos uma evidência não inferida.
4. Moedas da oferta coincidem com a moeda do marketplace.
5. `compare_at_price`, quando presente, não é menor que `price`.
6. `stock_quantity` só é usado quando há quantidade conhecida.
7. Asset com direitos `unknown` exige revisão antes de uso.