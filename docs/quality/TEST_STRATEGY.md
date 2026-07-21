# Test Strategy

## Pirâmide

- **Contrato:** schemas, formatos e fixtures positivas/negativas.
- **Unitário:** regras determinísticas de cada engine.
- **Arquitetura:** direção de dependências e extensibilidade.
- **Integração:** passagem de artefatos entre módulos.
- **End-to-end:** execução completa até exportação.
- **Operacional:** instalação limpa, auditoria e CI multi-Node.

## Regressão obrigatória

Correções incluem teste que falha antes da mudança. Alterações de ranking, rubric, templates, política ou mapping preservam fixtures históricas e explicam qualquer diff intencional.

## Determinismo

Relógio e dependências variáveis são injetáveis. Para a mesma entrada e versões, engines retornam a mesma saída. Integrações generativas futuras devem ser testadas por contrato, invariantes e fixtures, não por texto idêntico.

## Cobertura

Cobertura relevante é comportamental: caminho feliz, limites, bloqueios, referências inválidas, compatibilidade e falha por estágio. Percentual de linhas poderá ser adicionado quando houver baseline justificada, sem substituir esses cenários.