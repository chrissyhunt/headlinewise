export const hasEndpointSecret = (request: Request) => {
  const authHeader = request.headers.get("Authorization");
  return authHeader === `Bearer ${process.env.CRON_SECRET}`;
};
