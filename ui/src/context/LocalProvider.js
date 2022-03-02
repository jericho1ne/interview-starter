import LocalContext from 'LocalContext';

class LocalProvider extends Component {
  state = {
    allItems: {},
  }

  render() {
    return (
      <LocalContext.Provider 
        value={this.state.allItems}
      >
        {this.props.children}
      </LocalContext.Provider>
    )
  }
}

export default LocalProvider;