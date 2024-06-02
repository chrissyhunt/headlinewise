export const hasEndpointSecret = (request: Request): boolean => {
  const authHeader = request.headers.get('Authorization')
  return authHeader === `Bearer ${process.env.CRON_SECRET}`
}
