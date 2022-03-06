import axios from 'axios'

import { Component } from 'react'
import Card from '../Card'
import classData from '../../_data/classes.json';

// import LocalContext from '../../context/LocalContext';
import styles from './ListView.module.scss'

export default class ListView extends Component {
  state = {
    currentItem: '',
    allItems: [],
  }

  async componentDidMount() { 
    // const getConfig = {
    //   method: 'GET',
    //   crossdomain: 'true',
    //   credentials: 'same-origin',
    //   mode: 'no-cors',
    // }

    // // Get data from CMS
    // axios.get('http://localhost:8888/classes', getConfig)
    //   .then(res => {
    //     const classesByTeacher = res.data.items;
    //     console.log(classesByTeacher)
    //     this.setState({ allItems: classesByTeacher })
    //   })
    this.setState({ allItems: classData.classes })
  }

  render() {
    const {allItems} = this.state

    return (
      // <LocalContext.Provider value={this.state.allItems}>
        <div>
          {allItems.map(({ 
            name: teacherName,
            classes
          }, i) => (

            <div className={styles.listView} key={`teacher-${i}`}>
              <div>
                <h3>{teacherName}</h3>
              </div>
              <div className={styles.listView__section}>
                {classes.map((classInfo) => {
                  return (
                    <Card {...classInfo} key={classInfo.id} />
                  )
                })}
              </div>

            </div>
            
          ))}
        
        </div>
      // </LocalContext.Provider>
    )// end Return
  } // end render

} // end ListView