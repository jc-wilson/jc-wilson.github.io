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
        console.log("Enter was pressed");

        // Get all 6 Pokémon names
        const poke1 = document.getElementById("pokeOne").value
        const poke2 = document.getElementById("pokeTwo").value
        const poke3 = document.getElementById("pokeThree").value
        const poke4 = document.getElementById("pokeFour").value
        const poke5 = document.getElementById("pokeFive").value
        const poke6 = document.getElementById("pokeSix").value

        let pokeNames = ["HP", "Attack", "Defense", "Special Attack", "Special Defense", "Speed"];
        let pokeOrder = [poke1, poke2, poke3, poke4, poke5, poke6]

        const statMap = {
            "HP": "hp",
            "Attack": "attack",
            "Defense": "defense",
            "Special Attack": "spAtk",
            "Special Defense": "spDef",
            "Speed": "speed"
        };

        let pokemon1 = pokemon.find(p => p.name.toLowerCase() === poke1.toLowerCase());
        let pokemon2 = pokemon.find(p => p.name.toLowerCase() === poke2.toLowerCase());
        let pokemon3 = pokemon.find(p => p.name.toLowerCase() === poke3.toLowerCase());
        let pokemon4 = pokemon.find(p => p.name.toLowerCase() === poke4.toLowerCase());
        let pokemon5 = pokemon.find(p => p.name.toLowerCase() === poke5.toLowerCase());
        let pokemon6 = pokemon.find(p => p.name.toLowerCase() === poke6.toLowerCase());

        let pokeValues2 = [pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6]
        let pokeHTML = [pokemon1.name, pokemon2.name, pokemon3.name, pokemon4.name, pokemon5.name, pokemon6.name]

        let spokemon1 = []
        let spokemon2 = []
        let spokemon3 = []
        let spokemon4 = []
        let spokemon5 = []
        let spokemon6 = []

        if (pokemon1) {
            spokemon1 = [pokemon1.hp, pokemon1.attack, pokemon1.defense, pokemon1.spAtk, pokemon1.spDef, pokemon1.speed];
        }
        if (pokemon2) {
            spokemon2 = [pokemon2.hp, pokemon2.attack, pokemon2.defense, pokemon2.spAtk, pokemon2.spDef, pokemon2.speed];
        }
        if (pokemon3) {
            spokemon3 = [pokemon3.hp, pokemon3.attack, pokemon3.defense, pokemon3.spAtk, pokemon3.spDef, pokemon3.speed];
        }
        if (pokemon4) {
            spokemon4 = [pokemon4.hp, pokemon4.attack, pokemon4.defense, pokemon4.spAtk, pokemon4.spDef, pokemon4.speed];
        }
        if (pokemon5) {
            spokemon5 = [pokemon5.hp, pokemon5.attack, pokemon5.defense, pokemon5.spAtk, pokemon5.spDef, pokemon5.speed];
        }
        if (pokemon6) {
            spokemon6 = [pokemon6.hp, pokemon6.attack, pokemon6.defense, pokemon6.spAtk, pokemon6.spDef, pokemon6.speed];
        }


        console.log("test2", pokemon1)

        const pokeValues = [spokemon1, spokemon2, spokemon3, spokemon4, spokemon5, spokemon6];

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

        const output1 = document.getElementById("result1")
        output1.textContent = `${pokeHTML[0]}`

        const output2 = document.getElementById("result2")
        output2.textContent = `${pokeHTML[1]}`

        const output3 = document.getElementById("result3")
        output3.textContent = `${pokeHTML[2]}`

        const output4 = document.getElementById("result4")
        output4.textContent = `${pokeHTML[3]}`

        const output5 = document.getElementById("result5")
        output5.textContent = `${pokeHTML[4]}`

        const output6 = document.getElementById("result6")
        output6.textContent = `${pokeHTML[5]}`

        const statType1 = document.getElementById("statType1")
        statType1.textContent = `${pokeNames[0]}`

        const statType2 = document.getElementById("statType2")
        statType2.textContent = `${pokeNames[1]}`

        const statType3 = document.getElementById("statType3")
        statType3.textContent = `${pokeNames[2]}`

        const statType4 = document.getElementById("statType4")
        statType4.textContent = `${pokeNames[3]}`

        const statType5 = document.getElementById("statType5")
        statType5.textContent = `${pokeNames[4]}`

        const statType6 = document.getElementById("statType6")
        statType6.textContent = `${pokeNames[5]}`

        const valueOutput1 = document.getElementById("valueOutput1")
        valueOutput1.textContent = `${pokeValues2[0][statMap[pokeNames[0]]]}`

        const valueOutput2 = document.getElementById("valueOutput2")
        valueOutput2.textContent = `${pokeValues2[1][statMap[pokeNames[1]]]}`

        const valueOutput3 = document.getElementById("valueOutput3")
        valueOutput3.textContent = `${pokeValues2[2][statMap[pokeNames[2]]]}`

        const valueOutput4 = document.getElementById("valueOutput4")
        valueOutput4.textContent = `${pokeValues2[3][statMap[pokeNames[3]]]}`

        const valueOutput5 = document.getElementById("valueOutput5")
        valueOutput5.textContent = `${pokeValues2[4][statMap[pokeNames[4]]]}`

        const valueOutput6 = document.getElementById("valueOutput6")
        valueOutput6.textContent = `${pokeValues2[5][statMap[pokeNames[5]]]}`

        document.getElementById("valueTotal").textContent = `${bestSum}`


        console.log("Best assignment of Pokémon to stats:", bestAssignment);
        console.log("Max BST:", bestSum);

        console.log(`Best total = ${bestSum}`);
        console.log(pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6);
    };

    window.randomiseBstPokemonFunction = function () {
        let result = randomPokemon();
        const pokeOne = document.getElementById("pokeOne")
        const pokeTwo = document.getElementById("pokeTwo")
        const pokeThree = document.getElementById("pokeThree")
        const pokeFour = document.getElementById("pokeFour")
        const pokeFive = document.getElementById("pokeFive")
        const pokeSix = document.getElementById("pokeSix")
        pokeOne.value = `${result}`
        result = randomPokemon();
        pokeTwo.value = `${result}`
        result = randomPokemon();
        pokeThree.value = `${result}`
        result = randomPokemon();
        pokeFour.value = `${result}`
        result = randomPokemon();
        pokeFive.value = `${result}`
        result = randomPokemon();
        pokeSix.value = `${result}`
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





