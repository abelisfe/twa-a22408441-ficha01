
import { items } from './data.js'
import { byCategory, search, top, total, categories } from './catalog.js'
import { writeFile } from 'node:fs/promises'

const [cmd, arg] = process.argv.slice(2)

const showGames = (list) =>
  list.forEach((game) =>
    console.log(`${game.id} · ${game.name} · ${game.price.toFixed(2)} EUR`)
  )

if (!cmd) {
  showGames(items)
} else if (cmd === 'report') {
  const report = {
    count: items.length,
    total: total(items),
    categories: categories(items),
    top3: top(items, 3)
  }

  await writeFile('report.json', JSON.stringify(report, null, 2))
  console.log('Relatorio guardado em report.json')
} else if (cmd === 'search') {
  showGames(search(items, arg ?? ''))
} else if (cmd === 'top') {
  showGames(top(items, Number(arg) || 3))
} else {
  showGames(byCategory(items, cmd))
}
