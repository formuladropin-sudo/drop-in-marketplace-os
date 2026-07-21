# Changelog

Todas as mudanças relevantes do DROP-IN MARKETPLACE OS são registradas neste arquivo.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e o projeto adota [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Não publicado]

### Planejado

- contratos e narrativa da Carousel Engine;
- especificações de assets e safe zones;
- regras de preservação do produto;
- testes de cobertura visual e rastreabilidade.

## [0.4.0] - 2026-07-21

### Adicionado

- Copy Engine determinística para título, bullets, descrição e CTA;
- contratos `copy_request@0.4.0` e `copy_package@0.4.0`;
- rastreabilidade de elementos persuasivos por `source_claim_ids`;
- limites configuráveis de caracteres e quantidade;
- registro de truncagens e violações de suporte;
- bloqueio de estratégia inválida e locale incompatível;
- documentação completa e cinco testes automatizados.

### Alterado

- versão elevada para `0.4.0`;
- README e roadmap atualizados para a Copy Engine.

## [0.3.0] - 2026-07-21

### Adicionado

- Decision Engine determinística e independente de geração livre;
- contratos `decision_request@0.3.0` e `decision_strategy@0.3.0`;
- algoritmo versionado `decision-ranking@0.3.0`;
- ranking por força da evidência e prioridade comercial explícita;
- proposta de valor, hierarquia de mensagens, objeções, riscos e confiança;
- decision trace com fórmula e quantidade de candidatos;
- bloqueios para claims proibidas e referências desconhecidas;
- documentação completa de responsabilidade, uso e limites;
- cinco testes automatizados de contrato, determinismo e segurança.

### Alterado

- versão do sistema elevada para `0.3.0`;
- suíte `npm test` ampliada para contratos e testes da Decision Engine;
- README e roadmap sincronizados com a primeira engine funcional.

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

[Não publicado]: https://github.com/formuladropin-sudo/drop-in-marketplace-os/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/formuladropin-sudo/drop-in-marketplace-os/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/formuladropin-sudo/drop-in-marketplace-os/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/formuladropin-sudo/drop-in-marketplace-os/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/formuladropin-sudo/drop-in-marketplace-os/releases/tag/v0.1.0