import { GameOverComponent } from '../utils/types'
import '../styles/GameOver.scss'
import { motion } from 'motion/react'

const GameOver = ({ scores, restart }: GameOverComponent) => {
  return (
    <div className="gameOver_overlay">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, transition: { duration: 1 } }}
        exit={{ scale: 0 }}
        className="gameOver_popup"
      >
        <h1>Game Over</h1>
        <div className="scores_board">
          <div className="score_card">
            <h3>Current Score</h3>
            <h2>{scores.currentScore}</h2>
          </div>
          <div className="score_card">
            <h3>Best Score</h3>
            <h2>{scores.bestScore}</h2>
          </div>
        </div>
        <button onClick={() => restart(true)}>TRY AGAIN</button>
      </motion.div>
    </div>
  )
}
export default GameOver
