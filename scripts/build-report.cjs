const fs = require('fs');
const path = require('path');
const {
  AlignmentType,
  BorderStyle,
  Document,
  Footer,
  HeadingLevel,
  PageBreak,
  PageNumber,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} = require('docx');

const OUT = path.join(__dirname, '..', 'docs', 'deliverables');
fs.mkdirSync(OUT, { recursive: true });

const C = {
  ink: '10231C',
  forest: '0B5D3B',
  green: '127A50',
  mint: 'DDF5E9',
  cream: 'F7F7F1',
  orange: 'E66A2C',
  orangeSoft: 'FFF0E6',
  gray: '52645D',
  line: 'CBD8D2',
  white: 'FFFFFF',
};

const noBorders = {
  top: { style: BorderStyle.NONE, size: 0, color: C.white },
  bottom: { style: BorderStyle.NONE, size: 0, color: C.white },
  left: { style: BorderStyle.NONE, size: 0, color: C.white },
  right: { style: BorderStyle.NONE, size: 0, color: C.white },
  insideHorizontal: { style: BorderStyle.NONE, size: 0, color: C.white },
  insideVertical: { style: BorderStyle.NONE, size: 0, color: C.white },
};

function run(text, options = {}) {
  return new TextRun({ text, font: 'Aptos', color: C.ink, size: 22, ...options });
}

function p(text, options = {}) {
  return new Paragraph({
    spacing: { after: 150, line: 300 },
    children: [run(text, options.run || {})],
    ...options,
  });
}

function label(text) {
  return new Paragraph({
    spacing: { before: 100, after: 100 },
    children: [run(text.toUpperCase(), { color: C.orange, bold: true, size: 18, characterSpacing: 140 })],
  });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 120, after: 220 },
    children: [run(text, { bold: true, size: 38, color: C.ink })],
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 220, after: 120 },
    children: [run(text, { bold: true, size: 27, color: C.forest })],
  });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: 'bullets', level: 0 },
    spacing: { after: 90, line: 290 },
    children: [run(text)],
  });
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

function callout(title, body, color = C.mint) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    borders: noBorders,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 9360, type: WidthType.DXA },
            shading: { fill: color, type: ShadingType.CLEAR },
            margins: { top: 180, bottom: 180, left: 220, right: 220 },
            children: [
              new Paragraph({ spacing: { after: 80 }, children: [run(title, { bold: true, color: C.forest, size: 23 })] }),
              p(body, { spacing: { after: 0, line: 285 } }),
            ],
          }),
        ],
      }),
    ],
  });
}

function twoColumn(rows) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [2700, 6660],
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: C.line },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: C.line },
      left: { style: BorderStyle.SINGLE, size: 4, color: C.line },
      right: { style: BorderStyle.SINGLE, size: 4, color: C.line },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: C.line },
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: C.line },
    },
    rows: rows.map(([left, right], i) => new TableRow({
      children: [
        new TableCell({
          width: { size: 2700, type: WidthType.DXA },
          shading: { fill: i === 0 ? C.forest : C.mint, type: ShadingType.CLEAR },
          margins: { top: 130, bottom: 130, left: 150, right: 150 },
          children: [p(left, { spacing: { after: 0 }, run: { bold: true, color: i === 0 ? C.white : C.forest } })],
        }),
        new TableCell({
          width: { size: 6660, type: WidthType.DXA },
          shading: { fill: i === 0 ? C.forest : C.white, type: ShadingType.CLEAR },
          margins: { top: 130, bottom: 130, left: 150, right: 150 },
          children: [p(right, { spacing: { after: 0 }, run: { color: i === 0 ? C.white : C.ink } })],
        }),
      ],
    })),
  });
}

