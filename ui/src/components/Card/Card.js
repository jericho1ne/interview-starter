import styles from './Card.module.scss'

const Card = (props) => {
  const teacherName = `${props.teacher.firstName} ${props.teacher.lastName}`
  const modality = props.style.modality.name
  const level = props.level.name
  const duration = `${props.duration} mins`

  let iconLevel = ''
  if (level === '1') iconLevel = '1'
  else if (level === '1-2' || level === '2') iconLevel = '2'
  else if (level === '2-3' || level === '3') iconLevel = '3'
  else if (level === '3-4' || level === '4') iconLevel = '4'

  return (
    <div className={styles.card} key={props.id}>

      {/* Thumbnail + Tags */}
      <div className={styles.card__header}>
        <img className={styles.card__image}
          src={props.video.posterImageSmall} 
          alt={teacherName}  />
    
        <span className={styles.card__modality}>{modality}</span>
    
        <div className={styles.card__meta}>
          <span className={styles.card__level}>
            <img src={`/icons/intensity-${iconLevel}-card.svg`} alt={`Level ${level}`} />
            <span>
              {level}
            </span>
          </span>
          <span className={styles.card__duration}>{duration}</span>
        </div>
      </div>
      
      <div className={styles.card__copyContainer}>
        <p className={styles.card__title}>{props.title}</p>
        <p className={styles.card__subtitle}>{props.style.name}</p>
        {/* <p className="class-card__content-subtitle">
          TEACHER <span>•</span> STYLE
        </p> */}
      </div>    
 
    </div>
  )// end return
} 

export default Card
