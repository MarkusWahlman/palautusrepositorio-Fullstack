interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export function calculateExercises(
  dailyHours: number[],
  target: number
): Result {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((d) => d > 0).length;
  const average = dailyHours.reduce((sum, h) => sum + h, 0) / periodLength;
  const success = average >= target;

  let rating = 1;
  let ratingDescription = "";

  if (average >= target) {
    rating = 3;
    ratingDescription = "nice, you reached your goal!";
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = "could be better";
  } else {
    rating = 1;
    ratingDescription = "need to work harder";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}

if (require.main === module) {
  const args = process.argv.slice(2).map(Number);

  if (args.length < 2) {
    console.log(
      "Usage: ts-node exerciseCalculator.ts <target> <day1> <day2> ..."
    );
    process.exit(1);
  }

  const [target, ...dailyHours] = args;

  if (dailyHours.some(isNaN) || isNaN(target)) {
    console.log("Please provide valid numbers.");
    process.exit(1);
  }

  console.log(calculateExercises(dailyHours, target));
}
