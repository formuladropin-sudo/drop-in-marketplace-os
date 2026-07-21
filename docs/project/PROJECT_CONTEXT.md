# Contexto do projeto

## Identidade

- **Nome:** DROP-IN MARKETPLACE OS
- **Categoria:** framework de geração e otimização de anúncios para marketplaces
- **Fonte oficial:** `formuladropin-sudo/drop-in-marketplace-os`
- **Estágio atual:** Foundation
- **Versão inicial:** `0.1.0`

## Problema

A criação de anúncios para marketplaces costuma misturar coleta de dados, pesquisa, estratégia, SEO, copy, design, regras do canal e análise em um processo informal. Isso gera inconsistência, retrabalho, invenção de informações, baixa rastreabilidade e dificuldade para escalar aprendizados.

## Visão do produto

Fornecer um sistema operacional de anúncios capaz de transformar um briefing de produto em um pacote de anúncio completo, verificável e adaptável a diferentes canais, preservando fidelidade do produto e governança sobre decisões automatizadas.

## Usuários e atores

| Ator | Necessidade principal |
|---|---|
| Operador de marketplace | Criar e revisar anúncios com velocidade e padrão. |
| Especialista comercial | Definir oferta, público, diferenciação e objeções. |
| Copywriter | Produzir texto baseado em estratégia e evidência. |
| Designer/gerador visual | Receber especificações claras e preservar o produto. |
| Analista | Auditar qualidade, conformidade e oportunidades. |
| Desenvolvedor | Integrar engines e canais por contratos estáveis. |
| Responsável pela marca | Aprovar identidade, alegações e resultado final. |

## Resultado esperado

Para cada produto e marketplace, o sistema deve ser capaz de produzir:

- briefing normalizado e pendências;
- estratégia comercial justificada;
- título, descrição, benefícios, atributos e CTAs;
- plano de carrossel e especificações de assets;
- relatório de qualidade, riscos e recomendações;
- pacote exportável com versão e rastreabilidade.

## Escopo funcional futuro

1. ingestão de dados estruturados e referências;
2. validação e classificação de evidências;
3. decisão de posicionamento e hierarquia;
4. geração de copy;
5. especificação visual;
6. auditoria e scoring;
7. adaptação por marketplace;
8. exportação, monitoramento e aprendizado controlado.

## Restrições

- nenhuma engine pode publicar fatos não sustentados;
- políticas variam por país, categoria e canal;
- imagens devem preservar características reais do produto;
- automações externas dependem de autorização explícita;
- métricas de venda não provam causalidade isoladamente;
- informações pessoais e credenciais não pertencem aos contratos de domínio.

## Métricas de sucesso

### Qualidade do sistema

- percentual de entradas válidas na primeira tentativa;
- cobertura de testes de contrato;
- taxa de achados explicáveis;
- incidência de regressões e quebras de compatibilidade;
- tempo de reprocessamento por módulo.

### Resultado operacional

- tempo entre briefing e rascunho aprovado;
- taxa de aprovação sem retrabalho;
- redução de erros de catálogo e política;
- consistência entre título, descrição e criativos;
- desempenho comercial analisado por experimento, sem promessa garantida.

## Glossário mínimo

- **Engine:** módulo de domínio com responsabilidade e contrato definidos.
- **Adapter:** componente que traduz o modelo canônico para um canal.
- **Evidence:** origem que sustenta um fato ou decisão.
- **Ad Package:** pacote final do anúncio e seus metadados.
- **Finding:** achado produzido por auditoria.
- **Run:** execução identificável do pipeline.
- **Human-in-the-loop:** revisão humana prevista como parte do fluxo.