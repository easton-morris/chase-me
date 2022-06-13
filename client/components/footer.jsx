import React from 'react';

export default class Footer extends React.Component {

  render() {
    return (
      <footer className="mb-5">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col">
              Original Content: &copy; 2022 Easton Morris
              <br />
              TCG Content: &copy; 2022 Pokémon. &copy; 1995 - 2022 Nintendo / Creatures Inc./ GAME FREAK inc.TM and character names are trademarks of Nintendo.
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
