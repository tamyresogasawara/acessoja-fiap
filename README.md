# AcessoJá

Aplicativo CitizenTech para planejar rotas urbanas acessíveis e relatar barreiras à comunidade.

**Global Solution FIAP · CitizenTech**

## Integrante

- Tamyres Ogasawara Macedo — RM 552055

## Links da entrega

- Repositório (público): https://github.com/tamyresogasawara/acessoja-fiap
- Vídeo-pitch: _a publicar_
- Documento PDF: [`docs/deliverables/TamyresOgasawaraMacedo-AcessoJa.pdf`](docs/deliverables/TamyresOgasawaraMacedo-AcessoJa.pdf)

## Problema

Pessoas com deficiência, mobilidade reduzida, idosos e cuidadores muitas vezes descobrem escadas, calçadas bloqueadas, falta de rampas e entradas inacessíveis só quando já estão no caminho. Essa incerteza aumenta o tempo de deslocamento, gera risco e pode impedir o acesso a serviços essenciais, como uma consulta na unidade de saúde.

## Cidadão beneficiado

Pessoas que usam cadeira de rodas, pessoas com mobilidade reduzida ou baixa visão, idosos e cuidadores que planejam o deslocamento de outra pessoa.

## Solução

O AcessoJá oferece uma jornada curta, pensada para uso na rua, com pressa, bateria limitada e sinal instável:

1. O cidadão escolhe o perfil de mobilidade (cadeira de rodas, mobilidade reduzida ou baixa visão).
2. O motor de rotas compara as rotas candidatas e recomenda a que tem **menos barreiras**, depois **maior pontuação de acessibilidade** e só então **menor tempo**.
3. O app explica a escolha (“A rota mais curta leva 11 min, mas tem 2 barreiras… Esta leva +4 min e tem 0 barreiras.”) e mostra instruções por trecho adaptadas ao perfil.
4. A rota pode ser salva para uso sem internet.
5. Qualquer pessoa pode relatar uma barreira em dois campos para alertar a comunidade.

Os dados são simulados (Santos/SP), conforme permitido pelo briefing.

## Recursos

- Navegação com Expo Router: Início → Planejar rota → Sua rota; Início → Relatar barreira.
- Três perfis de mobilidade, cada um com rotas e instruções próprias (`src/lib/route-data.ts`).
- Motor de seleção de rota testado (`src/lib/route-engine.ts`).
- Card “Por que esta rota?” que torna a recomendação transparente.
- Relato de barreira com envio desabilitado até o formulário estar completo.
- Interface toda em português, com linguagem curta e direta.

## Motion design

| Onde | Animação | Função na jornada |
| --- | --- | --- |
| Troca de telas | Deslize lateral | Indica avanço/retorno na jornada |
| Resultado da rota | Opacidade + deslocamento de 16 px | Marca a mudança de estado e leva o olhar à recomendação |
| Pontuação | Barra se preenche até 94/100 | Reforça visualmente o número da pontuação |
| Seleção de perfil/categoria | Selo “Selecionado ✓” surge com mola | Confirma o toque |
| Botões | Escala 0,97 ao pressionar | Retorno imediato de toque |
| Relato enviado | Escala + opacidade no ✓ | Confirma que a ação foi concluída |

Com **Reduzir movimento** ativado no sistema, todas as animações (inclusive a troca de telas) viram mudanças instantâneas (`src/lib/use-reduce-motion.ts`).

## Acessibilidade

- Contraste WCAG AA: textos ≥ 4,5:1 (laranja de texto `#A84A1C` = 5,3:1 sobre creme); bordas de controles ≥ 3:1.
- Botões com altura mínima de 56 px e cards de seleção com 76–150 px de altura.
- `accessibilityRole`, `accessibilityLabel`, `accessibilityHint` e `accessibilityState` (selecionado, desabilitado) em controles.
- Seleção indicada por cor **+** borda mais grossa **+** texto “Selecionado ✓”.
- Anúncios para leitor de tela ao iniciar navegação, salvar rota e enviar relato.
- Ícones decorativos ocultos de leitores de tela (iOS e Android).
- Telas roláveis e tipografia que respeita o aumento de fonte do sistema.

## ODS

- **ODS 11 — Cidades e Comunidades Sustentáveis** (metas 11.2 e 11.7: transporte e espaços públicos acessíveis).
- **ODS 10 — Redução das Desigualdades** (meta 10.2: inclusão social de todas as pessoas, incluindo pessoas com deficiência).

## Stack

React Native 0.88 · Expo SDK 58 · Expo Router · TypeScript · Jest + React Native Testing Library

## Como executar

Requisitos: Node.js 20+, npm e o app **Expo Go** no celular (ou um navegador).

```bash
git clone https://github.com/tamyresogasawara/acessoja-fiap.git
cd acessoja-fiap
npm install
npm start        # escaneie o QR code com o Expo Go
npm run web      # ou abra no navegador
```

## Validação

```bash
npm test             # 5 suítes, 10 testes
npm run typecheck    # TypeScript sem erros
npm run export:web   # exporta as rotas /, /plan, /route e /report
```

## Estrutura

```text
src/
  app/          # rotas (Expo Router) e layout de navegação
  components/   # telas e componentes acessíveis
  lib/          # motor de rotas, dados simulados e hook de movimento reduzido
  theme.ts      # cores (com contraste documentado) e espaçamentos
docs/
  deliverables/ # PDF da entrega
  pitch-script.md
```
