# Orchestration & CLI

## Responsabilidade

O orquestrador executa Decision, Copy, Carousel, Analyzer e Adapter em ordem, preservando artefatos e estados. Ele coordena; não replica regras internas das engines.

## Execução

`runMarketplacePipeline(input, options)` recebe o anúncio canônico, os três pedidos e o perfil do marketplace. O relógio pode ser injetado para testes determinísticos. Cada etapa registra início, conclusão e status.

Falhas são convertidas em `PIPELINE_STAGE_FAILED:<stage>:<cause>`, carregam as etapas e artefatos concluídos e impedem execução downstream.

## CLI

```bash
npm run cli -- pipeline-input.json
```

A CLI lê um JSON expandido, escreve o `pipeline_run` em stdout e envia erros estruturados para stderr. Ela não grava, publica ou envia dados externamente.

## Contrato

O resultado segue [`pipeline_run@0.8.0`](../../schemas/v0.8.0/pipeline-run.schema.json). Persistência, filas e API HTTP ficam fora deste commit e deverão consumir o mesmo contrato.