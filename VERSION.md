# Versão do projeto

## Versão atual

`0.4.0`

| Campo | Valor |
|---|---|
| Estágio | Copy Engine |
| Estabilidade | Desenvolvimento inicial |
| Entrada canônica | `marketplace_ad@0.2.0` |
| Estratégia | `decision_strategy@0.3.0` |
| Copy | `copy_request@0.4.0`, `copy_package@0.4.0` |
| Data | 2026-07-21 |
| Referência | Commit 0004 — Copy Engine |

## Compatibilidade

A Copy Engine `0.4.0` consome contratos canônico e estratégico existentes sem modificá-los. Elementos persuasivos mantêm referências às claims suportadas. Mudança de template que altere significado, ordem ou política de conformidade exige regressão e avaliação SemVer.

## Regras operacionais

1. Copy nunca promove hipótese a fato.
2. Mensagens persuasivas registram claims de origem.
3. Limites e truncagens permanecem observáveis.
4. Releases atualizam versão, changelog, documentação e testes.
5. Mudanças incompatíveis exigem migração.

Consulte [`docs/project/VERSIONING.md`](docs/project/VERSIONING.md).