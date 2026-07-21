# Taxonomia de erros e estados

## Objetivo

Fornecer códigos estáveis e acionáveis. Mensagens podem ser traduzidas; códigos, severidade e significado permanecem compatíveis dentro da versão suportada.

## Estados do documento

| Estado | Significado |
|---|---|
| `received` | Recebido, ainda não normalizado. |
| `normalized` | Convertido ao envelope canônico. |
| `validated` | Aprovado estrutural e semanticamente. |
| `invalid` | Rejeitado por contrato ou coerência. |
| `blocked` | Válido, mas impedido por risco ou política. |
| `failed` | Execução interrompida por falha técnica. |

## Severidades

- `error`: impede validação do contrato;
- `blocker`: contrato válido, mas impede progressão/publicação;
- `warning`: permite progressão somente com visibilidade ou revisão;
- `info`: observação sem impacto imediato.

## Códigos estruturais

| Código | Uso |
|---|---|
| `CONTRACT_SCHEMA_INVALID` | O próprio schema não compila. |
| `CONTRACT_REQUIRED_FIELD_MISSING` | Campo obrigatório ausente. |
| `CONTRACT_TYPE_MISMATCH` | Tipo incompatível. |
| `CONTRACT_VALUE_OUT_OF_RANGE` | Número ou tamanho fora do limite. |
| `CONTRACT_ENUM_INVALID` | Valor fora do vocabulário permitido. |
| `CONTRACT_FORMAT_INVALID` | Data, locale, moeda ou identificador inválido. |
| `CONTRACT_UNKNOWN_PROPERTY` | Campo não declarado no contrato. |
| `CONTRACT_SCHEMA_VERSION_UNSUPPORTED` | Leitor não suporta a versão recebida. |

## Códigos semânticos

| Código | Uso |
|---|---|
| `SEMANTIC_DUPLICATE_ID` | ID ou SKU duplicado. |
| `SEMANTIC_REFERENCE_NOT_FOUND` | Referência aponta para item inexistente. |
| `SEMANTIC_CLAIM_WITHOUT_EVIDENCE` | Claim suportada não possui evidência publicável. |
| `SEMANTIC_CURRENCY_MISMATCH` | Moedas do marketplace e oferta divergem. |
| `SEMANTIC_COMPARE_PRICE_INVALID` | Preço comparativo é inferior ao atual. |
| `SEMANTIC_STOCK_INCONSISTENT` | Quantidade contradiz disponibilidade. |
| `SEMANTIC_ASSET_RIGHTS_UNKNOWN` | Direito de uso exige revisão. |

## Estrutura de um achado

```json
{
  "code": "SEMANTIC_REFERENCE_NOT_FOUND",
  "severity": "error",
  "path": "/claims/0/evidence_ids/0",
  "message": "Evidence reference 'ev-missing' was not found.",
  "context": { "reference": "ev-missing" }
}
```

Mensagens não devem conter credenciais, dados pessoais desnecessários ou o documento completo.

## Compatibilidade

Adicionar código é compatível em versão MINOR. Alterar significado ou remover código exige depreciação e avaliação MAJOR. Consumidores devem tratar códigos desconhecidos por severidade, sem considerá-los sucesso.