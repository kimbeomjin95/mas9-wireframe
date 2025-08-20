export const isAllFalsy = (values: any) =>
  !values.every((value: any) => Boolean(value))

export const isSomeTruthy = (values: any) =>
  values.some((value: any) => Boolean(value))