function runSimulation() {
  const freqaaInit = parseFloat(document.getElementById("freqaa").value);
  const generations = parseInt(document.getElementById("generations").value);
  const popSize = parseInt(document.getElementById("populationSize").value);

  // Calculate initial allele frequencies from q^2 = freq(aa)
  let q = Math.sqrt(freqaaInit);
  let p = 1 - q;

  const results = [];
  const chartData = {
    labels: [],
    AA: [],
    Aa: [],
    aa: []
  };

  for (let gen = 0; gen <= generations; gen++) {
    let population = [];

    const expectedAA = Math.round(p * p * popSize);
    const expectedAa = Math.round(2 * p * q * popSize);
    const expectedaa = popSize - expectedAA - expectedAa;

    for (let i = 0; i < expectedAA; i++) population.push(["A", "A"]);
    for (let i = 0; i < expectedAa; i++) population.push(["A", "a"]);
    for (let i = 0; i < expectedaa; i++) population.push(["a", "a"]);

    const offspring = [];
    for (let i = 0; i < popSize; i++) {
      const parent1 = population[Math.floor(Math.random() * popSize)];
      const parent2 = population[Math.floor(Math.random() * popSize)];
      const allele1 = parent1[Math.floor(Math.random() * 2)];
      const allele2 = parent2[Math.floor(Math.random() * 2)];
      offspring.push([allele1, allele2]);
    }

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

    chartData.labels.push(`Gen ${gen}`);
    chartData.AA.push(freqAA);
    chartData.Aa.push(freqAa);
    chartData.aa.push(freqaa);

    const totalA = countAA * 2 + countAa;
    const totala = countaa * 2 + countAa;
    p = totalA / (2 * popSize);
    q = totala / (2 * popSize);
  }

  document.getElementById("results").textContent = results.join("\n");

  // Draw chart
  const ctx = document.getElementById("frequencyChart").getContext("2d");
  if (window.chart) window.chart.destroy();
  window.chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartData.labels,
      datasets: [
        {
          label: 'AA',
          data: chartData.AA,
          borderColor: 'blue',
          fill: false
        },
        {
          label: 'Aa',
          data: chartData.Aa,
          borderColor: 'green',
          fill: false
        },
        {
          label: 'aa',
          data: chartData.aa,
          borderColor: 'red',
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          min: 0,
          max: 1,
          title: {
            display: true,
            text: 'Genotype Frequency'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Generation'
          }
        }
      }
    }
  });
}
