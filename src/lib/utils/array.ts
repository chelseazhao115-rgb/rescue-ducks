export function chunk<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

export function difference<T>(a: T[], b: T[]): T[] {
  const bSet = new Set(b);
  return a.filter((x) => !bSet.has(x));
}

export function removeItem<T>(array: T[], item: T): T[] {
  const index = array.indexOf(item);
  if (index === -1) return array;
  return [...array.slice(0, index), ...array.slice(index + 1)];
}
