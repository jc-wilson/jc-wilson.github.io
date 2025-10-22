fetch("../valorant.json").then(response => {
    if (!response.ok) throw new Error("Failed to load JSON");
    return response.json();
}).then(data => {
    const agentData = data

    function randomAgent() {
        const r = Math.floor(Math.random() * 28) + 1;
        if (r === 8) {
            randomAgent();
            r = null;
        }
        ;
        const p = agentData.find(p => Number(p["No."]) === r);
        if (p) return p.Agent;
        return null;
    };

    window.randomAgentBtn = function () {
        const result = randomAgent();
        const output = document.getElementById("randomAgentResult");
        output.textContent = `Your random agent is ${result}!`;
    }
});