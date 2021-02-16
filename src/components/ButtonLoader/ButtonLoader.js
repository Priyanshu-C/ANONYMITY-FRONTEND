import React, { Component } from "react";


export default class ButtonLoader extends Component {
  state = {
    loading: false
  };

  fetchData = () => {
    this.setState({ loading: true });

    //Faking API call here
    setTimeout(() => {
      this.setState({ loading: false });
    }, 4000);
  };

  render() {
    const { loading } = this.state;

    return (
   
        <button className="button" onClick={this.fetchData} disabled={loading}>
          {loading && (
            <i
              className="fa fa-refresh fa-spin"
              style={{ marginRight: "5px" }}
            />
          )}
          {loading && <span>Finding new match for you.</span>}
          {!loading && <span>Bored? Find new person here.</span>}
        </button>
     
    );
  }
}
