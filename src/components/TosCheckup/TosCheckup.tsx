import React from 'react';
import styles from './TosCheckup.module.css';
import TosCategory from "../TosCategory/TosCategory";

type CheckupProps = {
}
type CheckupState = {
    previousPlayerId: number,
    playerId: number,
    token: string
    cards: Array<number>
}

class TosCheckup extends React.Component<CheckupProps,CheckupState> {
    constructor(props: CheckupProps, context: any) {
        super(props, context);
        this.state = {
            previousPlayerId: 1,
            playerId: 1,
            token: "",
            cards: []
        }
        this.updateOwnedCards = this.updateOwnedCards.bind(this);
        this.updatePlayerId = this.updatePlayerId.bind(this);

    }

    componentDidMount() {
        this.load();
    }

    load() {
        fetch(`https://checkupapi.tosgame.com/user/login?token=&uid=52326271&aid=872594&labels={%22serviceType%22:%22tosCampaign%22}`)
            .then(res => res.json())
            .then(json => {
                this.setState({ token: json.token });
            });
    }

    componentDidUpdate() {
    }

    updatePlayerId(e: any) {
        this.setState({playerId: e.target.value})
    }

    updateOwnedCards() {
        if (this.state.token) {
            if (this.state.playerId !== this.state.previousPlayerId) {
                this.setState({previousPlayerId: this.state.playerId})
                fetch(
                    `https://checkupapi.tosgame.com/api/inventoryReview/getUserProfile?uid=${this.state.playerId}&includeInventory=true&token=${this.state.token}`)
                    .then(res => res.json())
                    .then(json => {
                        let tempArr: Array<number>;
                        tempArr = [];
                        if (json["isSuccess"] === 0) return;
                        json["cards"].map((obj: any) => {
                                tempArr.push(obj.id);
                            }
                        );
                        this.setState({cards: tempArr});
                    });
            }
        } else {
            this.load();
        }
    }

    render() {
        return (
            <div className={styles.TosIcon}>
                <label htmlFor="quantity">Player Id</label>
                <input type="number" name="quantity" id='player-id-input' onChange={this.updatePlayerId} min="1" max="99999999999"/>
                <button id="search" onClick={this.updateOwnedCards}>
                    Update owned cards
                </button>
                <div>
                    <TosCategory ids={[597,1041,1046,2259,2381,2268,2017,1482,1472,1447,1336,2273,1701,2274,2041]} ownedCards={this.state.cards}/>
                </div>
            </div>

        );
    }
}

export default TosCheckup;
