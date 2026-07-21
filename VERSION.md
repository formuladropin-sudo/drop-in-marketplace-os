# Versão do projeto

## Versão atual

`0.6.0`

| Campo | Valor |
|---|---|
| Estágio | Analyzer Engine |
| Estabilidade | Desenvolvimento inicial |
| Relatório | `analysis_report@0.6.0` |
| Rubric | `marketplace-quality@0.6.0` |
| Data | 2026-07-21 |
| Referência | Commit 0006 — Analyzer Engine |

## Compatibilidade

O Analyzer consome os pacotes `0.2.0` a `0.5.0` e não os modifica. Pesos e critérios são versionados; alteração de score exige nova versão do rubric e regressão documentada.

## Regras operacionais

1. Score representa critérios demonstrados.
2. Blocker prevalece sobre a nota.
3. Cada falha oferece recomendação acionável.
4. Relatórios registram todas as fontes do pacote.
5. Mudanças incompatíveis exigem migração.

Consulte [`docs/project/VERSIONING.md`](docs/project/VERSIONING.md).