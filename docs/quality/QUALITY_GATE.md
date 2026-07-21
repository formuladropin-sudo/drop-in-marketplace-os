# Quality Gate

## Objetivo

Definir critérios binários para aprovar mudanças e releases. Score alto não compensa blocker.

## Gate de commit

1. escopo lógico único e documentação sincronizada;
2. `npm ci --ignore-scripts` reproduzível;
3. `npm test` integralmente aprovado;
4. schemas válidos e fixtures coerentes;
5. nenhuma dependência arquitetural proibida;
6. zero vulnerabilidade alta ou crítica;
7. versão e changelog coerentes.

## Gate arquitetural

- engines não importam outras engines, adapters, aplicação ou interfaces;
- aplicação depende da interface/registry de adapters, nunca de canal concreto;
- adapters não alteram contratos upstream;
- todo contrato público possui schema, produtor, consumidor e documentação;
- novo marketplace entra por registro, sem alteração do Core;
- quebra pública possui migração e incremento SemVer adequado.

## Gate de release 1.0

Além dos gates anteriores: CI aprovada nas versões suportadas, perfil oficial do canal verificado, piloto real sem blocker crítico, runbook revisado e contratos declarados estáveis.

## Resultado

`PASS` exige todos os itens aplicáveis. `CONDITIONAL` indica dependência externa explícita. `FAIL` bloqueia merge ou release.