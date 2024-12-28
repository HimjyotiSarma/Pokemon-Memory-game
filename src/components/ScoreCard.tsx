import { ScoresComponent } from '../utils/types'
import PokeLogo from '../assets/images/pokeLogo.png'
import '../styles/ScoreCard.scss'

const ScoreCard = ({ scores }: ScoresComponent) => {
  return (
    <div className="scoreCard">
      <img className="poke_logo" src={PokeLogo} alt="App logo" />
      <div className="score_record">
        <div className="currentScore">
          <span>Score: </span>
          {scores.currentScore}
        </div>
        <div className="bestScore">
          <span>Best Score: </span>
          {scores.bestScore}
        </div>
      </div>
    </div>
  )
}
export default ScoreCard
