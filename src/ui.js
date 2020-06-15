import React, { Component } from "react";
import { Button } from "reactstrap";

export default class UI extends Component {
  componentDidMount() {}

  render() {
    const { chooseNext, choosePrev, goBack, sel } = this.props;

    return (
      <div>
        {sel === null ? (
          <div>
            <Button
              variant="primary"
              style={{ position: "absolute", top: "50%", left: "2%" }}
              onClick={choosePrev}
            >
              {"<<"}
            </Button>
            <Button
              variant="primary"
              style={{ position: "absolute", top: "50%", right: "2%" }}
              onClick={chooseNext}
            >
              {">>"}
            </Button>
          </div>
        ) : (
          <Button
            variant="primary"
            style={{ position: "absolute", top: "2%", left: "2%" }}
            onClick={goBack }
          >
            {"<--"}
          </Button>
        )}
      </div>
    );
  }
}
