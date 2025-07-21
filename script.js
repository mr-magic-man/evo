function runSimulation() {
  const p = parseFloat(document.getElementById("alleleA").value);
  const generations = parseInt(document.getElementById("generations").value);
  const q = 1 - p;

  const results = [];

  for (let gen = 0; gen <= generations; gen++) {
    const freqAA = p * p;
    const freqAa = 2 * p * q;
    const freqaa = q * q;

    results.push(`Gen ${gen}: AA=${freqAA.toFixed(3)}, Aa=${freqAa.toFixed(3)}, aa=${freqaa.toFixed(3)}`);
  }

  document.getElementById("results").textContent = results.join("\n");
}
