import React from 'react';
import AddACard from '../components/add-a-card';

export default class List extends React.Component {
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
            <AddACard />
        </div>
      </div>
    );
  }
}
