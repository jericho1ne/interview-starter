import React from 'react';
import Header from './components/Header'
import ListView from './components/ListView'

import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.mainContainer} >
      <Header title="React starter"></Header>
      <div className="schemes">
        <ListView />
      </div>
    </div>
  );
}

export default App;
