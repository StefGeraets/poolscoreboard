import DB from '$lib';

export const players = async () => {
  return await DB.player.findMany({
    orderBy: [{wins: 'desc'}],
    include: {
      team: true
    }
  })
};
export const teams = async () => {
  return await DB.team.findMany({
  orderBy: [{score: 'desc'}],
  include: {
    players: true
  }
})};
export const matches = async () => {
  return await DB.match.findMany({
  orderBy: [{createdAt: 'desc'}],
  take: 20
})};
