# Compatibility Matrix

| Componente | Versão | Consome | Produz | Estado |
|---|---:|---|---|---|
| Decision Engine | 0.3.0 | Ad 0.2 + Request 0.3 | Strategy 0.3 | Compatível |
| Copy Engine | 0.4.0 | Ad 0.2 + Strategy 0.3 + Request 0.4 | Copy 0.4 | Compatível |
| Carousel/Creative | 0.5.0 | Ad 0.2 + Strategy 0.3 + Copy 0.4 | Plan 0.5 | Compatível |
| Analyzer/Validation | 0.6.0 | Ad 0.2 + Strategy 0.3 + Copy 0.4 + Plan 0.5 | Report 0.6 | Compatível |
| Adapter Interface | 0.9.1 | Pacote aprovado + Profile | Export 0.7 | Compatível |
| Shopee BR Adapter | 0.9.1 | Interface + Profile Shopee | Export 0.7 | Perfil produtivo pendente |
| Orchestrator | 0.8.0 | Requests + Registry | Run 0.8 | Compatível |
| Plugin Loader | 0.9.2 | Manifest 0.9.2 | Adapter Registry | Candidato a estável |

Node 20, 22 e 24 são suportados em CI. Consumidores devem validar `schema_version` e rejeitar major desconhecida. A matriz é atualizada em toda mudança de contrato ou suporte.