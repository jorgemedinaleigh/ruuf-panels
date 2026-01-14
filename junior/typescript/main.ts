import * as fs from 'fs';

interface TestCase {
  panelW: number;
  panelH: number;
  roofW: number;
  roofH: number;
  expected: number;
}

interface TestData {
  testCases: TestCase[];
}

function calculatePanels(
  panelWidth: number,
  panelHeight: number,
  roofWidth: number,
  roofHeight: number
): number {
  // Implementa acá tu solución
  
  // Validar que los valores entregados sean mayores a 0
  if (panelWidth <= 0 || panelHeight <= 0 || roofWidth <= 0 || roofHeight <= 0) {
    return 0;
  }

  // Función recursiva para encontrar el máximo de paneles
  // Se comparan las combinaciones posibles
  const calculateRecursive = (w: number, h: number): number => {
    
    // Calcula el máximo de paneles que caben en el techo horizontalmente y verticalmente, esto nos da el primer candidato
    let highestPanels = Math.max(
      Math.floor(w / panelWidth) * Math.floor(h / panelHeight),
      Math.floor(w / panelHeight) * Math.floor(h / panelWidth)
    );

    // Probar con paneles verticales y combinar las mitades
    for (let i = 1; i <= Math.floor(w / 2); i++) {
      // La suma del máximo de paneles de cada mitad del techo da el segundo candidato
      const candidate = calculateRecursive(i, h) + calculateRecursive(w - i, h);
      // si este candidato es un número mayor se actualiza
      if (candidate > highestPanels) {
        highestPanels = candidate;
      }
    }

    // Probar con paneles horizontales y combinar las mitades
    for (let j = 1; j <= Math.floor(h / 2); j++) {
      // La suma del máximo de paneles de cada mitad del techo da el tercer candidato
      const candidate = calculateRecursive(w, j) + calculateRecursive(w, h - j);
      // si este candidato es un número mayor se actualiza
      if (candidate > highestPanels) {
        highestPanels = candidate;
      }
    }

    // Devuelve el candidato con mayor número de paneles
    return highestPanels;
  };

  // Devuelve el máximo de la función recursiva según los valores del techo
  return calculateRecursive(roofWidth, roofHeight);
}

function main(): void {
  console.log("🐕 Wuuf wuuf wuuf 🐕");
  console.log("================================\n");
  
  runTests();
}

function runTests(): void {
  const data: TestData = JSON.parse(fs.readFileSync('test_cases.json', 'utf-8'));
  const testCases = data.testCases;
  
  console.log("Corriendo tests:");
  console.log("-------------------");
  
  testCases.forEach((test: TestCase, index: number) => {
    const result = calculatePanels(test.panelW, test.panelH, test.roofW, test.roofH);
    const passed = result === test.expected;
    
    console.log(`Test ${index + 1}:`);
    console.log(`  Panels: ${test.panelW}x${test.panelH}, Roof: ${test.roofW}x${test.roofH}`);
    console.log(`  Expected: ${test.expected}, Got: ${result}`);
    console.log(`  Status: ${passed ? "✅ PASSED" : "❌ FAILED"}\n`);
  });
}

main();
