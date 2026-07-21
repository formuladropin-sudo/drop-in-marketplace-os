# Analyzer Engine

## Responsabilidade

A Analyzer Engine audita o pacote completo e produz score explicável, achados e próximas ações. Ela não corrige silenciosamente as engines anteriores.

## Rubric `marketplace-quality@0.6.0`

| Dimensão | Peso |
|---|---:|
| Evidência | 20 |
| Clareza | 15 |
| Descoberta | 15 |
| Conversão | 20 |
| Visual | 15 |
| Conformidade | 10 |
| Consistência | 5 |

O score é soma dos pontos demonstrados. Dados ausentes não são tratados como aprovação. Blockers determinam status `blocked` independentemente da nota.

## Achados

Cada achado registra código, severidade, módulo, mensagem, recomendação e referência opcional. Recomendações formam `next_actions`, mantendo o relatório acionável.

## Limites

O rubric inicial avalia integridade interna, não prevê vendas nem substitui políticas atuais do marketplace. Alterar pesos ou interpretação exige nova versão do rubric e testes de regressão.