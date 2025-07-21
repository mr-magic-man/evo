function runSimulation() {
  const homozygousRecessiveCount = parseInt(document.getElementById("homozygousRecessive").value);
  let populationSize = parseInt(document.getElementById("populationSize").value);
  const generations = parseInt(document.getElementById("generations").value);
  const carryingCapacity = parseInt(document.getElementById("carryingCapacity").value);
  const fitnessAA = parseFloat(document.getElementById("fitnessAA").value);
  const fitnessAa = parseFloat(document.getElementById("fitnessAa").value);
  const fitnessaa = parseFloat(document.getElementById("fitnessaa").value);
  const driftStrength = parseFloat(document.getElementById("driftStrength").value);

  const resultsEl = document.getElementById("results");
  resultsEl.value = "";

  const chartData = {
    labels: [],
    AA: [],
    Aa: [],
    aa: []
  };

  // Initial allele frequency using Hardy-Weinberg from q^2
  const q2 = homozygousRecessiveCount / populationSize;
  const q = Math.sqrt(q2);
  const p = 1 - q;

  let AA = Math.round(p * p * populationSize);
  let Aa = Math.round(2 * p * q * populationSize);
  let aa = populationSize - AA - Aa;

  for (let gen = 0; gen <= generations; gen++) {
    const total = AA + Aa + aa;
    resultsEl.value += `Gen ${gen}: AA=${AA}, Aa=${Aa}, aa=${aa}, total=${total}\n`;

    chartData.labels.push(gen);
    chartData.AA.push(AA);
    chartData.Aa.push(Aa);
    chartData.aa.push(aa);

    // Fitness-weighted probabilities
    const totalFitness = (AA * fitnessAA) + (Aa * fitnessAa) + (aa * fitnessaa);
    if (totalFitness === 0) break;

    const probAA = (AA * fitnessAA) / totalFitness;
    const probAa = (Aa * fitnessAa) / totalFitness;
    const probaa = (aa * fitnessaa) / totalFitness;

    const normSum = probAA + probAa + probaa;

    const expectedAA = (probAA / normSum) * carryingCapacity;
    const expectedAa = (probAa / normSum) * carryingCapacity;
    const expectedaa = (probaa / normSum) * carryingCapacity;

    const applyDrift = (expected) => {
      const variation = driftStrength * carryingCapacity;
      const noisy = expected + (Math.random() - 0.5) * variation;
      return Math.max(0, Math.round(noisy));
    };

    AA = applyDrift(expectedAA);
    Aa = applyDrift(expectedAa);
    aa = Math.max(0, carryingCapacity - AA - Aa);

    populationSize = AA + Aa + aa;
  }

  plotGraph(chartData);
}

let chart;

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
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Genotype Counts Over Generations",
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Generation"
          }
        },
        y: {
          title: {
            display: true,
            text: "Individuals"
          },
          beginAtZero: true
        }
      }
    }
  });
}
