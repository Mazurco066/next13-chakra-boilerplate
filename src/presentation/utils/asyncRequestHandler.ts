export const asyncRequestHandler = async (promise: Promise<any>) => {
  try {
    return await promise
  } catch ({ response }: any) {
    return response
  }
}
