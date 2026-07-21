# Changelog

Todas as mudanças relevantes do DROP-IN MARKETPLACE OS são registradas neste arquivo.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e o projeto adota [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Não publicado]

### Planejado

- contrato de saída da Decision Engine;
- proposta de valor e hierarquia de mensagens;
- matriz de objeções, evidência e risco;
- testes de consistência decisória.

## [0.2.0] - 2026-07-21

### Adicionado

- contrato canônico `marketplace_ad` em JSON Schema Draft 2020-12;
- modelo de produto, variantes, oferta, evidências, claims, assets e metadados;
- invariantes semânticas para referências, moedas, preços e estoque;
- taxonomia estável de estados, severidades e códigos de erro;
- validador estrutural e semântico baseado em Ajv;
- fixtures positivas e negativas executadas por `npm test`;
- ADR da escolha de JSON Schema e Node.js/Ajv para a ferramenta de referência.

### Alterado

- versão do projeto elevada de `0.1.0` para `0.2.0`;
- README e roadmap atualizados para refletir a conclusão de Canonical Contracts.

## [0.1.0] - 2026-07-21

### Adicionado

- README profissional com visão, princípios, arquitetura e governança;
- manifesto e definição da fonte oficial do projeto;
- contexto completo: problema, usuários, escopo, restrições e métricas;
- arquitetura modular orientada a contratos;
- guia de desenvolvimento, commits, testes e revisão;
- regras obrigatórias para pessoas, agentes e automações de IA;
- política de versionamento, compatibilidade, depreciação e release;
- roadmap por fases com critérios de saída;
- registro canônico da versão `0.1.0`.

[Não publicado]: https://github.com/formuladropin-sudo/drop-in-marketplace-os/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/formuladropin-sudo/drop-in-marketplace-os/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/formuladropin-sudo/drop-in-marketplace-os/releases/tag/v0.1.0