import React from 'react';

export default class SearchModal extends React.Component {
  constructor(props) {
    super(props);

    this.SearchDatalist = this.SearchDatalist.bind(this);
    this.SearchModalItem = this.SearchModalItem.bind(this);
    this.SearchResultsBody = this.SearchResultsBody.bind(this);
    this.DatalistItem = this.DatalistItem.bind(this);

    this.state = {
      pokeList: [
        {
          id: 'swsh4-26',
          name: 'Charizards',
          supertype: 'Pokémon',
          subtypes: [
            'Stage 2'
          ],
          hp: '170',
          types: [
            'Fire'
          ],
          evolvesFrom: 'Charmeleon',
          abilities: [
            {
              name: 'Battle Sense',
              text: 'Once during your turn, you may look at the top 3 cards of your deck and put 1 of them into your hand. Discard the other cards.',
              type: 'Ability'
            }
          ],
          attacks: [
            {
              name: 'Royal Blaze',
              cost: [
                'Fire',
                'Fire'
              ],
              convertedEnergyCost: 2,
              damage: '100+',
              text: 'This attack does 50 more damage for each Leon card in your discard pile.'
            }
          ],
          weaknesses: [
            {
              type: 'Water',
              value: '×2'
            }
          ],
          retreatCost: [
            'Colorless',
            'Colorless',
            'Colorless'
          ],
          convertedRetreatCost: 3,
          set: {
            id: 'swsh4',
            name: 'Vivid Voltage',
            series: 'Sword & Shield',
            printedTotal: 185,
            total: 203,
            legalities: {
              unlimited: 'Legal',
              standard: 'Legal',
              expanded: 'Legal'
            },
            ptcgoCode: 'VIV',
            releaseDate: '2020/11/13',
            updatedAt: '2020/11/13 16:20:00',
            images: {
              symbol: 'https://images.pokemontcg.io/swsh4/symbol.png',
              logo: 'https://images.pokemontcg.io/swsh4/logo.png'
            }
          },
          number: '25',
          artist: 'Ryuta Fuse',
          rarity: 'Rare',
          flavorText: 'It spits fire that is hot enough to melt boulders. It may cause forest fires by blowing flames.',
          nationalPokedexNumbers: [
            6
          ],
          legalities: {
            unlimited: 'Legal',
            standard: 'Legal',
            expanded: 'Legal'
          },
          images: {
            small: 'https://images.pokemontcg.io/swsh4/25.png',
            large: 'https://images.pokemontcg.io/swsh4/25_hires.png'
          },
          tcgplayer: {
            url: 'https://prices.pokemontcg.io/tcgplayer/swsh4-25',
            updatedAt: '2021/08/04',
            prices: {
              normal: {
                low: 1.73,
                mid: 3.54,
                high: 12.99,
                market: 2.82,
                directLow: 3.93
              },
              reverseHolofoil: {
                low: 3,
                mid: 8.99,
                high: 100,
                market: 3.89,
                directLow: 4.46
              }
            }
          },
          cardmarket: {
            url: 'https://prices.pokemontcg.io/cardmarket/swsh4-25',
            updatedAt: '2021/08/04',
            prices: {
              averageSellPrice: 9.38,
              lowPrice: 8.95,
              trendPrice: 10.29,
              germanProLow: null,
              suggestedPrice: null,
              reverseHoloSell: null,
              reverseHoloLow: null,
              reverseHoloTrend: null,
              lowPriceExPlus: 8.95,
              avg1: 9.95,
              avg7: 9.35,
              avg30: 11.31,
              reverseHoloAvg1: null,
              reverseHoloAvg7: null,
              reverseHoloAvg30: null
            }
          }
        },
        {
          id: 'swsh4-25',
          name: 'Charizard',
          supertype: 'Pokémon',
          subtypes: [
            'Stage 2'
          ],
          hp: '170',
          types: [
            'Fire'
          ],
          evolvesFrom: 'Charmeleon',
          abilities: [
            {
              name: 'Battle Sense',
              text: 'Once during your turn, you may look at the top 3 cards of your deck and put 1 of them into your hand. Discard the other cards.',
              type: 'Ability'
            }
          ],
          attacks: [
            {
              name: 'Royal Blaze',
              cost: [
                'Fire',
                'Fire'
              ],
              convertedEnergyCost: 2,
              damage: '100+',
              text: 'This attack does 50 more damage for each Leon card in your discard pile.'
            }
          ],
          weaknesses: [
            {
              type: 'Water',
              value: '×2'
            }
          ],
          retreatCost: [
            'Colorless',
            'Colorless',
            'Colorless'
          ],
          convertedRetreatCost: 3,
          set: {
            id: 'swsh4',
            name: 'Vivid Voltage',
            series: 'Sword & Shield',
            printedTotal: 185,
            total: 203,
            legalities: {
              unlimited: 'Legal',
              standard: 'Legal',
              expanded: 'Legal'
            },
            ptcgoCode: 'VIV',
            releaseDate: '2020/11/13',
            updatedAt: '2020/11/13 16:20:00',
            images: {
              symbol: 'https://images.pokemontcg.io/swsh4/symbol.png',
              logo: 'https://images.pokemontcg.io/swsh4/logo.png'
            }
          },
          number: '25',
          artist: 'Ryuta Fuse',
          rarity: 'Rare',
          flavorText: 'It spits fire that is hot enough to melt boulders. It may cause forest fires by blowing flames.',
          nationalPokedexNumbers: [
            6
          ],
          legalities: {
            unlimited: 'Legal',
            standard: 'Legal',
            expanded: 'Legal'
          },
          images: {
            small: 'https://images.pokemontcg.io/swsh4/25.png',
            large: 'https://images.pokemontcg.io/swsh4/25_hires.png'
          },
          tcgplayer: {
            url: 'https://prices.pokemontcg.io/tcgplayer/swsh4-25',
            updatedAt: '2021/08/04',
            prices: {
              normal: {
                low: 1.73,
                mid: 3.54,
                high: 12.99,
                market: 2.82,
                directLow: 3.93
              },
              reverseHolofoil: {
                low: 3,
                mid: 8.99,
                high: 100,
                market: 3.89,
                directLow: 4.46
              }
            }
          },
          cardmarket: {
            url: 'https://prices.pokemontcg.io/cardmarket/swsh4-25',
            updatedAt: '2021/08/04',
            prices: {
              averageSellPrice: 9.38,
              lowPrice: 8.95,
              trendPrice: 10.29,
              germanProLow: null,
              suggestedPrice: null,
              reverseHoloSell: null,
              reverseHoloLow: null,
              reverseHoloTrend: null,
              lowPriceExPlus: 8.95,
              avg1: 9.95,
              avg7: 9.35,
              avg30: 11.31,
              reverseHoloAvg1: null,
              reverseHoloAvg7: null,
              reverseHoloAvg30: null
            }
          }
        }
      ]
    };

  }

