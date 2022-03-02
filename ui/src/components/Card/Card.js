import styles from './Card.module.scss'
import LocalContext from "../../context/LocalContext"
import legend from '../_data/legend.json'

const Card = (props) => {
  return (
    <LocalContext.Consumer>
      {context => (
        <div className={styles.fg}>
          <h3>{props.title}</h3>
          <p>{props.artist} - {props.performanceTitle}</p>
          <p>{props.youTubeUrl}</p>
        </div>  
      )}
    </LocalContext.Consumer>
    
  )// end Return

} 

export default Card
