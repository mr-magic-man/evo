function runSimulation() {
  const homozygousRecessiveCount = parseInt(document.getElementById("homozygousRecessive").value);
  const generations = parseInt(document.getElementById("generations").value);
  const populationSize = parseInt(document.getElementById("populationSize").value);
  const carryingCapacity = parseInt(document.getElementById("carryingCapacity").value);
  const fitnessAA = parseFloat(document.getElementById("fitnessAA").value);
  const fitnessAa = parseFloat(document.getElementById("fitnessAa").value);
  const fitnessaa = parseFloat(document.getElementById("fitnessaa").value);
  const driftStrength = parseFloat(document.getElementById("driftStrength").value);

  const resultsEl = document.getElementById("results");
  resultsEl.textContent = "";

  const chartData = {
    labels: [],
    aa: [],
    Aa: [],
    AA: [],
  };

  // Initial frequencies using Hardy-Weinberg
  const q2 = homozygousRecessiveCount / populationSize;
  const q = Math.sqrt(q2);
  const p = 1 - q;

  let AA = Math.round(p * p * populationSize);
  let Aa = Math.round(2 * p * q * populationSize);
  let aa = populationSize - AA - Aa;

  for (let gen = 0; gen <= generations; gen++) {
    // Store and display current generation
    resultsEl.textContent += `Gen ${gen}: AA=${AA}, Aa=${Aa}, aa=${aa}, total=${AA + Aa + aa}\n`;
    chartData.labels.push(gen);
    chartData.AA.push(AA);
    chartData.Aa.push(Aa);
    chartData.aa.push(aa);

    // Calculate fitness-adjusted contributions
    let totalFitness =
      fitnessAA * AA + fitnessAa * Aa + fitnessaa * aa;

    if (totalFitness === 0) break; // Avoid division by 0

    // Expected offspring proportions
    let freqAA = (fitnessAA * AA) / totalFitness;
    let freqAa = (fitnessAa * Aa) / totalFitness;
    let freqaa = (fitnessaa * aa) / totalFitness;

    // Mating pool size capped by carrying capacity
    let nextGenSize = Math.min(carryingCapacity, populationSize);

    // Apply genetic drift: multinomial with added randomness
    const randomize = (prob) =>
      Math.max(0, Math.round(prob * nextGenSize + driftStrength * (Math.random() - 0.5) * nextGenSize));

    const totalProb = freqAA + freqAa + freqaa;
    const normAA = freqAA / totalProb;
    const normAa = freqAa / totalProb;
    const normaa = freqaa / totalProb;

    AA = randomize(normAA);
    Aa = randomize(normAa);
    aa = nextGenSize - AA - Aa;
    populationSize = nextGenSize;
  }

  plotGraph(chartData);
}

let chart; // Store the chart instance globally

function plotGraph(data) {
  const ctx = document.getElementById("genotypeChart").getContext("2d");
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.labels,
      datasets: [
        {
          label: "AA",
          data: data.AA,
          borderColor: "blue",
          fill: false,
        },
        {
          label: "Aa",
          data: data.Aa,
          borderColor: "green",
          fill: false,
        },
        {
          label: "aa",
          data: data.aa,
          borderColor: "red",
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Genotype Counts Over Generations",
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Generation",
          },
        },
        y: {
          title: {
            display: true,
            text: "Number of Individuals",
          },
          beginAtZero: true,
        },
      },
    },
  });
}
