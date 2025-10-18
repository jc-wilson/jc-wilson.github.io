fetch("pokemon.json").then(response => {
    if (!response.ok) throw new Error("Failed to load JSON");
    return response.json();
}).then(data => {
    let pokemonData = data;

    function duplicatesRemoved(p) {
        return pokemonData.filter(
            (p, index, self) => index === self.findIndex(obj => obj.number === p.number)
        )
    };

    const pokemon = duplicatesRemoved();

    let pokemonTypes = ["Normal", "Fire", "Water", "Electric", "Grass", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"]
    let pokemonByType = []

    for (let i = 0; i <= 17; i++) {
        const poke = pokemon.filter(p => p.types.some(t => t === pokemonTypes[i]));
        pokemonByType.push(poke)
    }

    console.log("pokemonByType:", pokemonByType)

    function randomPokemon() {
        const r = Math.floor(Math.random() * 1025) + 1;
        const p = pokemon.find(p => Number(p.number) === r);
        if (p) return p.name;
        return null;
    };

    function randomPokemonFull() {
        const r = Math.floor(Math.random() * 1025) + 1;
        const p = pokemon.find(p => Number(p.number) === r);
        if (p) return p;
        return null;
    };

    window.randomPokemonButton = function () {
        const result = randomPokemon();
        const output = document.getElementById("result");
        output.textContent = `Your random pokemon is ${result}!`;
        const imgUrl = `https://img.pokemondb.net/sprites/scarlet-violet/icon/${result.replace(" ", "-").replace("é", "e").replace(".", "").toLowerCase()}.png`
        const html = `<img src="${imgUrl}"`;
        const container = document.getElementById("image-container");
        container.innerHTML = `<img src="${imgUrl}">`;
    };

    window.resetForm = function () {
        document.getElementById("main-form").reset()
    }

    const listFunction = p => {
        if (p) console.log(`${p.number}: ${p.name} (${p.types.filter(t => t).join(", ")})`);
    };


    const pokemonChoice = pokemon.filter(p => Number(p.spDef) === 95);

    console.log("pokemon array:", pokemon);

    pokemonChoice.forEach(listFunction);

    const input = document.getElementById("input");

    console.log("input is:", input);

    window.bstButtonFunction = function () {
        console.log("Submit was pressed");

        let pokeOrder = []
        for (let i = 1; i <= 6; i++) {
            pokeOrder.push(document.getElementById(`poke${i}`).value)
        }

        let pokeNames = ["HP", "Attack", "Defense", "Special Attack", "Special Defense", "Speed"];

        const statMap = {
            "HP": "hp",
            "Attack": "attack",
            "Defense": "defense",
            "Special Attack": "spAtk",
            "Special Defense": "spDef",
            "Speed": "speed"
        };

        console.log(pokeOrder)
        let pokeValues2 = []
        for (let i = 0; i <= 5; i++) {
            pokeValues2.push(pokemon.find(p => p.name.toLowerCase() === pokeOrder[i].toLowerCase()))
        }

        let pokeHTML = pokeValues2.slice(0, 6).map(p => p.name)

        let pokeValues = []
        for (let i = 0; i <= 5; i++) {
            pokeValues.push([pokeValues2[i].hp, pokeValues2[i].attack, pokeValues2[i].defense, pokeValues2[i].spAtk, pokeValues2[i].spDef, pokeValues2[i].speed])
        }

        function permute(arr) {
            if (arr.length === 0) return [[]];
            return arr.flatMap((v, i) =>
                permute(arr.slice(0, i).concat(arr.slice(i + 1))).map(rest => [v, ...rest])
            );
        }

        const allPermutations = permute([0, 1, 2, 3, 4, 5]); // indices of Pokémon

        let bestSum = -Infinity;
        let bestAssignment = [];

        allPermutations.forEach(assign => {
            // assign[i] = Pokémon index for stat i
            const sum = assign.reduce((acc, pokeIndex, statIndex) => acc + Number(pokeValues[pokeIndex][statIndex]), 0);
            if (sum > bestSum) {
                bestSum = sum;
                bestAssignment = assign;
            }
        });

        console.log(bestAssignment)

        let valueOutput = []

        pokeValues.forEach((p, i) => {
            valueOutput.push(bestAssignment.map(index => p[index]));
        });

        valueOutput = bestAssignment.map(index => valueOutput[index])

        pokeHTML = bestAssignment.map(index => pokeHTML[index]);
        pokeValues2 = bestAssignment.map(index => pokeValues2[index]);

        bestAssignment = bestAssignment.map(index => pokeNames[index]);
        console.log("pokeNames:", pokeNames);
        console.log("pokeValues:", pokeValues);
        console.log("pokeValues2:", pokeValues2);
        console.log(valueOutput)
        console.log(bestAssignment)

        for (let i = 1; i <= 6; i++) {
            const output = document.getElementById(`result${i}`)
            output.textContent = `${pokeHTML[i - 1]}`
        }
        ;

        for (let i = 1; i <= 6; i++) {
            const statType = document.getElementById(`statType${i}`)
            statType.textContent = `${pokeNames[i - 1]}`
        }
        ;

        for (let i = 1; i <= 6; i++) {
            const valueOutput = document.getElementById(`valueOutput${i}`)
            valueOutput.textContent = `${pokeValues2[i - 1][statMap[pokeNames[i - 1]]]}`
        }
        ;

        document.getElementById("valueTotal").textContent = `${bestSum}`

        console.log("Best assignment of Pokémon to stats:", bestAssignment);
        console.log("Max BST:", bestSum);
        console.log(`Best total = ${bestSum}`);
        console.log(pokeValues2.slice(0, 6));
    };

    window.randomiseBstPokemonFunction = function () {
        for (let i = 1; i <= 6; i++) {
            let result = randomPokemon();
            const poke = document.getElementById(`poke${i}`)
            poke.value = `${result}`
        }
    }

    input.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            event.preventDefault();
            const inputType = document.getElementById("input").value;

            const sortByPokemon = pokemon.filter(p =>
                p.types.some(t => t.toLowerCase() === inputType.toLowerCase()));
            const output = document.getElementById("resultInput");
            output.textContent = "";
            sortByPokemon.forEach(p => {
                    output.textContent += `${p.name}, `;
                }
            );

            console.log("Enter was pressed");
        }
    });

    window.bstGameFunction = function () {
        document.querySelectorAll("#bstGame td[id^='bstName'], #bstGame td[id^='bstValue'], #bstGame td[id^='bstGameValueTotal']").forEach(td => {
            td.innerHTML = "&nbsp;";
        });
        document.getElementById("bstGame").reset()
        const select = document.getElementById("selectStats");
        for (let option of select.options) {
            option.disabled = false;
        }
        let gameRandomPokemon = []
        for (let i = 1; i <= 6; i++) {
            gameRandomPokemon.push(randomPokemonFull())
        }

        gameRandomPokemon.push(gameRandomPokemon[5])

        let j = 0
        let gameRandomPokemonOutput = document.getElementById("gameRandomPokemon")
        gameRandomPokemonOutput.textContent = `${gameRandomPokemon[0].name}`
        let imgUrl = `https://img.pokemondb.net/sprites/scarlet-violet/icon/${gameRandomPokemon[0].name.replace(" ", "-").replace("é", "e").replace(".", "").toLowerCase()}.png`
        const bstImageContainer = document.getElementById("image-container-gameRandomPokemon");
        bstImageContainer.innerHTML = `<img src="${imgUrl}">`;

        console.log("gameRandomPokemon:", gameRandomPokemon)
        const selectElement = document.getElementById("selectStats")
        let userChoice = []
        let userStats = []
        selectElement.addEventListener("change", (event) => {
            const disableChoice = selectElement.selectedIndex
            document.getElementById("selectStats").options[`${disableChoice}`].disabled = true;
            gameRandomPokemonOutput.textContent = `${gameRandomPokemon[j + 1].name}`
            imgUrl = `https://img.pokemondb.net/sprites/scarlet-violet/icon/${gameRandomPokemon[j + 1].name.replace(" ", "-").replace("é", "e").replace(".", "").toLowerCase()}.png`
            bstImageContainer.innerHTML = `<img src="${imgUrl}">`;
            userChoice.push(selectElement.value)
            userStats.push(gameRandomPokemon[j][userChoice[j]])
            let bstName = document.getElementById(`bstName${userChoice[j]}`)
            let bstValue = document.getElementById(`bstValue${userChoice[j]}`)
            console.log("userChoice:", userChoice)
            console.log("userStats:", userStats)
            bstName.textContent = `${gameRandomPokemon[j].name}`
            bstValue.textContent = `${gameRandomPokemon[j][selectElement.value]}`
            j++
            if (j === 6) {
                console.log("game finished")
                finishGame()
            }
        })

        let pokeValues = []
        for (let i = 0; i <= 5; i++) {
            pokeValues.push([gameRandomPokemon[i].hp, gameRandomPokemon[i].attack, gameRandomPokemon[i].defense, gameRandomPokemon[i].spAtk, gameRandomPokemon[i].spDef, gameRandomPokemon[i].speed])
        }

        function permute(arr) {
            if (arr.length === 0) return [[]];
            return arr.flatMap((v, i) =>
                permute(arr.slice(0, i).concat(arr.slice(i + 1))).map(rest => [v, ...rest])
            );
        }

        const allPermutations = permute([0, 1, 2, 3, 4, 5]); // indices of Pokémon

        let bestSum = -Infinity;
        let bestAssignment = [];

        allPermutations.forEach(assign => {
            const sum = assign.reduce((acc, pokeIndex, statIndex) => acc + Number(pokeValues[pokeIndex][statIndex]), 0);
            if (sum > bestSum) {
                bestSum = sum;
                bestAssignment = assign;
            }
        });

        function finishGame() {
            const sum1 = userStats.reduce((acc, current) => acc + Number(current), 0);
            const userBST = document.getElementById("bstGameValueTotal")
            const obstGameValueTotal = document.getElementById("obstGameValueTotal")
            userBST.textContent = `${sum1}`
            obstGameValueTotal.textContent = `${bestSum}`
            console.log("bestAssigment:", bestAssignment)
            const statMap = ["hp", "attack", "defense", "spAtk", "spDef", "speed"]

            for (let i = 0; i <= 5; i++) {
                const obstName = document.getElementById(`obstName${statMap[i]}`)
                const obstValue = document.getElementById(`obstValue${statMap[i]}`)
                obstName.textContent = `${gameRandomPokemon[bestAssignment[i]].name}`
                obstValue.textContent = `${gameRandomPokemon[bestAssignment[i]][statMap[i]]}`
            }
        }
    }
})
;

fetch("valorant.json").then(response => {
    if (!response.ok) throw new Error("Failed to load JSON");
    return response.json();
}).then(data => {
    const agentData = data

    function randomAgent() {
        const r = Math.floor(Math.random() * 28) + 1;
        if (r === 8) {
            r = null;
            randomAgent();
        }
        ;
        console.log(r)
        const p = agentData.find(p => Number(p["No."]) === r);
        if (p) return p.Agent;
        return null;
    };

    window.randomAgentBtn = function () {
        const result = randomAgent();
        const output = document.getElementById("randomAgentResult");
        output.textContent = `Your random agent is ${result}!`;
    }

    console.log(randomAgent())
});






