export function getNumberList(
  from: number,
  to: number,
  step: number = 1
): Array<number> {
  if (step === 0) {
    return [from];
  }

  const list = [];

  for (let i = from; step > 0 ? i <= to : i >= to; i += step) {
    list.push(i);
  }

  return list;
}
