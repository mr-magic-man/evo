function runSimulation() {
  const pInit = parseFloat(document.getElementById("alleleA").value);
  const generations = parseInt(document.getElementById("generations").value);
  const popSize = parseInt(document.getElementById("populationSize").value);

  let p = pInit;
  let q = 1 - p;

  const results = [];

  for (let gen = 0; gen <= generations; gen++) {
    let population = [];

    // Generate individuals based on Hardy-Weinberg proportions and population size
    const expectedAA = Math.round(p * p * popSize);
    const expectedAa = Math.round(2 * p * q * popSize);
    const expectedaa = popSize - expectedAA - expectedAa;

    for (let i = 0; i < expectedAA; i++) population.push(["A", "A"]);
    for (let i = 0; i < expectedAa; i++) population.push(["A", "a"]);
    for (let i = 0; i < expectedaa; i++) population.push(["a", "a"]);

    // Random mating
    const offspring = [];
    for (let i = 0; i < popSize; i++) {
      const parent1 = population[Math.floor(Math.random() * popSize)];
      const parent2 = population[Math.floor(Math.random() * popSize)];
      const allele1 = parent1[Math.floor(Math.random() * 2)];
      const allele2 = parent2[Math.floor(Math.random() * 2)];
      offspring.push([allele1, allele2]);
    }

    // Count genotypes in offspring
    let countAA = 0, countAa = 0, countaa = 0;
    offspring.forEach(pair => {
      const genotype = pair.sort().join("");
      if (genotype === "AA") countAA++;
      else if (genotype === "Aa") countAa++;
      else if (genotype === "aa") countaa++;
    });

    const freqAA = countAA / popSize;
    const freqAa = countAa / popSize;
    const freqaa = countaa / popSize;

    results.push(`Gen ${gen}: AA=${freqAA.toFixed(3)}, Aa=${freqAa.toFixed(3)}, aa=${freqaa.toFixed(3)}`);

    // Update allele frequencies for next generation
    const totalA = countAA * 2 + countAa;
    const totala = countaa * 2 + countAa;
    p = totalA / (2 * popSize);
    q = totala / (2 * popSize);
  }

  document.getElementById("results").textContent = results.join("\n");
}
