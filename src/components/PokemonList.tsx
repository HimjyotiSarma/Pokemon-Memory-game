import { useEffect, useState } from 'react'
import { PokemonListComponent, RandomPokemonData, Scores } from '../utils/types'
import Loading from './Loading'
import PokemonCard from './PokemonCard'
import '../styles/PokemonList.scss'
import { v4 as uuidv4 } from 'uuid'

const PokemonList = ({
  allPokemons,
  scores,
  gameOver,
  handleScores,
  handleGameOver,
}: PokemonListComponent) => {
  const [randomPokemon, setRandomPokemon] = useState<
    RandomPokemonData[] | null
  >(null)

  const [userSelection, setUserSelection] = useState<string[]>([])

  const handleRandomPokemon = () => {
    setRandomPokemon(null)
    const pokemonSets = new Set<number>()
    const maxPokemon = allPokemons?.data?.results.length || 0

    // Generate 10 unique random Pokémon
    while (pokemonSets.size < 10) {
      const randomIndex = Math.floor(Math.random() * maxPokemon)
      pokemonSets.add(randomIndex)
    }

    const newPokemonList: RandomPokemonData[] = Array.from(pokemonSets)
      .map((index) => {
        const pokemon = allPokemons?.data?.results[index]
        const pokemonId = pokemon?.url?.split('/').filter(Boolean).pop()
        if (!pokemonId) {
          console.error('Invalid Pokémon URL:', pokemon?.url)
          return null
        }
        return {
          name: pokemon?.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`,
          id: uuidv4(),
        }
      })
      .filter(Boolean) as RandomPokemonData[]

    setRandomPokemon(newPokemonList)
  }

  const handleSelection = (selection: string) => {
    const isCurrentSelectionPresent = userSelection.includes(selection)
    if (gameOver) {
      return
    } else if (isCurrentSelectionPresent) {
      // Reset selections and end the game
      setUserSelection([])
      handleGameOver(true)
    } else {
      // Update scores and user selections
      const newScoreData: Scores = {
        currentScore: scores.currentScore + 1,
        bestScore: Math.max(scores.currentScore + 1, scores.bestScore),
      }
      handleScores(newScoreData)
      setUserSelection([...userSelection, selection])

      // Randomize Pokémon cards
      handleRandomPokemon()
    }
  }

  useEffect(() => {
    if (!allPokemons.loading && allPokemons.data?.results) {
      handleRandomPokemon()
    }
  }, [allPokemons.loading, allPokemons.data])

  if (allPokemons.loading) {
    return <Loading />
  }

  if (allPokemons.error) {
    return (
      <div className="pokemonCardSection">
        Error loading Pokemon: {allPokemons.error}
      </div>
    )
  }

  return (
    <div className="pokemonCardSection">
      <div className="pokemonGrid">
        {randomPokemon?.map((pokemon) => (
          <PokemonCard
            name={pokemon.name}
            image={pokemon.image}
            handleSelection={handleSelection}
            key={pokemon.id}
          />
        ))}
      </div>
    </div>
  )
}

export default PokemonList
