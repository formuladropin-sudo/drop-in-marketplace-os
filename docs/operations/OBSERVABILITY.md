# Observabilidade

## Eventos mínimos

Cada execução deve registrar `run_id`, `project_id`, versão do sistema, versões dos contratos, estágio, status, duração e código de erro. Conteúdo comercial completo não deve ser logado por padrão.

## Métricas

- execuções por status;
- latência por estágio;
- taxa de falha por código;
- score e status de análise;
- frequência de truncagens e revisão;
- versão do perfil de marketplace;
- custo por provedor quando integrações forem adicionadas.

## Alertas sugeridos

- qualquer blocker após uma release;
- aumento sustentado de falhas por estágio;
- perfil de política ausente ou expirado;
- queda de score sem alteração de entrada;
- divergência de versão entre artefatos.

Telemetria deve ser explícita, minimizada e configurável. Esta versão define o contrato operacional, mas não envia métricas a serviços externos.