const children = [
  new Paragraph({ spacing: { before: 600, after: 180 }, children: [run('GLOBAL SOLUTION · CITIZENTECH', { color: C.orange, bold: true, size: 20, characterSpacing: 180 })] }),
  new Paragraph({ spacing: { after: 120 }, children: [run('AcessoJá', { color: C.ink, bold: true, size: 68 })] }),
  new Paragraph({ spacing: { after: 500 }, children: [run('Rotas urbanas acessíveis e relatos comunitários de barreiras', { color: C.gray, size: 30 })] }),
  callout('DOCUMENTO PARA REVISÃO', 'Preencher o RM e substituir os campos de link após a publicação do GitHub e do vídeo-pitch. Esta versão não deve ser enviada sem essa conferência.', C.orangeSoft),
  new Paragraph({ spacing: { before: 700, after: 100 }, children: [run('Integrante', { bold: true, color: C.forest, size: 21 })] }),
  p('Tamyres Ogasawara Macedo'),
  p('RM: PREENCHER ANTES DA ENTREGA', { run: { bold: true, color: C.orange } }),
  new Paragraph({ spacing: { before: 280, after: 100 }, children: [run('Links obrigatórios', { bold: true, color: C.forest, size: 21 })] }),
  p('GitHub: https://github.com/tamyresogasawara/acessoja-fiap'),
  p('Vídeo-pitch: PREENCHER APÓS PUBLICAÇÃO'),
  new Paragraph({ spacing: { before: 800 }, alignment: AlignmentType.RIGHT, children: [run('FIAP · 2026', { color: C.gray, bold: true, size: 18 })] }),

  pageBreak(),
  label('01 · Contexto'),
  h1('Problema e cidadão beneficiado'),
  h2('O problema real'),
  p('Pessoas com deficiência, mobilidade reduzida, idosos e cuidadores frequentemente descobrem barreiras urbanas somente quando já estão em deslocamento. Uma calçada bloqueada, um meio-fio sem rebaixamento ou uma entrada com escadas pode transformar uma rota curta em atraso, risco ou desistência do acesso a um serviço essencial.'),
  p('O problema ocorre no cotidiano de grandes cidades e se agrava em situações de pressa, bateria limitada e conexão instável. Aplicativos convencionais priorizam distância e tempo, mas nem sempre explicam se o trajeto é realmente utilizável por diferentes perfis de mobilidade.'),
  h2('Cidadão beneficiado'),
  bullet('Pessoa que usa cadeira de rodas e precisa evitar escadas, degraus e superfícies irregulares.'),
  bullet('Pessoa idosa ou com mobilidade reduzida que precisa de trajetos mais estáveis e com menos esforço.'),
  bullet('Pessoa com baixa visão que depende de travessias seguras, orientação clara e informação compatível com leitor de tela.'),
  bullet('Cuidador ou familiar que planeja o deslocamento de outra pessoa.'),
  callout('Justificativa da escolha', 'Mobilidade é uma condição para exercer outros direitos: chegar a uma consulta, estudar, trabalhar e participar da cidade. Antecipar barreiras reduz incerteza e devolve autonomia ao cidadão.'),
  h2('Validação ética da proposta'),
  p('Esta entrega é um protótipo acadêmico funcional com dados simulados. Ela não afirma representar uma base municipal em tempo real. Uma etapa futura de campo deve incluir entrevistas com pessoas com deficiência e testes acompanhados de acessibilidade antes de qualquer uso público.'),

  pageBreak(),
  label('02 · Jornada'),
  h1('Jornada do usuário'),
  twoColumn([
    ['Etapa', 'Experiência do cidadão'],
    ['1. Necessidade', 'Antes de sair, o cidadão precisa chegar à Unidade de Saúde Central sem encontrar degraus ou bloqueios.'],
    ['2. Contexto', 'Está com pressa, bateria limitada e pode perder o sinal durante o caminho.'],
    ['3. Perfil', 'Seleciona cadeira de rodas, mobilidade reduzida ou baixa visão.'],
    ['4. Decisão', 'O app recomenda a rota com menos barreiras e maior pontuação de acessibilidade, não apenas a mais curta.'],
    ['5. Orientação', 'Recebe instruções por trecho: superfície, travessia e entrada acessível.'],
    ['6. Continuidade', 'Salva a rota para uso offline e inicia a navegação simulada.'],
    ['7. Colaboração', 'Se encontrar um obstáculo, registra categoria e descrição para alertar a comunidade.'],
    ['8. Desfecho', 'Chega ao destino com menos incerteza e recebe confirmação clara de suas ações.'],
  ]),
  h2('Pontos de dor tratados'),
  bullet('Descobrir uma barreira tarde demais → antecipação com score e instruções textuais.'),
  bullet('Conexão instável → mensagens de funcionamento offline e ação de salvar rota.'),
  bullet('Excesso de etapas → duas ações principais na tela inicial.'),
  bullet('Informação visual ambígua → texto, símbolos, estados e cor usados em conjunto.'),
  h2('Critério de sucesso'),
  p('O cidadão deve conseguir iniciar uma rota acessível ou relatar uma barreira em poucos passos, entender por que a rota é recomendada e continuar orientado mesmo em condições de baixa conectividade.'),

  pageBreak(),
  label('03 · Solução'),
  h1('AcessoJá'),
  p('O AcessoJá é um aplicativo CitizenTech em React Native com Expo. A solução combina planejamento de rota orientado por acessibilidade e colaboração comunitária. Os dados são simulados, porém o fluxo é navegável e coerente com o problema.'),
  h2('Funcionalidades implementadas'),
  bullet('Tela inicial com acesso direto a “planejar rota” e “relatar barreira”.'),
  bullet('Seleção de perfil de mobilidade com estado acessível de seleção.'),
  bullet('Origem e destino simulados em Santos, com distância visível.'),
  bullet('Score 94/100, ausência de barreiras, momento da verificação e métricas do percurso.'),
  bullet('Orientações por trecho para calçada, travessia e entrada acessível.'),
  bullet('Ações simuladas para iniciar navegação e salvar rota offline.'),
  bullet('Formulário de relato com categoria, descrição, contador e confirmação.'),
  h2('Lógica de rota'),
  p('O motor de seleção prioriza primeiro a quantidade de barreiras, depois a pontuação de acessibilidade e, por último, o tempo. Assim, uma rota ligeiramente mais longa pode ser recomendada quando oferece segurança e autonomia superiores.'),
  callout('Caráter disruptivo', 'A proposta muda o critério principal da navegação: deixa de otimizar apenas minutos e passa a otimizar a possibilidade real de concluir o deslocamento. A comunidade também transforma barreiras observadas em informação útil para outros cidadãos.'),
  h2('Tecnologia'),
  p('React Native 0.88, Expo SDK 58, Expo Router, TypeScript, Jest e React Native Testing Library. A arquitetura separa rotas, componentes, tema visual e lógica de domínio.'),

  pageBreak(),
  label('04 · Design e experiência'),
  h1('Decisões de UX, visual e motion'),
  h2('Design visual'),
  bullet('Verde-escuro comunica segurança e cidade; laranja destaca ação e atenção; creme reduz brilho excessivo.'),
  bullet('Hierarquia forte: títulos grandes, uma ação primária por etapa e cards com agrupamento semântico.'),
  bullet('Conteúdo limitado a uma largura confortável também na versão web, preservando o foco mobile.'),
  h2('UX orientada ao contexto'),
  bullet('Fluxo curto para uso na rua e com pressa.'),
  bullet('Linguagem direta, como “Find safest route” e “What is blocking the way?”.'),
  bullet('Mensagens explícitas sobre uso offline e baixa bateria.'),
  bullet('Explicação da recomendação para aumentar confiança e transparência.'),
  h2('Motion design funcional'),
  twoColumn([
    ['Aplicação', 'Função na jornada'],
    ['Resultado da rota', 'Opacidade e deslocamento indicam mudança de estado e direcionam o olhar para a recomendação.'],
    ['Confirmação do relato', 'Escala e opacidade confirmam que a ação foi concluída.'],
    ['Pressão de botão', 'Pequena redução de escala fornece retorno tátil visual imediato.'],
    ['Movimento reduzido', 'A preferência do sistema remove animações que poderiam causar desconforto.'],
  ]),
  h2('Acessibilidade aplicada'),
  bullet('Contraste forte entre texto e fundo.'),
  bullet('Botões com altura mínima de 56 px e cards bem espaçados.'),
  bullet('Rótulos, funções e estados para tecnologias assistivas.'),
  bullet('Seleção identificada por cor, texto “Selected” e símbolo de confirmação.'),
  bullet('Status dinâmicos anunciados por regiões ao vivo.'),
  bullet('Telas roláveis e tipografia compatível com aumento de tamanho.'),

  pageBreak(),
  label('05 · Impacto e entrega'),
  h1('ODS, validação e links'),
  h2('ODS 11 — Cidades e Comunidades Sustentáveis'),
  p('O projeto se relaciona diretamente ao ODS 11, especialmente ao objetivo de tornar cidades inclusivas e ao acesso universal a sistemas de transporte e espaços públicos seguros e acessíveis. O AcessoJá traduz esse princípio em uma decisão cotidiana: descobrir antes se um caminho pode ser percorrido.'),
  h2('ODS 10 — Redução das Desigualdades'),
  p('A autonomia de deslocamento reduz desigualdades de participação social. Ao apresentar rotas segundo diferentes perfis e não segundo um “usuário médio”, o aplicativo reconhece necessidades diversas na interface e na lógica de recomendação.'),
  h2('Validação técnica executada'),
  bullet('4 suítes e 5 testes automatizados aprovados.'),
  bullet('TypeScript sem erros.'),
  bullet('Expo Doctor: 20 de 20 verificações aprovadas.'),
  bullet('Exportação web estática concluída para quatro rotas funcionais.'),
  bullet('Inspeção visual no navegador e console sem erros JavaScript.'),
  h2('Links obrigatórios'),
  callout('GitHub público', 'https://github.com/tamyresogasawara/acessoja-fiap', C.mint),
  new Paragraph({ spacing: { after: 130 } }),
  callout('Vídeo-pitch', 'PREENCHER APÓS PUBLICAÇÃO', C.orangeSoft),
  h2('Referências'),
  p('Nações Unidas Brasil. Objetivo de Desenvolvimento Sustentável 11: Cidades e Comunidades Sustentáveis. https://brasil.un.org/pt-br/sdgs/11'),
  p('Nações Unidas Brasil. Objetivo de Desenvolvimento Sustentável 10: Redução das Desigualdades. https://brasil.un.org/pt-br/sdgs/10'),
  p('Brasil. Lei nº 13.146/2015 — Lei Brasileira de Inclusão da Pessoa com Deficiência.'),
  h2('Checklist antes do envio'),
  bullet('Inserir RM e conferir a grafia dos integrantes em ordem alfabética.'),
  bullet('Publicar o repositório como público e substituir o link no README e neste documento.'),
  bullet('Gravar o pitch de 2 a 3 minutos, publicar e substituir o link.'),
  bullet('Regenerar o PDF sem o rótulo de revisão e conferir todos os links.'),
];

