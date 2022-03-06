import Header from './components/Header'
import ListView from './components/ListView'

import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.appContainer} >
      <Header title="Our classes"></Header>
      <div className={styles.appContainer__content}>
        <ListView />
      </div>
    </div>
  );
}

export default App;
