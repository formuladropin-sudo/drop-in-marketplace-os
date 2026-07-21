# ADR 0004 — Plugins declarativos por manifesto

- **Status:** aceita
- **Data:** 2026-07-21
- **Versão:** 0.9.2

## Problema

O registry permite injeção, mas a aplicação ainda precisa importar cada adapter durante a composição. Descoberta implícita de diretórios seria insegura e pouco reproduzível.

## Decisão

Adicionar um plugin loader assíncrono que lê um manifesto explícito, resolve apenas módulos locais permitidos, importa a exportação declarada e cria um registry validado. O manifesto é versionado e ordenado.

## Alternativas consideradas

- varrer diretórios automaticamente: efeitos implícitos e difícil controle de confiança.
- instalar plugins arbitrários por URL: amplia superfície de supply chain.
- manter imports manuais: seguro, porém não escala e exige mudar composição.

## Consequências

Adapters podem ser descobertos sem alterar Core. A lista permanece revisável e determinística. Plugins remotos e caminhos fora da raiz são rejeitados. Carregamento é assíncrono e falhas de manifesto bloqueiam inicialização.