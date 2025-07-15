const readline = require('readline-sync');

const perguntas = [
  {
    pergunta: "Em Qual Cidade acontece o Festival Mundial da Cachaça?",
    alternativas: ["A) Belo Horizonte", "B) Brasília", "C) Salinas"],
    correta: "C"
  },
  {
    pergunta: "Quem é o fundador da cachaça Seleta?",
    alternativas: ["A) Antônio Rodrigues", "B) Mario Anisio", "C) Anísio Santiago "],
    correta: "A"
  },
  {
    pergunta: "Quem é o fundador da cachaça Havana?",
    alternativas: ["A) Antônio Rodrigues", "B) Mario Ansio", "C) Anísio Santiago "],
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
    pergunta: "Quem pintou a Mona Lisa?",
    alternativas: ["A) Van Gogh", "B) Leonardo da Vinci", "C) Picasso"],
    correta: "B"
  },
  {
    pergunta: "Qual o símbolo químico da água?",
    alternativas: ["A) O2", "B) H2O", "C) CO2"],
    correta: "B"
  },
  {
    pergunta: "Quem escreveu Dom Casmurro?",
    alternativas: ["A) Machado de Assis", "B) José de Alencar", "C) Clarice Lispector"],
    correta: "A"
  },
  {
    pergunta: "Qual é a fórmula da velocidade média?",
    alternativas: ["A) d/t", "B) t/d", "C) d*t"],
    correta: "A"
  },
  {
    pergunta: "Qual a moeda do Japão?",
    alternativas: ["A) Dólar", "B) Iene", "C) Yuan"],
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
    pergunta: "Quem compôs 'Garota de Ipanema'?",
    alternativas: ["A) Tom Jobim e Vinícius", "B) Roberto Carlos", "C) Caetano Veloso"],
    correta: "A"
  }
];

const premiacoes = [1000, 5000, 10000, 50000, 100000, 500000, 1000000];

function jogar() {
  console.clear();
  console.log("BEM-VINDO AO SHOW DO MILHÃO\n");

  const nome = readline.question("Digite seu nome: ");
  let rodada = 0;
  let perguntasDisponiveis = [...perguntas];

  while (rodada < premiacoes.length && perguntasDisponiveis.length > 0) {
    console.clear();
    console.log(`Jogador: ${nome}`);
    console.log(`Rodada ${rodada + 1} - Prêmio: R$ ${premiacoes[rodada]}`);

    const perguntaIndex = Math.floor(Math.random() * perguntasDisponiveis.length);
    const perguntaAtual = perguntasDisponiveis[perguntaIndex];

    console.log(`\n${perguntaAtual.pergunta}`);
    perguntaAtual.alternativas.forEach(alternativa => console.log(alternativa));

    const resposta = readline.question("\nDigite sua resposta (A, B, C) ou 'P' para parar: ").toUpperCase();

    if (resposta === 'P') {
      const premioParar = rodada === 0 ? 0 : premiacoes[rodada - 1];
      console.log(`\nVocê decidiu parar. Saiu com R$ ${premioParar}`);
      break;
    }

    if (resposta === perguntaAtual.correta) {
      console.log("\nResposta correta.");
      rodada++;
      perguntasDisponiveis.splice(perguntaIndex, 1);

      if (rodada === premiacoes.length) {
        console.log(`\nParabéns, ${nome}. Você ganhou R$ ${premiacoes[rodada - 1]}.`);
      } else {
        readline.question("\nPressione Enter para continuar para a próxima rodada...");
      }
    } else {
      console.log("\nResposta incorreta.");
      console.log(`A resposta correta era: ${perguntaAtual.correta}`);
      console.log(`\nFim de jogo, ${nome}. Você saiu com R$ 0.`);
      break;
    }
  }

  const jogarDeNovo = readline.question("\nDeseja jogar novamente? (S/N): ").toUpperCase();
  if (jogarDeNovo === 'S') {
    jogar();
  } else {
    console.log("\nObrigado por jogar.");
  }
}

jogar();
