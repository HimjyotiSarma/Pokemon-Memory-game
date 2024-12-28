import { useState } from 'react'
import './App.css'
import PokemonList from './components/PokemonList'
import ScoreCard from './components/ScoreCard'
import { PokemonData, Scores } from './utils/types'
import { useFetchData } from './utils/fetchData'
import GameOver from './components/GameOver'

function App() {
  const [scores, setScores] = useState<Scores>({
    currentScore: 0,
    bestScore: 0,
  })
  const [offset, setOffset] = useState<number>(0)
  const [gameOver, setGameOver] = useState<boolean>(false)

  // const [allPokemonDetails, setAllPokemonDetails] = useState(null)

  const pokemonData: PokemonData = useFetchData(
    'https://pokeapi.co/api/v2/pokemon',
    {
      limit: 20,
      offset,
    },
    {
      gameOver,
    }
  )
  // Use https://img.pokemondb.net/artwork/{pokemon_Name_here} to generate Image

  console.log(pokemonData)

  const handleScores = (newScore: Scores) => {
    setScores(newScore)
  }

  const handleGameOver = (gameEnd: boolean) => {
    if (gameEnd == true) {
      if (scores.currentScore > scores.bestScore) {
        const currentBestScore = scores.currentScore
        setScores({ ...scores, bestScore: currentBestScore })
      }
      setGameOver(true)
    }
  }

  const handleRestartGame = (restart: boolean) => {
    if (restart == true) {
      setScores({ ...scores, currentScore: 0 })
      setGameOver(false)
      setOffset(offset + 20)
    }
  }
  // Data Inside pokemonData.results

  return (
    <>
      <ScoreCard scores={scores} />
      <PokemonList
        allPokemons={pokemonData}
        scores={scores}
        gameOver={gameOver}
        handleScores={handleScores}
        handleGameOver={handleGameOver}
      />
      {gameOver && <GameOver scores={scores} restart={handleRestartGame} />}
    </>
  )
}

export default App
