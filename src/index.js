import React, { Component } from "react";
import ReactDOM from "react-dom";
import Scene from "./scene";
import UI from "./ui";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idx: 1,
      sel: null,

      total: 3
    };
  }

  componentDidMount() {}

  chooseNext = () => {
    var _idx = this.state.idx + 1;
    if (_idx > 3) {
      this.setState({ idx: 1 });
    } else {
      this.setState({ idx: _idx });
    }
  };

  choosePrev = () => {
    var _idx = this.state.idx - 1;
    if (_idx < 1) {
      this.setState({ idx: 3 });
    } else {
      this.setState({ idx: _idx });
    }
  };

  selNext = i => {
    this.setState({ sel: i });
  };

  goBack = () => {
    this.setState({ sel: null });
  };

  render() {
    return (
      <div>
        {/*<UI
          chooseNext={this.chooseNext}
          choosePrev={this.choosePrev}
          goBack={this.goBack}
          sel={this.state.sel}
        />*/}
        <Scene
          idx={this.state.idx}
          sel={this.state.sel}
          selNext={this.selNext}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
