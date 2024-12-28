interface Scores {
  currentScore: number
  bestScore: number
}

interface PokemonData {
  data: PokemonAPIResponse | null
  error: string | null
  loading: boolean
}

interface RandomPokemonData {
  name: string
  image: string
  id: string
}

interface PokemonAPIResponse {
  count: number
  next: string | null
  previous: string | null
  results: Array<{
    name: string
    url: string
  }>
}

interface JSONObject {
  [x: string]: JSONValue
}

interface PokemonAPIEntry {
  name: string
  url: string
}

interface ScoresComponent {
  scores: Scores
}

interface PokemonListComponent {
  allPokemons: PokemonData
  scores: Scores
  gameOver: boolean
  handleScores: (newScore: Scores) => void
  handleGameOver: (gameOver: boolean) => void
}

interface GameOverComponent {
  scores: Scores
  restart: (restart: boolean) => void
}

interface PokemonCardType {
  name: string
  image: string
  handleSelection: (selection: string) => void
}

type JSONValue = string | number | boolean | JSONObject | null

export {
  type Scores,
  type PokemonData,
  type ScoresComponent,
  type PokemonListComponent,
  type PokemonAPIEntry,
  type RandomPokemonData,
  type PokemonAPIResponse,
  type PokemonCardType,
  type GameOverComponent,
}
