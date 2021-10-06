export const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 5
  const from = page ? (page - 1) * limit : 0
  const to = page ? from + size : size

  return { from, to }
}
