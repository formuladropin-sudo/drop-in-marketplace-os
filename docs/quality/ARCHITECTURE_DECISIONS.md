# Architecture Decisions

## Convenções

- diretórios e arquivos executáveis: `kebab-case`;
- módulos JavaScript: `.mjs`, ESM explícito;
- funções e variáveis: `camelCase`;
- contratos JSON: `snake_case`;
- classes futuras: `PascalCase`;
- códigos de erro: `UPPER_SNAKE_CASE` com prefixo de domínio;
- versões de contratos: diretório `vMAJOR.MINOR.PATCH`;
- entrypoint de módulo: `index.mjs` exportando API pública mínima.

## Direção de dependências

`interfaces → application → engines/contracts` e `application → adapter registry → adapter concreto`. Engines recebem artefatos por parâmetro e não se importam mutuamente. Infraestrutura implementa portas definidas pela aplicação.

## Responsabilidades

- Decision prioriza mensagens.
- Copy transforma estratégia em texto.
- Carousel/Creative especifica narrativa visual.
- Analyzer/Validation audita o pacote.
- Adapter traduz para um canal.
- Orchestrator coordena etapas.

Os nomes Carousel e Analyzer permanecem APIs compatíveis em `0.x`; para 1.0, a documentação os apresenta como implementações iniciais das capacidades Creative e Validation, sem renomeação destrutiva.