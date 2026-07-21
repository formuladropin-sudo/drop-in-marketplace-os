# Versão do projeto

## Versão atual

`0.3.0`

| Campo | Valor |
|---|---|
| Estágio | Decision Engine |
| Estabilidade | Desenvolvimento inicial |
| Entrada canônica | `marketplace_ad@0.2.0` |
| Contratos da engine | `decision_request@0.3.0`, `decision_strategy@0.3.0` |
| Algoritmo | `decision-ranking@0.3.0` |
| Data | 2026-07-21 |
| Referência | Commit 0003 — Decision Engine |

## Significado

- `0`: o sistema permanece antes da API estável;
- `3`: terceira capacidade compatível — decisão estratégica verificável;
- `0`: primeira release desta capacidade.

## Compatibilidade

A Decision Engine `0.3.0` consome `marketplace_ad@0.2.0` e `decision_request@0.3.0`. Ela produz `decision_strategy@0.3.0`. Pesos e fórmula pertencem ao algoritmo versionado; mudanças que alterem ranking exigem regressão, changelog e avaliação de compatibilidade.

## Regras operacionais

1. Nenhuma engine altera fatos do contrato canônico.
2. Toda saída registra versões da entrada, contrato e algoritmo.
3. Toda release atualiza versão, changelog, documentação e testes.
4. Tags usam `vMAJOR.MINOR.PATCH`.
5. Mudança incompatível requer migração documentada.

Consulte [`docs/project/VERSIONING.md`](docs/project/VERSIONING.md) para as regras completas.