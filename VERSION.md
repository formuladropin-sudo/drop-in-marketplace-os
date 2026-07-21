# Versão do projeto

## Versão atual

`0.2.0`

| Campo | Valor |
|---|---|
| Estágio | Canonical Contracts |
| Estabilidade | Desenvolvimento inicial |
| Contrato canônico | `marketplace_ad@0.2.0` |
| Data | 2026-07-21 |
| Referência | Commit 0002 — Canonical Contracts |

## Significado

- `0`: o sistema ainda está antes da API estável;
- `2`: segunda capacidade compatível — contratos canônicos verificáveis;
- `0`: primeira release desta capacidade.

## Compatibilidade

Documentos `marketplace_ad@0.2.0` são validados pelo schema em `schemas/v0.2.0`. Mudança incompatível no significado ou nos campos obrigatórios exige nova versão e estratégia de migração. Nenhuma engine pode alterar silenciosamente este envelope.

## Regras operacionais

1. Nenhum commit altera comportamento ou contrato sem avaliar impacto na versão.
2. Toda release atualiza este arquivo e o changelog no mesmo commit.
3. Tags usam o formato `vMAJOR.MINOR.PATCH`.
4. Execuções registram `schema_version` e `system_version`.
5. Builds intermediários podem usar sufixos SemVer sem substituir release existente.

Consulte [`docs/project/VERSIONING.md`](docs/project/VERSIONING.md) para as regras completas.