import React from 'react'
import { motion, useViewportScroll } from "framer-motion"

import styles from './Header.module.scss'

export default function Header({ title }) {
  const { scrollY } = useViewportScroll()

  const [hidden, setHidden] = React.useState(false);


  function update() {
    if (scrollY?.current < scrollY?.prev) {
      setHidden(false)
      console.log("visible")
    } else if (scrollY?.current > 100 && scrollY?.current > scrollY?.prev) {
      setHidden(true)
      console.log("hidden")
    }
  }

  React.useEffect(() => {
    return scrollY.onChange(() => update());
  })

  const smooth = {
    ease: [.1, .25, .3, .85], 
    duration: 0.85
  }

  const sharp = {
    duration: 0.35,
    type: 'spring',
    damping: 80,
    stiffness: 800,
  }
  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -64 },
    transition: smooth,
    exit: {
      opacity: 0,
      y: 0,
      transition: smooth
    }
  }

  // Fire events whenever the scrollY position changes
  React.useEffect(() => {
    return scrollY.onChange(() => console.log(scrollY));
  })

  return (
    <motion.nav className={styles.header}
      variants={variants}
      animate={hidden ? "hidden" : "visible"}
      transition={sharp}
    >
      <div>
        <img className={styles.header__logo} src="/logo.svg" alt="App logo" />
        {/* <h2 className={styles.header__title}>{title}</h2> */}
      </div>
    </motion.nav>
  )
}
