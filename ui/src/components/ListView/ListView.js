import axios from 'axios'

import { Component, useState } from 'react'

import Card from '../Card'
// import LocalContext from '../../context/LocalContext';

import styles from './ListView.module.scss'

export default class ListView extends Component {
  state = {
    currentItem: '',
    allItems: [],
  }

  async componentDidMount() { 
    const getConfig = {
      method: 'GET',
      crossdomain: 'true',
      credentials: 'same-origin',
      mode: 'no-cors',
    }

    // Get data from CMS
    axios.get('http://localhost:8888/videos', getConfig)
      .then(res => {
        const items = res.data.items;
        console.log(items)

        this.setState({ allItems: items })
      })
  }

  selectCard = (cardId) => {
    this.setState({ 
      currentItem: cardId,
      currentItemDetails: {},
    })
  } 

  render() {
    const {allItems} = this.state

    return (
      // <LocalContext.Provider value={this.state.allItems}>
        <div className={styles.switcher} >
          <div className={styles.switcher__nav}>
            {allItems.map((item, i) => (
              <Card  
                key={`${item.sys.id}-${i}`}
                {...item.fields}
                onClick={() => this.selectCard(item.sys.id)} 
              />
            ))}
          </div>
        </div>
      // </LocalContext.Provider>
    )// end Return
  } // end render

} // end ListView