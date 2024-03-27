const uniqueColorsMap: Map<string, Car> = new Map();

arr.forEach((car) => {
  const { color, included } = car;
  if (!uniqueColorsMap.has(color) || (included && !uniqueColorsMap.get(color)?.included)) {
    uniqueColorsMap.set(color, car);
  }
});

const uniqueCars: Car[] = Array.from(uniqueColorsMap.values());

console.log(uniqueCars)
