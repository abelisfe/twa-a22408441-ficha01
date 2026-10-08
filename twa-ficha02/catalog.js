
export const byCategory = (list, cat) =>
  list.filter((game) => game.category === cat)



export const search = (list, text) =>
  list.filter((game) =>
    game.name.toLowerCase().includes(text.toLowerCase()) ||
    game.tags.some((tag) =>
      tag.toLowerCase().includes(text.toLowerCase())
    )
  )

  
export const total = (list) =>
  list.reduce((sum, game) => sum + game.price, 0)


export const top = (list, n) =>
  [...list]
    .sort((a, b) => b.price - a.price)
    .slice(0, n)

    
export const categories = (list) =>
  [...new Set(list.map((game) => game.category))].sort()


export const withDiscount = (list, pct) =>
  list.map((game) => ({
    ...game,
    price: game.price * (1 - pct / 100)
  }))
