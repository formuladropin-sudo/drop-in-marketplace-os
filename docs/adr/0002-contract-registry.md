# ADR 0002 — Registro central de contratos públicos

- **Status:** aceita
- **Data:** 2026-07-21
- **Versão:** 0.9.1

## Problema

Schemas estavam distribuídos por versão, sem inventário único de produtor, consumidor e documentação. Isso permitia criar contrato público sem tornar seu impacto visível.

## Decisão

Manter `docs/contracts/CONTRACT_REGISTRY.md` como índice obrigatório. Teste arquitetural garante que todo schema em diretório versionado apareça no registro.

## Alternativas consideradas

- inferir contratos pelo filesystem: não registra semântica nem consumidores.
- gerar documentação apenas a partir do schema: não explica responsabilidade e compatibilidade.
- catálogo externo: criaria uma segunda fonte de verdade.

## Consequências

Mudanças contratuais ficam auditáveis no mesmo repositório. O registro exige manutenção no commit de criação. Schemas continuam sendo a fonte executável; o registro é a fonte de descoberta e governança.