import { PokemonCardType } from '../utils/types'
import '../styles/PokemonCard.scss'
import { motion } from 'motion/react'

const PokemonCard = ({ name, image, handleSelection }: PokemonCardType) => {
  return (
    <motion.div
      animate={{ rotateY: 360, transition: { duration: 1 } }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.2 },
        boxShadow: 'none',
      }}
      whileHover={{ scale: 1.05 }}
      className="pokeCard"
      onClick={() => handleSelection(name)}
    >
      <img
        src={image}
        alt={name}
        className="w-full h-auto"
        onError={(e) => {
          e.currentTarget.onerror = null
          e.currentTarget.src =
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png'
        }}
      />
    </motion.div>
  )
}
export default PokemonCard
