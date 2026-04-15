
   const player1 = {
  NOME: "Pernalonga 🐇",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 5,
  PODER: 2,
  PONTOS: 0,
};

const player2 = {
  NOME: "Pica-Pau 🪶",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 3,
  PODER: 5,
  PONTOS: 0,
};

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }

  return result;
}

async function logRollResult(characterName, tipo, diceResult, attribute) {
  console.log(
    `${characterName} 🎯 tirou ${diceResult} + ${tipo} (${attribute}) = ${
      diceResult + attribute
    } ⚡`
  );
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`\n🏎️ Etapa ${round} - vambora!`);

    let block = await getRandomBlock();
    console.log(`📍 Tipo de pista: ${block}`);

    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      console.log("🛣️ Pista livre! Pisa fundo!");

      totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
      totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

      await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
      await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);
    }

    if (block === "CURVA") {
      console.log("🔄 Curvinha tensa! Segura o volante!");

      totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
      totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

      await logRollResult(character1.NOME, "manobra", diceResult1, character1.MANOBRABILIDADE);
      await logRollResult(character2.NOME, "manobra", diceResult2, character2.MANOBRABILIDADE);
    }

    if (block === "CONFRONTO") {
      console.log(`💣 Batalha rolando! ${character1.NOME} x ${character2.NOME}`);

      let powerResult1 = diceResult1 + character1.PODER;
      let powerResult2 = diceResult2 + character2.PODER;

      await logRollResult(character1.NOME, "força", diceResult1, character1.PODER);
      await logRollResult(character2.NOME, "força", diceResult2, character2.PODER);

      if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
        console.log(`💥 ${character1.NOME} atropelou! ${character2.NOME} perdeu 1 ponto!`);
        character2.PONTOS--;
      } else if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
        console.log(`💥 ${character2.NOME} dominou! ${character1.NOME} perdeu 1 ponto!`);
        character1.PONTOS--;
      } else {
        console.log("⚖️ Tudo igual! Sem prejuízo.");
      }
    }

    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`🚀 ${character1.NOME} voou baixo e marcou ponto!`);
      character1.PONTOS++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`🚀 ${character2.NOME} acelerou bonito e marcou ponto!`);
      character2.PONTOS++;
    } else {
      console.log("🤷 Empate total nessa rodada.");
    }

    console.log("📈 Placar agora:");
    console.log(`${character1.NOME}: ${character1.PONTOS}`);
    console.log(`${character2.NOME}: ${character2.PONTOS}`);
    console.log("═══════════════════════");
  }
}

async function declareWinner(character1, character2) {
  console.log("\n🏁 Fim de jogo! Resultado final:");

  console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
  console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

  if (character1.PONTOS > character2.PONTOS)
    console.log(`\n🥇 ${character1.NOME} ganhou bonito! Mandou muito!`);
  else if (character2.PONTOS > character1.PONTOS)
    console.log(`\n🥇 ${character2.NOME} levou essa fácil! Só talento!`);
  else console.log("\n🎲 Empate! Disputa equilibrada demais!");
}

(async function main() {
  console.log(
    `🏁🔥 Começou a corrida entre ${player1.NOME} e ${player2.NOME}! Segura essa emoção!\n`
  );

  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();