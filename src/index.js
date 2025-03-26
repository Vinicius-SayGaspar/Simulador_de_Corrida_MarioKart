// Jogadores
const player1 ={
    Name: "Mario",
    Velocidade: 4,
    Manobrabilidade: 3,
    Poder: 3,
    Pontos: 0,
};
const player2 ={
    Name: "Donkey Kong",
    Velocidade: 2,
    Manobrabilidade: 2,
    Poder: 5,
    Pontos: 0,
};
const player3 ={
    Name: "Luigi",
    Velocidade: 3,  
    Manobrabilidade: 4,
    Poder: 4,
    Pontos: 0,
};
const player4 ={
    Name: "Peach",
    Velocidade: 3,  
    Manobrabilidade: 4,
    Poder: 2,
    Pontos: 0,
};
const player5 ={
    Name: "Yoshi",
    Velocidade: 2,  
    Manobrabilidade: 4,
    Poder: 3,
    Pontos: 0,
};
const player6 ={
    Name: "Bowser",
    Velocidade: 5,  
    Manobrabilidade: 2,
    Poder: 5,
    Pontos: 0,
};

// Armazenando os jogadores em um array
const players = [player1, player2, player3, player4, player5, player6];

// Função para escolher dois jogadores aleatórios
function choosePlayers(players) {
  // Gerando dois índices aleatórios diferentes
  const playerIndex1 = Math.floor(Math.random() * players.length);
  let playerIndex2 = Math.floor(Math.random() * players.length);

  // Garantindo que os índices sejam diferentes
  while (playerIndex1 === playerIndex2) {
    playerIndex2 = Math.floor(Math.random() * players.length);
  }

  // Selecionando os jogadores aleatórios
  const chosenPlayers = [players[playerIndex1], players[playerIndex2]];

  return chosenPlayers;
}

// Função para rolar os dados
async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
}

// Sortear bloco de corrida
async function getRandomBlock(){
    let random = Math.random();
    let result;

    switch(true){
        case random <= 0.33:
            result = "Reta";
            break;
        case random <= 0.66:
            result = "Curva";
            break;
        default:
            result = "Confronto";
            break;
    }
    return result;
}

// Função para logar o resultado do dado
async function logRollResult(characterName, block, diceResult, attribute) {
        console.log(`${characterName} 🎲 rolou um dado de ${block} e tirou ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

// Função para jogar a corrida
async function playRaceEngine(character1, character2){
    for(let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round}`);

        // Sortear bloco de corrida
        let block = await getRandomBlock();
        console.log(`Bloco sorteado: ${block}`);

        // Rolar os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // Teste de habilidade
        let totalTestSKill1 = 0;
        let totalTestSKill2 = 0;

        if(block === "Reta"){
            totalTestSKill1 = character1.Velocidade + diceResult1;
            totalTestSKill2 = character2.Velocidade + diceResult2;

            await logRollResult(
                character1.Name, 
                "Velocidade", 
                diceResult1, 
                character1.Velocidade
                );

            await logRollResult(
                character2.Name,
                "Velocidade",
                diceResult2,
                character2.Velocidade
            );
        }
        if(block === "Curva"){
            totalTestSKill1 = character1.Manobrabilidade + diceResult1;
            totalTestSKill2 = character2.Manobrabilidade + diceResult2;

            await logRollResult(
                character1.Name,
                "Curva",
                diceResult1,
                character1.Manobrabilidade
            );

            await logRollResult(
                character2.Name,
                "Curva",
                diceResult2,
                character2.Manobrabilidade
            );
        }
        if(block === "Confronto"){
            let powerResult1 = character1.Poder + diceResult1;
            let powerResult2 = character2.Poder + diceResult2;

            console.log(`${character1.Name} VS. ${character2.Name}! 🥊`);

            
            await logRollResult(
                character1.Name,
                "Poder",
                diceResult1,
                character1.Poder
            );

            await logRollResult(
                character2.Name,
                "Poder",
                diceResult2,
                character2.Poder
            );

            if (powerResult1 > powerResult2 && character2.Pontos > 0) {
                character2.Pontos --;
                console.log(`${character1.Name} ganhou!!! ${character2.Name} perdeu 1 ponto!🐢`);
            }

            if(powerResult2 > powerResult1 && character1.Pontos > 0){
                character1.Pontos --;
                console.log(`${character2.Name} ganhou!!! ${character1.Name} perdeu 1 ponto! 🐢`);
            }
            
            console.log( 
                powerResult2 === powerResult1  
                ? "Empate! Ninguém perde pontos"
                : ""
            );
        }
        // Verificar vencedor da rodada
        if (totalTestSKill1 > totalTestSKill2){
            character1.Pontos ++;
            console.log(`${character1.Name} venceu a rodada! 🏁`);
        }else if(totalTestSKill2 > totalTestSKill1){
            character2.Pontos ++;
            console.log(`${character2.Name} venceu a rodada! 🏁`);
        }else if(block !== "Confronto" && totalTestSKill1 === totalTestSKill2){
            console.log("Empate! 🏁 Ninguém pontuou");
        }
        console.log("---------------------------------------");
    }
}

async function getWinner(character1, character2){
    console.log("🏁🏆 Resultado final da corrida! 🏆🏁");
    console.log(`${character1.Name}: ${character1.Pontos} pontos`);
    console.log(`${character2.Name}: ${character2.Pontos} pontos`);
    if(character1.Pontos > character2.Pontos)
        console.log(`${character1.Name} venceu a corrida! 🏆`);
    else if(character1.Pontos < character2.Pontos){
        console.log(`${character2.Name} venceu a corrida! 🏆`);
    }else
        console.log("Empate! 🏁");
}

// Iniciar a corrida
(async function main(){
    console.log("🏁🚦Corrida de Kart iniciada! \n");

    // Escolher dois jogadores aleatórios para a corrida
    const [player1Selected, player2Selected] = choosePlayers(players);
    console.log(`🏎️ Jogadores: ${player1Selected.Name} e ${player2Selected.Name} \n`);

    // Jogar a corrida
    await playRaceEngine(player1Selected, player2Selected);
    await getWinner(player1Selected, player2Selected);

    console.log("🏁🏆 Corrida finalizada! 🏆🏁");
})();
