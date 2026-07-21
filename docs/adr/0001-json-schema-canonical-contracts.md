# ADR 0001 — JSON Schema para contratos canônicos

- **Status:** aceita
- **Data:** 2026-07-21
- **Decisores:** Arquitetura do DROP-IN MARKETPLACE OS

## Contexto

Core, engines, adapters e interfaces precisam compartilhar dados sem depender de linguagem ou implementação específica. O contrato deve rejeitar entradas ambíguas, produzir erros legíveis e permanecer versionável.

## Decisão

Adotar JSON Schema Draft 2020-12 para validação estrutural, complementado por um validador semântico para referências e invariantes entre campos. Schemas são imutáveis depois de utilizados em release e organizados por versão.

O validador de referência usa Node.js 20+ e Ajv 8. Essa escolha implementa a ferramenta de desenvolvimento; não obriga consumidores em outras linguagens a usar JavaScript.

## Alternativas consideradas

### TypeScript como fonte exclusiva

Boa experiência local, mas vincula contratos a uma linguagem e não valida documentos em runtime sem código adicional.

### OpenAPI

Útil para APIs HTTP, porém o problema atual é o documento de domínio, não o transporte.

### Protocol Buffers

Oferece forte compatibilidade binária, mas adiciona toolchain e reduz legibilidade dos artefatos humanos nesta fase.

### Validação somente por prompt

Não determinística, difícil de testar e inadequada como fronteira de sistema.

## Consequências

Positivas:

- contratos legíveis e independentes de linguagem;
- validação automática e fixtures de regressão;
- erros estruturais separados de semânticos;
- evolução explícita por versão.

Custos:

- invariantes relacionais exigem código adicional;
- schema e documentação precisam evoluir juntos;
- consumidores devem implementar ou reutilizar validação compatível.

## Reavaliação

Reavaliar quando houver requisitos de alto volume binário, streaming ou múltiplas APIs públicas que justifiquem geração adicional de tipos/protocolos.