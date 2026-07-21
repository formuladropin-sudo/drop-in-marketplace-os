# Runbook operacional

## Pré-requisitos

- Node.js 20, 22 ou 24;
- instalação reproduzível com `npm ci --ignore-scripts`;
- perfil de marketplace verificado e versionado;
- entrada validada e sem segredos.

## Verificação

```bash
npm run check
```

O comando executa contratos, testes unitários/integrados e auditoria de dependências. Falha em qualquer etapa bloqueia release.

## Execução local

```bash
npm run cli -- pipeline-input.json > pipeline-output.json
```

Revise `status`, `stages`, `analysis.findings`, `next_actions`, warnings do adapter e versão do perfil antes de usar a saída.

## Incidentes

1. interrompa publicação externa;
2. preserve `run_id`, versões e erro sem copiar dados sensíveis;
3. identifique o primeiro estágio `failed`;
4. reproduza com a mesma entrada em ambiente isolado;
5. corrija no módulo responsável e adicione regressão;
6. reexecute desde a entrada canônica;
7. documente impacto e versão corrigida.

## Rollback

O sistema não publica automaticamente. Para regressão de código, use a última tag conhecida e reinstale pelo lockfile. Não force migração de contratos: utilize o conversor documentado ou mantenha a versão anterior suportada.

## Backup e retenção

Este repositório não implementa persistência. Consumidores devem guardar entradas, artefatos e relatórios por `run_id`, definir retenção compatível com privacidade e testar restauração antes de produção.