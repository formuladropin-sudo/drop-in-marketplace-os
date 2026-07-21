# Versão do projeto

## Versão atual

`0.1.0`

| Campo | Valor |
|---|---|
| Estágio | Foundation |
| Estabilidade | Desenvolvimento inicial |
| Contratos públicos | Ainda não estabilizados |
| Data | 2026-07-21 |
| Referência | Commit 0001 — Foundation |

## Significado

- `0`: o sistema ainda pode evoluir estruturalmente antes da API estável;
- `1`: primeira capacidade formal — fundação arquitetural e documental;
- `0`: nenhuma correção posterior aplicada à Foundation.

O número canônico da versão é o valor exibido neste arquivo. O `CHANGELOG.md` registra o conteúdo das versões; `docs/project/VERSIONING.md` define as regras de incremento, compatibilidade e depreciação.

## Regras operacionais

1. Nenhum commit altera comportamento ou contrato sem avaliar impacto na versão.
2. Toda release atualiza este arquivo e o changelog no mesmo commit de release.
3. Tags usam o formato `vMAJOR.MINOR.PATCH`.
4. Documentos e artefatos gerados devem registrar a versão do sistema responsável.
5. Builds intermediários podem usar sufixos SemVer, como `0.2.0-alpha.1`, sem substituir uma release estável existente.