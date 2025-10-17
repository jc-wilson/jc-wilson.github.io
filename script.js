fetch("pokemon.json").then(response => {
    if (!response.ok) throw new Error("Failed to load JSON");
    return response.json(); // Parse the JSON into a JavaScript object
}).then(data => {
    let pokemonData = data;

    function duplicatesRemoved(p) {
        return pokemonData.filter(
            (p, index, self) => index === self.findIndex(obj => obj.number === p.number)
        )
    };

    let pokemon = duplicatesRemoved();

    function randomPokemon() {
        const r = Math.floor(Math.random() * 1025) + 1;
        const p = pokemon.find(p => Number(p.number) === r);
        if (p) return p.name;
        return null;
    };

    window.randomPokemonButton = function () {
        const result = randomPokemon();
        const output = document.getElementById("result");
        output.textContent = `Your random pokemon is ${result}!`;
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

        // Get all 6 Pokémon names
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

        // Each stat index 0-5 needs a Pokémon assigned
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
        };

        for (let i = 1; i <= 6; i++) {
            const statType = document.getElementById(`statType${i}`)
            statType.textContent = `${pokeNames[i - 1]}`
        };

        for (let i = 1; i <= 6; i++) {
            const valueOutput = document.getElementById(`valueOutput${i}`)
            valueOutput.textContent = `${pokeValues2[i - 1][statMap[pokeNames[i - 1]]]}`
        };

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
        let pokemonTotalBST = []

    }
});

fetch("valorant.json").then(response => {
    if (!response.ok) throw new Error("Failed to load JSON");
    return response.json(); // Parse the JSON into a JavaScript object
}).then(data => {
    const agentData = data

    function randomAgent() {
        const r = Math.floor(Math.random() * 28) + 1;
        if (r === 8) {r = null; randomAgent();};
        console.log(r)
        const p = agentData.find(p => Number(p["No."]) === r);
        if (p) return p.Agent;
        return null;
    };

    window.randomAgentBtn = function() {
        const result = randomAgent();
        const output = document.getElementById("randomAgentResult");
        output.textContent = `Your random agent is ${result}!`;
    }

    console.log(randomAgent())
});






