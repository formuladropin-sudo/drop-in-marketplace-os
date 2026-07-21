# Changelog

Todas as mudanças relevantes do DROP-IN MARKETPLACE OS são registradas neste arquivo.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e o projeto adota [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Não publicado]

### Planejado

- verificar e aprovar perfil oficial da Shopee Brasil;
- executar piloto controlado com produto real;
- resolver achados do piloto;
- estabilizar contratos e publicar `1.0.0`.

## [0.9.1] - 2026-07-21

### Adicionado

- interface e registry genéricos para plugins de marketplace;
- schema público `marketplace_export@0.7.0`;
- registro central de todos os contratos;
- testes arquiteturais de dependência, registro e extensibilidade;
- diretório `docs/quality` com quality gate, estratégia de testes, decisões, matriz e auditoria.

### Alterado

- orquestrador desacoplado do adapter Shopee;
- convenções de nomenclatura formalizadas;
- versão elevada para `0.9.1`.

### Corrigido

- ausência de contrato documentado para a exportação;
- dependência concreta de marketplace na camada de aplicação.

## [0.9.0] - 2026-07-21

### Adicionado

- CI em Node 20, 22 e 24;
- auditoria de dependências e verificação de release;
- política de segurança;
- runbook operacional, observabilidade e checklist de release;
- critérios explícitos que bloqueiam `1.0.0` sem evidência externa.

### Alterado

- versão elevada para `0.9.0`;
- README e roadmap atualizados para Production Readiness.

## [0.8.0] - 2026-07-21

### Adicionado

- orquestrador end-to-end de cinco etapas;
- contrato `pipeline_run@0.8.0`;
- CLI local sem publicação externa;
- estados e erros estruturados por etapa;
- relógio injetável para determinismo;
- cinco testes de integração.

### Alterado

- versão elevada para `0.8.0`;
- README e roadmap sincronizados.

## [0.7.0] - 2026-07-21

### Adicionado

- adapter Shopee Brasil com perfil de política versionado;
- mapeamento de produto, preço, atributos, variantes e slides;
- avisos de truncagem e revisão;
- perfil de exemplo explicitamente não aprovado para produção;
- cinco testes automatizados.

### Alterado

- versão elevada para `0.7.0`;
- README e roadmap sincronizados.

## [0.6.0] - 2026-07-21

### Adicionado

- Analyzer Engine com rubric `marketplace-quality@0.6.0`;
- contrato `analysis_report@0.6.0`;
- sete dimensões totalizando 100 pontos;
- achados explicáveis, blockers e próximas ações;
- auditoria cruzada de fontes e claims;
- cinco testes automatizados.

### Alterado

- versão elevada para `0.6.0`;
- README e roadmap sincronizados.

## [0.5.0] - 2026-07-21

### Adicionado

- Carousel Engine para planos visuais auditáveis;
- contratos `carousel_request@0.5.0` e `carousel_plan@0.5.0`;
- narrativa configurável de 3 a 10 slides;
- preservação obrigatória de cor, estampa, proporções e material;
- safe zones, requisitos, proibições e critérios de aceite por slide;
- cobertura de claims e controle de direitos dos assets;
- cinco testes automatizados.

### Alterado

- versão elevada para `0.5.0`;
- README e roadmap sincronizados.

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

[Não publicado]: https://github.com/formuladropin-sudo/drop-in-marketplace-os/compare/v0.9.1...HEAD
[0.9.1]: https://github.com/formuladropin-sudo/drop-in-marketplace-os/compare/v0.9.0...v0.9.1
[0.9.0]: https://github.com/formuladropin-sudo/drop-in-marketplace-os/compare/v0.8.0...v0.9.0
[0.8.0]: https://github.com/formuladropin-sudo/drop-in-marketplace-os/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/formuladropin-sudo/drop-in-marketplace-os/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/formuladropin-sudo/drop-in-marketplace-os/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/formuladropin-sudo/drop-in-marketplace-os/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/formuladropin-sudo/drop-in-marketplace-os/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/formuladropin-sudo/drop-in-marketplace-os/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/formuladropin-sudo/drop-in-marketplace-os/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/formuladropin-sudo/drop-in-marketplace-os/releases/tag/v0.1.0