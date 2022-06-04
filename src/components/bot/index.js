export const bot = {

  total: 12,
  pokeNumber: () => {
    return Math.floor(Math.random() * (800 - 1) + 1)
  },
  atributes: [0,0,0,0,0],
  generateAtribute: ()=> {
    while (bot.total > 0) {
      let count = Math.floor(Math.random() * (5 - 0))
      bot.atributes[count] += 1
      bot.total -= 1
    }
  }
}

