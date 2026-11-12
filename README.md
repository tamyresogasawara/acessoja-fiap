# AcessoJá

Aplicativo CitizenTech para planejamento de rotas urbanas acessíveis e relato comunitário de barreiras.

> **Status acadêmico:** aplicação funcional e validada localmente. Repositório público: https://github.com/tamyresogasawara/acessoja-fiap. Antes da entrega, preencher RM e adicionar o link do vídeo-pitch.

## Problema

Pessoas com deficiência, mobilidade reduzida, idosos e cuidadores frequentemente descobrem escadas, calçadas bloqueadas, ausência de rampas e entradas inacessíveis somente quando já estão no caminho. Essa incerteza aumenta o tempo de deslocamento, gera risco e pode impedir o acesso a serviços essenciais.

## Solução

O AcessoJá oferece uma jornada curta e utilizável na rua:

1. O cidadão informa o perfil de mobilidade.
2. O app seleciona uma rota com menos barreiras e maior pontuação de acessibilidade.
3. A pessoa recebe instruções textuais por trecho, disponíveis offline.
4. Qualquer cidadão pode relatar uma barreira para alertar a comunidade.

Os dados desta versão acadêmica são simulados, conforme permitido pelo briefing.

## Cidadão beneficiado

Pessoas com deficiência motora, mobilidade reduzida ou baixa visão; idosos; cuidadores; e qualquer cidadão que precise antecipar obstáculos urbanos.

## Recursos

- Navegação funcional com Expo Router.
- Três perfis: cadeira de rodas, mobilidade reduzida e baixa visão.
- Pontuação de acessibilidade acompanhada de explicação textual.
- Rota detalhada com superfície, travessia e entrada acessível.
- Relato de barreira com seleção, descrição e confirmação.
- Estados simulados de uso offline e bateria limitada.
- Motion design funcional em entrada de resultado, confirmação e microinterações.
- Respeito à preferência de redução de movimento do sistema.
- Áreas de toque mínimas de 56 px, contraste alto, rótulos e estados para leitores de tela.
- Informações nunca dependem apenas de cor.

## Stack

- React Native 0.88
- Expo SDK 58
- Expo Router
- TypeScript
- Jest + React Native Testing Library

## Como executar

### Requisitos

- Node.js 20 ou superior
- npm
- Aplicativo Expo Go no celular, ou navegador moderno

```bash
npm install
npm start
```

No terminal do Expo, escaneie o QR code com o Expo Go.

Para abrir no navegador:

```bash
npm run web
```

## Validação

```bash
npm test
npm run typecheck
npx expo-doctor
npm run export:web
```

Resultado verificado no ambiente de desenvolvimento:

- 4 suítes e 5 testes automatizados aprovados.
- TypeScript sem erros.
- Expo Doctor: 20/20 verificações aprovadas.
- Exportação web estática concluída com as rotas `/`, `/plan`, `/route` e `/report`.

## Estrutura

```text
src/
  app/          # rotas e navegação
  components/   # telas e componentes acessíveis
  lib/          # seleção de rota e testes de domínio
  theme.ts      # cores e espaçamentos
```

## Motion design

- **Entrada do resultado:** transição de opacidade e deslocamento orienta a mudança de estado.
- **Confirmação de relato:** escala e opacidade fornecem retorno imediato.
- **Botões:** redução de escala comunica o toque.
- **Redução de movimento:** animações são removidas quando o sistema solicita movimento reduzido.

## Acessibilidade

- Contraste forte entre verde-escuro, creme, branco e laranja.
- Botões grandes, espaçados e com `accessibilityRole`/`accessibilityLabel`.
- Seleções usam cor, texto “Selected” e símbolo de confirmação.
- Status dinâmicos usam regiões ao vivo.
- Conteúdo suporta rolagem e aumento de texto.
- Linguagem curta, direta e orientada à ação.

## ODS

O projeto se relaciona principalmente ao **ODS 11 — Cidades e Comunidades Sustentáveis**, em especial à mobilidade e ao acesso universal a espaços e serviços públicos. Também contribui para o **ODS 10 — Redução das Desigualdades**, ao reduzir barreiras de participação urbana.

## Integrante

- Tamyres Ogasawara Macedo — RM: **PREENCHER ANTES DA ENTREGA**

## Links da entrega

- GitHub público: https://github.com/tamyresogasawara/acessoja-fiap
- Vídeo-pitch: **PREENCHER APÓS PUBLICAÇÃO**
