# ADR 0001 — Orchestrator depende do Adapter Registry

- **Status:** aceita
- **Data:** 2026-07-21
- **Versão:** 0.9.1

## Problema

O orquestrador importava diretamente o adapter Shopee Brasil. Cada novo marketplace exigiria alterar a aplicação, criando acoplamento, risco de regressão e violação do princípio aberto/fechado.

## Decisão

O orquestrador recebe ou utiliza um `AdapterRegistry` e resolve plugins pela chave `channel:country`. Adapters implementam `defineMarketplaceAdapter`; nomes concretos não aparecem no Core nem no orquestrador.

## Alternativas consideradas

- `switch` por marketplace: simples, mas cresce centralmente e exige mudança a cada canal.
- descoberta automática por diretório: conveniente, porém implícita, difícil de proteger e dependente do filesystem.
- injeção direta de uma função por execução: flexível, mas não oferece inventário, duplicidade ou descoberta padronizada.

## Consequências

Novos canais entram por registro sem modificar o núcleo. Duplicidades falham explicitamente. A aplicação passa a depender da interface do registry. Configuração de plugins torna-se responsabilidade da composição da aplicação.