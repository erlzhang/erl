// Context.js
import React from "react"

const defaultContextValue = {
  data: {
    // set your initial data shape here
    showSummary: false,
  },
  set: () => {},
}

const { Provider, Consumer } = React.createContext(defaultContextValue)

class ContextProviderComponent extends React.Component {
  constructor() {
    super()

    this.setData = this.setData.bind(this)
    this.state = {
      ...defaultContextValue,
      set: this.setData,
      inited: false
    }
  }

  componentDidMount() {
    if (this.state.inited) {
      return;
    }

    if (window.innerWidth > 800) {
      this.setData({
        showSummary: true
      });
    }
    this.setState({ inited: true });
  }

  setData(newData) {
    this.setState(state => ({
      data: {
        ...state.data,
        ...newData,
      },
    }))
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}

export { Consumer as default, ContextProviderComponent }
