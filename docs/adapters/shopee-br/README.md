# Shopee Brasil Adapter

Traduz o pacote canônico aprovado para uma estrutura de listing da Shopee Brasil. O adapter não decide estratégia nem corrige conteúdo: mapeia campos, aplica limites do perfil e registra truncagens.

## Política versionada

Regras de marketplace mudam fora deste repositório. Por isso o adapter exige um perfil com `version`, canal, país e limites. O arquivo `shopee-br.example.json` serve apenas aos testes e declara explicitamente que seus números precisam de verificação antes da produção.

## Proteções

- recusa canal ou país incompatível;
- recusa análise bloqueada;
- preserva SKUs e atributos das variantes;
- não altera preço nem inventa estoque;
- limita imagens e texto conforme o perfil recebido;
- transforma truncagens em `needs_review`.

Antes de produção, o responsável deve criar um perfil datado a partir das regras oficiais vigentes e validá-lo operacionalmente.