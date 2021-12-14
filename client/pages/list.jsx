import React from 'react';
import AddACard from '../components/add-a-card';
import SearchModal from '../components/search-modal';
import CardItem from '../components/card-item';

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
            <CardItem />
            <AddACard />
            <SearchModal />
        </div>
      </div>
    );
  }
}
