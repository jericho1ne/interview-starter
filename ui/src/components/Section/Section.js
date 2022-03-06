import styles from './Section.module.scss'
import Card from '../Card'

const Section = (props) => {
  return (
    <div className={styles.teacherSection} key={`teacher-${props.index}`}>
      <p>{props}</p>
      <h2>{props.name}</h2>
        {/* <Card /> */}
    </div>
    
  )// end return
} 

export default Section