const doc = new Document({
  creator: 'Atlas for Tamyres Ogasawara Macedo',
  title: 'AcessoJá — Global Solution CitizenTech',
  description: 'Documento acadêmico de revisão para a Global Solution FIAP.',
  numbering: {
    config: [
      {
        reference: 'bullets',
        levels: [
          {
            level: 0,
            format: 'bullet',
            text: '•',
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 420, hanging: 220 } } },
          },
        ],
      },
    ],
  },
  styles: {
    default: { document: { run: { font: 'Aptos', size: 22, color: C.ink } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: 'Aptos Display', bold: true, size: 38, color: C.ink }, paragraph: { outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: 'Aptos Display', bold: true, size: 27, color: C.forest }, paragraph: { outlineLevel: 1 } },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 900, right: 1100, bottom: 900, left: 1100 },
        },
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              border: { top: { style: BorderStyle.SINGLE, size: 4, color: C.line } },
              spacing: { before: 100 },
              children: [run('AcessoJá · Global Solution FIAP  |  ', { color: C.gray, size: 17 }), new TextRun({ children: [PageNumber.CURRENT], font: 'Aptos', color: C.gray, size: 17 })],
            }),
          ],
        }),
      },
      children,
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  const file = path.join(OUT, 'TamyresOgasawaraMacedo-AcessoJa-REVISAO.docx');
  fs.writeFileSync(file, buffer);
  console.log(file);
});
