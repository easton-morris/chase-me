import React from 'react';
import AddACard from '../components/add-a-card';

export default class lists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: null
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <AddACard />
          </div>
        </div>
      </div>
    );
  }
}
