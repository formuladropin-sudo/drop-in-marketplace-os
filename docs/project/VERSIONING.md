# Versionamento e compatibilidade

## Padrão

O projeto segue Semantic Versioning no formato `MAJOR.MINOR.PATCH`.

- **MAJOR:** mudança incompatível em contrato, API, persistência ou comportamento público.
- **MINOR:** nova capacidade compatível.
- **PATCH:** correção compatível, reforço documental ou melhoria interna sem quebra.

Durante `0.x`, a arquitetura está em desenvolvimento, mas quebras continuam obrigadas a ser explícitas, documentadas e acompanhadas por migração quando houver consumidores.

## Fonte da versão

`/VERSION.md` contém a versão canônica. Tags Git usam `vMAJOR.MINOR.PATCH`. O changelog descreve o impacto humano; schemas, prompts, rubrics e adapters registram suas próprias versões quando se tornarem contratos independentes.

## Compatibilidade

Uma mudança é compatível quando consumidores válidos continuam funcionando sem alteração e o significado dos campos existentes não muda.

Exemplos compatíveis:

- adicionar campo opcional com default documentado;
- ampliar validação sem rejeitar entradas antes válidas;
- corrigir texto ou implementação interna preservando saída pública;
- adicionar novo adapter sem modificar o modelo canônico.

Exemplos incompatíveis:

- remover ou renomear campo público;
- tornar campo opcional obrigatório;
- alterar tipo, unidade ou semântica;
- mudar enum sem estratégia para consumidores antigos;
- recalcular score com rubric diferente sem registrar sua versão;
- alterar formato persistido sem migração.

## Depreciação

Uma depreciação deve:

1. identificar o item e a versão em que foi descontinuado;
2. apresentar substituto e exemplo de migração;
3. emitir aviso detectável quando tecnicamente possível;
4. manter suporte por janela definida em ADR ou release notes;
5. remover somente em versão compatível com o impacto anunciado.

## Versionamento de contratos

Contratos serializados incluem `schema_version`. Leitores devem rejeitar versões maiores desconhecidas e podem aceitar revisões compatíveis conhecidas. Conversores entre versões devem ser puros, testados e preservar o original para auditoria.

## Prompts, rubrics e políticas

Prompts e rubrics que alteram resultados recebem identificador e versão. Uma execução registra as versões utilizadas. Política externa deve registrar canal, região e data/versão de referência para evitar que regras atuais sejam confundidas com regras históricas.

## Processo de release

1. confirmar testes e critérios da fase;
2. classificar impacto SemVer;
3. atualizar `VERSION.md` e `CHANGELOG.md`;
4. revisar migrações, depreciações e rollback;
5. criar commit de release quando aplicável;
6. criar tag anotada;
7. publicar notas com mudanças, riscos e instruções.

## Hotfix

Hotfix corrige falha crítica compatível a partir da versão afetada. Ele não deve incluir feature oportunista. Após publicação, a correção deve ser incorporada às linhas de desenvolvimento relevantes.