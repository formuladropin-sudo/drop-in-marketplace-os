# Checklist de release

## Código e contratos

- [ ] `npm ci` e `npm run check` aprovados.
- [ ] CI aprovada em Node 20, 22 e 24.
- [ ] schemas e fixtures validados.
- [ ] nenhuma quebra incompatível não documentada.
- [ ] changelog, versão e links atualizados.

## Segurança e operação

- [ ] nenhuma credencial ou dado pessoal versionado.
- [ ] dependências sem vulnerabilidade alta/crítica conhecida.
- [ ] runbook e rollback revisados.
- [ ] logs/erros minimizam dados.

## Marketplace

- [ ] perfil oficial vigente verificado e datado.
- [ ] categoria e campos testados em ambiente controlado.
- [ ] responsável operacional aprovou limites e mapeamento.

## Estabilidade 1.0

- [ ] piloto real concluído sem blocker crítico.
- [ ] contratos públicos declarados estáveis.
- [ ] suporte e resposta a incidentes definidos.
- [ ] tag e notas de release revisadas.

Itens externos não podem ser marcados por suposição. Enquanto perfil oficial e piloto real não forem comprovados, `1.0.0` permanece bloqueada.