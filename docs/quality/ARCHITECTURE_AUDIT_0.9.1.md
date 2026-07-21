# Architecture Audit 0.9.1

## Escopo

Dependências, responsabilidades, nomenclatura, documentação, contratos e extensão para novos marketplaces.

## Achados e correções

| Achado | Severidade | Correção |
|---|---|---|
| Orquestrador importava Shopee diretamente | Alta | Adapter interface, registry e resolução por canal/país. |
| Export do adapter sem schema público | Alta | `marketplace-export.schema.json`. |
| Contratos sem inventário central | Média | `CONTRACT_REGISTRY.md`. |
| Convenções implícitas | Média | `ARCHITECTURE_DECISIONS.md`. |
| Quality gate disperso | Média | Diretório `docs/quality/` e gate formal. |

## Resultado

- Responsabilidade única das engines: **PASS**.
- Direção de dependências: **PASS após correção**.
- Nomenclatura: **PASS com convenções formalizadas**.
- Cobertura documental: **PASS**.
- Contratos documentados: **PASS após registro/schema de export**.
- Novo marketplace sem alteração do núcleo: **PASS**, demonstrado por adapter injetado em teste.

## Parecer

Arquitetura aprovada para iniciar o marco Marketplace Core 1.0. A publicação estável continua condicionada à política oficial vigente do primeiro canal e ao piloto operacional real definidos no release checklist.