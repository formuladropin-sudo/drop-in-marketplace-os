# Estabilidade e compatibilidade pública

## Escopo da API pública

São públicos: entrypoints `index.mjs`, funções exportadas pelo Core, Adapter Interface/Registry, contratos listados no Contract Registry, schemas versionados, códigos de erro documentados e formato do manifesto de plugins.

Arquivos internos, helpers não exportados, fixtures e ferramentas em `tools/` não são API pública, embora mudanças continuem revisadas.

## Componentes

| Área | Compromisso antes de 1.0 | Compromisso a partir de 1.0 |
|---|---|---|
| Decision Engine | Versionada, sujeita a evolução declarada | API e contratos estáveis no major |
| Copy/Creative/Validation | Versionadas, sem quebra silenciosa | API e contratos estáveis no major |
| Registry e Plugin Loader | Candidato em 0.9.2 | Manifesto e resolução congelados |
| Contracts/Schemas | Migração obrigatória para quebra | SemVer estrito e janela de depreciação |
| Adapters | Independentes do Core | Interface estável; política do canal externa |

## SemVer e breaking changes

Breaking change inclui remover/renomear export público, alterar parâmetros obrigatórios, mudar semântica ou tipo de campo, rejeitar documento antes válido, modificar código de erro existente ou alterar resolução de plugins de forma incompatível.

Mudança compatível inclui novo adapter, novo campo opcional, novo código de erro, otimização interna sem mudança observável e documentação corretiva.

## Deprecation Policy

Deprecações declaram item, substituto, versão inicial, aviso e versão de remoção. Após 1.0, uma API pública permanece por pelo menos um ciclo MINOR antes de remoção no próximo MAJOR, salvo vulnerabilidade crítica documentada.

## Contratos

Consumidores devem validar `schema_version`, aceitar apenas versões suportadas e preservar o documento original durante migração. O Contract Registry e a Compatibility Matrix definem combinações suportadas.

## Adapters e políticas externas

A interface do adapter é pública; limites de marketplace não são. Perfis de política carregam versão própria e podem evoluir sem alterar o Core.