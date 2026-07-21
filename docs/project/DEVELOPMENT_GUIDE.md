# Guia de desenvolvimento

## Objetivo

Definir como pessoas e agentes de IA transformam uma necessidade em alteração segura, revisável e compatível no repositório oficial.

## Pré-condições

Antes de implementar:

1. leia `MANIFEST.md` e `PROJECT_CONTEXT.md`;
2. identifique o contrato e módulo responsáveis;
3. confirme o estado do `main` e alterações existentes;
4. escreva critérios de aceitação verificáveis;
5. avalie impacto de versão e necessidade de ADR;
6. não assuma dados de produto, política ou integração ausentes.

## Fluxo de contribuição

1. **Issue ou objetivo:** descreva problema, valor, escopo e exclusões.
2. **Design:** documente fluxo, contrato e riscos; crie ADR quando estrutural.
3. **Branch:** use branch curta baseada no `main` atualizado.
4. **Implementação:** mantenha fronteiras e faça a menor mudança completa.
5. **Validação:** execute testes relevantes, validação de schemas e revisão documental.
6. **Commit:** agrupe uma intenção lógica e use mensagem padronizada.
7. **Review:** apresente impacto, evidência de teste, compatibilidade e rollback.
8. **Merge/release:** atualize changelog e versão conforme a política.

## Branches

- `feat/<escopo>` — capacidade compatível;
- `fix/<escopo>` — correção;
- `docs/<escopo>` — documentação;
- `refactor/<escopo>` — mudança interna sem alterar comportamento;
- `chore/<escopo>` — manutenção;
- `release/<versao>` — preparação de release quando necessária.

## Commits

Use Conventional Commits:

```text
tipo(escopo): descrição imperativa e objetiva
```

Exemplos:

```text
docs(foundation): establish project governance
feat(contracts): add canonical product schema
fix(analyzer): prevent missing evidence from passing
```

Um commit lógico deve ser compreensível, validável e reversível sem depender de alterações futuras.

## Definition of Ready

- problema e usuário afetado identificados;
- escopo e fora de escopo definidos;
- critérios de aceitação testáveis;
- dependências e riscos conhecidos;
- versão/contratos afetados avaliados.

## Definition of Done

- implementação e documentação estão coerentes;
- entradas e saídas são validadas;
- testes proporcionais ao risco foram executados;
- casos de erro e observabilidade foram considerados;
- nenhuma credencial ou dado sensível foi incluído;
- compatibilidade foi preservada ou há migração documentada;
- changelog, versão e ADR foram atualizados quando aplicável;
- o resultado pode ser utilizado por outra pessoa sem contexto privado.

## Estratégia de testes

| Tipo | Finalidade |
|---|---|
| Unitário | Regras puras, limites e transformações. |
| Contrato | Compatibilidade de schemas e interfaces. |
| Integração | Comunicação entre módulos e provedores. |
| End-to-end | Fluxos críticos da entrada à exportação. |
| Fixture/regressão | Casos de referência e falhas já conhecidas. |

Correções de bug devem incluir teste que falha antes da correção, sempre que tecnicamente possível.

## Documentação

Documentos oficiais explicam decisões, não apenas nomes. Links relativos devem funcionar no GitHub. Exemplos devem declarar se são fictícios. Mudança de comportamento sem atualização documental é incompleta.

## Revisão de código

O review verifica corretude, fronteiras, contrato, risco, segurança, clareza, testes e compatibilidade. Preferências pessoais não devem bloquear uma solução correta quando não houver padrão registrado.

## Rollback e migração

Mudanças que alteram dados persistidos, integrações ou contratos precisam definir rollback ou roll-forward. Migrações devem ser idempotentes, observáveis e testadas com backup adequado.