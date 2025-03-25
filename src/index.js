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

// Função para rolar os dados
async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
}

// Sortear Players para a corrida
async function getRandomPlayer(){
    let random = Math.random();
    let resultPlayer;

    switch(true){
        case random <= 0.16:
            result = player1;
            break;
        case random <= 0.33:
            result = player2;
            break;
        case random <= 0.50:
            result = player3;
            break;
        case random <= 0.66:
            result = player4;
            break;
        case random <= 0.83:
            result = player5;
            break;
        default:
            result = player6;
            break;
    }
    return resultPlayer;
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
    // let player1 = await getRandomPlayer();
    // let player2 = await getRandomPlayer();
    console.log(`🏎️ Jogadores: ${player1.Name} e ${player2.Name} \n`);
    await playRaceEngine(player1, player2);
    await getWinner(player1, player2);
    console.log("🏁🏆 Corrida finalizada! 🏆🏁");
})();