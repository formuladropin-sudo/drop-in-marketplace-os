# Versão do projeto

## Versão atual

`0.9.1`

| Campo | Valor |
|---|---|
| Estágio | Architecture Audit |
| Estabilidade | Arquitetura aprovada para Marketplace Core 1.0 |
| Adapter interface | `0.9.1` |
| Export contract | `marketplace_export@0.7.0` |
| CI | Node 20, 22 e 24 |
| Data | 2026-07-21 |
| Referência | Commit 0.9.1 — Architecture Audit |

## Parecer

Dependências, responsabilidades, nomenclatura, documentação, contratos e extensibilidade foram auditados. O núcleo não depende mais de um marketplace concreto; novos canais entram por registry e interface pública.

## Estado da versão 1.0

A arquitetura está aprovada para o marco Marketplace Core. A publicação estável continua condicionada a:

1. perfil oficial vigente da Shopee Brasil verificado e aprovado;
2. piloto controlado com produto real concluído sem blocker crítico.

Consulte [`docs/quality/ARCHITECTURE_AUDIT_0.9.1.md`](docs/quality/ARCHITECTURE_AUDIT_0.9.1.md).