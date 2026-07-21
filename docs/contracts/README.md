# Canonical Contracts

## Finalidade

Os contratos canônicos são a linguagem compartilhada entre Core, engines, adapters e interfaces. Eles definem o que entra no sistema, como fatos são sustentados, quais estados são válidos e como uma execução pode ser reproduzida.

## Versão atual

- Contrato: `marketplace_ad`
- Schema: `0.2.0`
- Arquivo: [`schemas/v0.2.0/marketplace-ad.schema.json`](../../schemas/v0.2.0/marketplace-ad.schema.json)
- Compatibilidade: desenvolvimento inicial, regido por [`VERSIONING.md`](../project/VERSIONING.md)

## Validação em duas camadas

1. **Estrutural:** JSON Schema valida presença, tipos, formatos, limites, enums e propriedades desconhecidas.
2. **Semântica:** o validador verifica referências, unicidade global, coerência monetária e uso de evidências.

Um documento só é aceito quando passa pelas duas camadas.

## Uso

```bash
npm ci
npm test
```

O comando valida o próprio schema, todos os casos em `tests/fixtures/contracts/valid` e confirma que os casos de `invalid` são rejeitados pelo código esperado.

## Regras de evolução

- nunca editar silenciosamente um schema já consumido em produção;
- mudanças compatíveis permanecem documentadas no mesmo ciclo MINOR/PATCH aplicável;
- mudanças incompatíveis criam nova versão de diretório e conversor;
- fixtures antigas permanecem como regressão enquanto a versão for suportada;
- toda execução registra `schema_version` e `system_version`.

## Conteúdo relacionado

- [Modelo canônico](CANONICAL_MODEL.md)
- [Taxonomia de erros](ERROR_TAXONOMY.md)
- [ADR 0001](../adr/0001-json-schema-canonical-contracts.md)