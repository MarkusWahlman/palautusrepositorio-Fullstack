export function calculateBmi(heightCm: number, weightKg: number) {
  const heightM = heightCm / 100;

  const bmi = weightKg / (heightM * heightM);

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "Normal range";
  } else if (bmi >= 25 && bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const height = parseFloat(args[0]);
  const weight = parseFloat(args[1]);

  if (isNaN(height) || isNaN(weight)) {
    console.log("Please provide valid height (cm) and weight (kg). Example:");
    console.log("npm run calculateBmi -- 180 74");
  } else {
    console.log(calculateBmi(height, weight));
  }
}
