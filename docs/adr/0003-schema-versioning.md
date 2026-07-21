# ADR 0003 — JSON Schema e versionamento por diretório

- **Status:** aceita; substitui `0001-json-schema-canonical-contracts.md`
- **Data:** 2026-07-21
- **Versão:** 0.9.2

## Problema

Engines e interfaces precisam trocar documentos legíveis, independentes de linguagem e compatíveis ao longo do tempo. Tipos apenas em JavaScript não validam dados em runtime.

## Decisão

Adotar JSON Schema Draft 2020-12, organizar schemas em `schemas/vMAJOR.MINOR.PATCH/` e complementar validação estrutural com invariantes semânticas. `$id`, path e `schema_version` precisam concordar.

## Alternativas consideradas

- TypeScript exclusivo: acopla o contrato à linguagem e não valida runtime.
- OpenAPI: adequado a transporte HTTP, não à fonte do domínio.
- Protocol Buffers: eficiente, mas adiciona toolchain e reduz legibilidade nesta fase.
- validação por prompt: não determinística e inadequada para fronteira de sistema.

## Consequências

Contratos são portáveis e testáveis. Mudanças incompatíveis criam nova versão e migração. Invariantes relacionais exigem código adicional. Schemas publicados não podem ser reescritos silenciosamente.