// Написать модуль, который способен выполнять операции с числами любой длины.

export const sum = (a, b) => Number(BigInt(a) + BigInt(b));
export const division = (a, b) => Number(BigInt(a) / BigInt(b));
export const deduction = (a, b) => Number(BigInt(a) - BigInt(b));
export const multiplication = (a, b) => Number(BigInt(a) * BigInt(b));
