# Roadmap — DROP-IN MARKETPLACE OS

## Finalidade

Este roadmap organiza a evolução do produto por capacidades verificáveis. Datas não são tratadas como promessa; cada fase avança somente quando seus critérios de saída forem atendidos. O roadmap não substitui issues, ADRs nem o changelog.

## Princípios de execução

- construir contratos antes de automações;
- entregar módulos verticais, testáveis e compatíveis;
- validar um marketplace antes de generalizar;
- separar fatos do produto, decisões, geração e auditoria;
- manter revisão humana em decisões sensíveis;
- medir qualidade antes de otimizar velocidade.

## Fase 0 — Foundation (`0.1.x`) — Concluída

**Objetivo:** estabelecer linguagem, arquitetura, governança e versionamento.

Entregas:

- manifesto e contexto oficial;
- arquitetura modular e fronteiras;
- regras para desenvolvimento humano e assistido por IA;
- política de versionamento e compatibilidade;
- estrutura documental e guia de contribuição;
- changelog e roadmap.

Critério de saída: outra pessoa deve compreender o produto, suas regras e como contribuir sem depender do histórico de conversas.

## Fase 1 — Canonical Contracts (`0.2.x`) — Concluída

**Objetivo:** definir entradas, saídas e estados do pipeline.

Entregas:

- modelo canônico de produto e oferta;
- registro de evidências e níveis de confiança;
- JSON Schemas versionados;
- fixtures positivas e negativas;
- testes automatizados de contrato;
- taxonomia de erros, bloqueios e alertas.

Critério de saída: dados inválidos são rejeitados de forma determinística e toda saída pode ser rastreada até sua origem.

Resultado entregue em `0.2.0`: schema canônico, documentação semântica, taxonomia de erros, ADR, fixtures e validação automatizada em duas camadas.

## Fase 2 — Decision Engine (`0.3.x`) — Concluída

**Objetivo:** converter dados validados em estratégia explícita.

Entregas:

- segmentação e objetivo do anúncio;
- proposta de valor e hierarquia de mensagens;
- matriz de objeções, evidência e risco;
- explicação das alternativas descartadas;
- testes de consistência decisória.

Resultado entregue em `0.3.0`: contratos de pedido e estratégia, ranking determinístico por evidência/prioridade, tratamento de objeções, riscos explícitos, decision trace e cinco testes automatizados.

## Fase 3 — Copy Engine (`0.4.x`)

**Objetivo:** gerar conteúdo pesquisável e persuasivo sem inventar fatos.

Entregas:

- títulos, descrições, bullets, atributos e CTAs;
- políticas de alegações e termos proibidos;
- limites configuráveis por marketplace;
- avaliação de SEO, clareza e fidelidade;
- versionamento de templates e prompts.

## Fase 4 — Carousel Engine (`0.5.x`)

**Objetivo:** transformar a estratégia em especificações visuais auditáveis.

Entregas:

- narrativa de carrossel e função de cada imagem;
- regras de preservação do produto;
- safe zones, proporções e legibilidade mobile;
- contratos de asset e critérios de aceite;
- suporte a referências e variações.

## Fase 5 — Analyzer Engine (`0.6.x`)

**Objetivo:** medir qualidade, conformidade e prontidão para publicação.

Entregas:

- rubric versionado de 0 a 100;
- achados explicáveis por severidade;
- bloqueios de segurança e políticas;
- recomendações priorizadas por impacto e esforço;
- regressão automatizada contra casos de referência.

## Fase 6 — Marketplace Adapters (`0.7.x`)

**Objetivo:** adaptar o pacote canônico a canais específicos.

Ordem inicial proposta: Shopee Brasil, Mercado Livre Brasil e TikTok Shop Brasil. A ordem poderá mudar mediante ADR e evidência operacional.

## Fase 7 — Orchestration & Interfaces (`0.8.x`)

**Objetivo:** oferecer execução completa, observável e reprocessável.

Entregas: orquestrador, API/CLI, persistência de execuções, interface operacional, controle de acesso, logs e recuperação de falhas.

## Fase 8 — Production Readiness (`0.9.x`)

**Objetivo:** provar confiabilidade antes da versão estável.

Entregas: testes end-to-end, segurança, desempenho, observabilidade, backup, migrações, documentação operacional e piloto controlado.

## Versão 1.0

A versão `1.0.0` exige contratos públicos estáveis, pelo menos um marketplace suportado de ponta a ponta, políticas de compatibilidade testadas, documentação de operação e evidência de uso real sem bloqueios críticos.

## Fora do escopo atual

- publicação automática sem aprovação configurável;
- alteração autônoma das regras do sistema;
- promessas de performance comercial garantida;
- suporte simultâneo a todos os marketplaces;
- treinamento de modelos proprietários antes da validação dos contratos.