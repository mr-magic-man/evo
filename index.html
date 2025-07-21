// Hardy-Weinberg Simulation with Selection, Drift, and Carrying Capacity
function runSimulation() {
  const freqaa = parseFloat(document.getElementById("freqaa").value);
  const generations = parseInt(document.getElementById("generations").value);
  const populationSize = parseInt(document.getElementById("populationSize").value);
  const fitnessAA = parseFloat(document.getElementById("fitnessAA").value);
  const fitnessAa = parseFloat(document.getElementById("fitnessAa").value);
  const fitnessaa = parseFloat(document.getElementById("fitnessaa").value);
  const drift = parseFloat(document.getElementById("drift").value);
  const carryingCapacity = parseInt(document.getElementById("carryingCapacity").value);

  if (isNaN(freqaa) || isNaN(generations) || isNaN(populationSize) || isNaN(fitnessAA) || isNaN(fitnessAa) || isNaN(fitnessaa) || isNaN(drift) || isNaN(carryingCapacity)) {
    alert("Please enter valid numbers in all fields.");
    return;
  }

  let q = Math.sqrt(freqaa);
  let p = 1 - q;

  let AA = Math.round(p * p * populationSize);
  let Aa = Math.round(2 * p * q * populationSize);
  let aa = populationSize - AA - Aa;

  const data = [];

  for (let gen = 0; gen <= generations; gen++) {
    data.push({ gen, AA, Aa, aa });

    // Apply fitness
    let totalFitness = AA * fitnessAA + Aa * fitnessAa + aa * fitnessaa;
    let expectedAA = (AA * fitnessAA / totalFitness) * populationSize;
    let expectedAa = (Aa * fitnessAa / totalFitness) * populationSize;
    let expectedaa = (aa * fitnessaa / totalFitness) * populationSize;

    // Apply genetic drift
    expectedAA = Math.round(expectedAA + (Math.random() - 0.5) * drift * expectedAA);
    expectedAa = Math.round(expectedAa + (Math.random() - 0.5) * drift * expectedAa);
    expectedaa = Math.round(expectedaa + (Math.random() - 0.5) * drift * expectedaa);

    // Normalize to carrying capacity
    let total = expectedAA + expectedAa + expectedaa;
    if (total > carryingCapacity) {
      let scale = carryingCapacity / total;
      expectedAA = Math.round(expectedAA * scale);
      expectedAa = Math.round(expectedAa * scale);
      expectedaa = carryingCapacity - expectedAA - expectedAa;
    }

    AA = expectedAA;
    Aa = expectedAa;
    aa = expectedaa;
  }

  displayResults(data);
  drawChart(data);
}

function displayResults(data) {
  const output = document.getElementById("results");
  output.innerText = "";
  data.forEach(d => {
    output.innerText += `Generation ${d.gen}: AA=${d.AA}, Aa=${d.Aa}, aa=${d.aa}\n`;
  });
}

function drawChart(data) {
  const ctx = document.getElementById("frequencyChart").getContext("2d");

  if (window.myChart) window.myChart.destroy();

  window.myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.map(d => d.gen),
      datasets: [
        {
          label: "AA",
          data: data.map(d => d.AA),
          borderColor: "#3366cc",
          fill: false
        },
        {
          label: "Aa",
          data: data.map(d => d.Aa),
          borderColor: "#dc3912",
          fill: false
        },
        {
          label: "aa",
          data: data.map(d => d.aa),
          borderColor: "#ff9900",
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top"
        },
        title: {
          display: true,
          text: "Genotype Counts Over Generations"
        }
      }
    }
  });
}
