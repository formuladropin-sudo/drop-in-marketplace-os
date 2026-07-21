# Contract Registry

| Contrato | Versão | Schema | Produtor | Consumidores | Documentação |
|---|---:|---|---|---|---|
| Marketplace Ad | 0.2.0 | `schemas/v0.2.0/marketplace-ad.schema.json` | Input/Core | Decision, Copy, Carousel, Analyzer, Adapters | `docs/contracts/CANONICAL_MODEL.md` |
| Decision Request | 0.3.0 | `schemas/v0.3.0/decision-request.schema.json` | Interface | Decision | `docs/engines/decision/README.md` |
| Decision Strategy | 0.3.0 | `schemas/v0.3.0/decision-strategy.schema.json` | Decision | Copy, Carousel, Analyzer | `docs/engines/decision/README.md` |
| Copy Request | 0.4.0 | `schemas/v0.4.0/copy-request.schema.json` | Interface | Copy | `docs/engines/copy/README.md` |
| Copy Package | 0.4.0 | `schemas/v0.4.0/copy-package.schema.json` | Copy | Carousel, Analyzer, Adapters | `docs/engines/copy/README.md` |
| Carousel Request | 0.5.0 | `schemas/v0.5.0/carousel-request.schema.json` | Interface | Carousel | `docs/engines/carousel/README.md` |
| Carousel Plan | 0.5.0 | `schemas/v0.5.0/carousel-plan.schema.json` | Carousel | Analyzer, Adapters | `docs/engines/carousel/README.md` |
| Analysis Report | 0.6.0 | `schemas/v0.6.0/analysis-report.schema.json` | Analyzer | Adapters, Review | `docs/engines/analyzer/README.md` |
| Marketplace Export | 0.7.0 | `schemas/v0.7.0/marketplace-export.schema.json` | Adapter | Export/Review | `docs/adapters/shopee-br/README.md` |
| Pipeline Run | 0.8.0 | `schemas/v0.8.0/pipeline-run.schema.json` | Orchestrator | CLI/Persistence | `docs/application/ORCHESTRATION.md` |

Todo schema público deve aparecer nesta tabela no mesmo commit em que for criado. Alterações seguem `docs/project/VERSIONING.md`.