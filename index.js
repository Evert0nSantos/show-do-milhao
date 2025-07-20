const readline = require('readline-sync');
const fs = require('fs');

const perguntas = [
  {
    pergunta: "Quem é o melhor professor do IF?",
    alternativas: ["A) Stanley Marcos", "B) Mario Anisio", "C) Arthur Porto"],
    correta: "C"
  },
  {
    pergunta: "Quem é o fundador da cachaça Seleta?",
    alternativas: ["A) Antônio Rodrigues", "B) Mario Anisio", "C) Anísio Santiago "],
    correta: "A"
  },
  {
    pergunta: "Quem é o fundador da cachaça Havana?",
    alternativas: ["A) Antônio Rodrigues", "B) Mario Anisio", "C) Anísio Santiago "],
    correta: "C"
  },
  {
    pergunta: "A Cidade de Salinas é conhecinda como a capital Mundial da?",
    alternativas: ["A) Cachaça", "B) Sal", "C) Café"],
    correta: "A"
  },
  {
    pergunta: "Quem é o atual prefeito de Salinas?",
    alternativas: ["A) Dairton Neres", "B) Eilton Santiago", "C) Kinca Dias"],
    correta: "C"
  },
  {
    pergunta: "Em Qual Cidade acontece o Festival Mundial da Cachaça?",
    alternativas: ["A) Belo Horizonte", "B) Brasília", "C) Salinas"],
    correta: "C"
  },
  {
    pergunta: "Em qual parte do continente americano o Brasil está localizado?",
    alternativas: ["A) América do Norte", "B) América do Sul", "C) América Central"],
    correta: "B"
  },
  {
    pergunta: "Qual é o menor planeta do Sistema Solar?",
    alternativas: ["A) Mercúrio", "B) Plutão", "C) Terra"],
    correta: "A"
  },
  {
    pergunta: "Qual a capital do Brasil?",
    alternativas: ["A) Brasilia", "B) Salvador", "C) Rio De Janeiro"],
    correta: "A"
  },
  {
    pergunta: "Quem é o maior Artilheiro da Seleção Brasileira?",
    alternativas: ["A) Pelé", "B) Neymar Jr", "C) Ronaldo Fenômeno"],
    correta: "B"
  },
  {
    pergunta: "Qual o animal símbolo da Austrália?",
    alternativas: ["A) Canguru", "B) Urso", "C) Leão"],
    correta: "A"
  },
  {
    pergunta: "Quem foi o primeiro homem na Lua?",
    alternativas: ["A) Neil Armstrong", "B) Buzz Aldrin", "C) Yuri Gagarin"],
    correta: "A"
  },
  {
    pergunta: "Qual a capital da Argentina?",
    alternativas: ["A) Lima", "B) Buenos Aires", "C) Santiago"],
    correta: "B"
  },
  {
    pergunta: "Qual o metal do ouro?",
    alternativas: ["A) Au", "B) Ag", "C) Fe"],
    correta: "A"
  },
  {
    pergunta: "Quem foi o primeiro presidente do Brasil?",
    alternativas: ["A) Getúlio Vargas", "B) Marechal Deodoro da Fonseca", "C) Juscelino Kubitschek"],
    correta: "B"
  }
];

const premiacoes = [1000, 5000, 10000, 50000, 100000, 500000, 1000000];
const arquivoRanking = 'ranking.json';

function salvarRanking(nome, premio) {
  let ranking = [];
  if (fs.existsSync(arquivoRanking)) {
    const dados = fs.readFileSync(arquivoRanking);
    ranking = JSON.parse(dados);
  }

  ranking.push({ nome, premio });
  ranking.sort((a, b) => b.premio - a.premio);
  fs.writeFileSync(arquivoRanking, JSON.stringify(ranking, null, 2));
}

function mostrarRanking() {
  if (fs.existsSync(arquivoRanking)) {
    const dados = fs.readFileSync(arquivoRanking);
    const ranking = JSON.parse(dados);

    console.log("\n Ranking dos Melhores Jogadores:");
    ranking.slice(0, 5).forEach((jogador, i) => {
      console.log(`${i + 1}. ${jogador.nome} - R$ ${jogador.premio}`);
    });
  }
}

function jogar() {
  console.clear();
  console.log(" BEM-VINDO AO SHOW DO MILHÃO \n");

  const nome = readline.question("Digite seu nome: ");
  let rodada = 0;
  let perguntasDisponiveis = [...perguntas];
  let ultimaPergunta = null;

  while (rodada < premiacoes.length && perguntasDisponiveis.length > 0) {
    console.clear();
    console.log(`Jogador: ${nome}`);
    console.log(`Rodada ${rodada + 1} - Prêmio: R$ ${premiacoes[rodada]}`);

    const perguntaIndex = Math.floor(Math.random() * perguntasDisponiveis.length);
    const perguntaAtual = perguntasDisponiveis[perguntaIndex];
    ultimaPergunta = perguntaAtual;

    console.log(`\n${perguntaAtual.pergunta}`);
    perguntaAtual.alternativas.forEach(alt => console.log(alt));

    let resposta;
    while (true) {
      resposta = readline.question("\nDigite sua resposta (A, B, C), 'H' para ajuda ou 'P' para parar: ").toUpperCase();

      if (!["A", "B", "C", "H", "P"].includes(resposta)) {
        console.log("Resposta inválida! Tente novamente.");
        continue;
      }

      if (resposta === 'H') {
        const alternativasErradas = perguntaAtual.alternativas.filter(alt => !alt.startsWith(perguntaAtual.correta));
        const alternativaRemovida = alternativasErradas[Math.floor(Math.random() * alternativasErradas.length)];
        console.log(`\n AJUDA: Eliminamos uma alternativa incorreta: ${alternativaRemovida}`);
        continue;
      }

      break;
    }

    if (resposta === 'P') {
      const premioParar = rodada === 0 ? 0 : premiacoes[rodada - 1];
      console.log(`\n Você decidiu parar.`);
      console.log(`Rodada atual: ${rodada + 1}`);
      console.log(`Rodadas restantes: ${premiacoes.length - rodada}`);
      console.log(`Resposta correta da última pergunta: ${ultimaPergunta.correta}`);
      console.log(`Você saiu com R$ ${premioParar}`);

      salvarRanking(nome, premioParar);
      mostrarRanking();
      break;
    }

    if (resposta === perguntaAtual.correta) {
      console.log("\n✅ Resposta correta!");
      rodada++;
      perguntasDisponiveis.splice(perguntaIndex, 1);

      if (rodada === premiacoes.length) {
        console.log(`\n Parabéns, ${nome}! Você acertou todas as perguntas.`);
        console.log(`Resposta correta da última pergunta: ${perguntaAtual.correta}`);
        console.log(` Premiação final: R$ ${premiacoes[rodada - 1]}`);

        salvarRanking(nome, premiacoes[rodada - 1]);
        mostrarRanking();
        break;
      }

      readline.question("\nPressione Enter para continuar para a próxima rodada...");
    } else {
      console.log("\n❌ Resposta incorreta.");
      console.log(`A resposta correta era: ${perguntaAtual.correta}`);
      console.log(`\nFim de jogo, ${nome}. Você saiu com R$ 0.`);

      salvarRanking(nome, 0);
      mostrarRanking();
      break;
    }
  }

  const jogarDeNovo = readline.question("\nDeseja jogar novamente? (S/N): ").toUpperCase();
  if (jogarDeNovo === 'S') {
    jogar();
  } else {
    console.log("\n Obrigado por jogar!");
  }
}

jogar();