  DatalistItem(props) {
    return <option value={this.props.value}></option>;
  }

  SearchModalItem(props) {
    return (
      <tr>
        <th scope="row">{props.value.id}</th>
        <td>{props.value.set.name}</td>
        <td>{props.value.name}</td>
      </tr>
    );
  }

  SearchDatalist() {
    const pokeList = this.state.pokeList;
    const listItems = pokeList.map(pokeCard =>
      <this.DatalistItem key={pokeCard.id} value={pokeCard.name} />
    );
    return (
      <datalist id="pokeList">
        {listItems}
      </datalist>
    );
  }

  SearchResultsBody() {
    const pokeList = this.state.pokeList;
    const listItems = pokeList.map(pokeCard =>
      <this.SearchModalItem key={pokeCard.id} value={pokeCard} />
    );
    return (
      <tbody>
        {listItems}
      </tbody>
    );
  }

  componentDidMount() {

  }

  addCardHandler() {

  }

  onSearchChangeHandler() {

  }

  render() {
    return (
      <>
      <div className="modal fade" id="searchModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="searchModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title" id="searchModalLabel">Find a Card</h2>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="search-header">
                <div className="search-text">
                  <h4>Search by Name</h4>
                  <div className="search-area">
                    <label htmlFor="cardSearch" className="form-label">Card Search</label>
                    <input className="form-control" list="pokeList" id="cardSearch" placeholder="Jolteon"/>
                    <this.SearchDatalist />
                  </div>
                </div>
              </div>
              <div className="results-table">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Set</th>
                      <th scope="col">Card Name</th>
                    </tr>
                  </thead>
                  <this.SearchResultsBody />
                </table>
              </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Add Card</button>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }
}
