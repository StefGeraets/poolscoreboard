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
  include: {
    player1: true,
    player2: true,
    winner: true
  },
  take: 20
})};
