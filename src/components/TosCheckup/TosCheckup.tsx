import React from 'react';
import TosIcon from "../TosIcon/TosIcon";
import TosDupe from "../TosDupeChecker/TosDupe";
import TosAllMaxChooser from "../TosAllMaxChooser/TosAllMaxChooser";
type CheckupProps = {
}
type CheckupState = {
    previousPlayerId: number,
    playerId: number,
    token: string
    cards: Array<number>,
    errorString: string,
    screen: number
}

class TosCheckup extends React.Component<CheckupProps,CheckupState> {
    constructor(props: CheckupProps, context: any) {
        super(props, context);
        this.state = {
            errorString: "Uninitialized",
            previousPlayerId: 1,
            playerId: 1,
            token: "",
            cards: [],
            screen: 0
        };
        this.updateOwnedCards = this.updateOwnedCards.bind(this);
        this.updatePlayerId = this.updatePlayerId.bind(this);
        this.updateScreen = this.updateScreen.bind(this);
    }

    componentDidMount() {
        this.load();
    }

    load() {
        fetch(`https://website-api.tosgame.com/api/checkup/login?token=&uid=52326271&auth=594611`, {
                method: 'post'
            }
        )
            .then(res => res.json())
            .then(json => {
                if (json["isError"] === true) {
                    this.setState({errorString: json.message});
                    return;
                }
                this.setState({ token: json.token });
                if (this.state.token) {
                    this.setState({errorString: "Ready to search user cards"});
                } else {
                    this.setState({errorString: json.errorMessage});
                }
            });
    }

    componentDidUpdate() {
    }

    updatePlayerId(e: any) {
        this.setState({playerId: e.target.value});
    }

    updateOwnedCards() {
        if (this.state.token) {
            if (this.state.cards.length === 0 || this.state.playerId !== this.state.previousPlayerId) {
                this.setState({previousPlayerId: this.state.playerId})
                fetch(
                    `https://website-api.tosgame.com/api/checkup/getUserProfile?targetUid=${this.state.playerId}&token=${this.state.token}`)
                    .then(res => res.json())
                    .then(json => {
                        let tempArr: Array<number>;
                        tempArr = [];
                        if (json["isError"] === true) {
                            this.setState({errorString: json.message});
                            return;
                        }
                        json["userData"]["cards"].map((obj: any) =>
                            {
                                tempArr.push(obj.id);
                                return obj;
                            }
                        );
                        this.setState({cards: tempArr});
                        this.setState({errorString: "Owned cards found"});
                    });
            }
        } else {
            this.load();
        }
    }

    updateScreen(e: any) {
        this.setState({screen: e});
    }

    getScreen() {
        if (this.state.screen === 0) {
            return <TosAllMaxChooser ownedCards={this.state.cards}/>
        } else {
            return <TosDupe ownedCards={this.state.cards}/>
        }
    }

    render() {
        return (
            <div>

                <div>
                    <TosIcon callback={null} forceNoShade={false}
                             ownedCards={[]} popup={false} id={10117} condensed={false}/>
                    <TosIcon callback={null} forceNoShade={false}
                             ownedCards={[]} popup={false} id={2661} condensed={false}/>
                    <TosIcon callback={null} forceNoShade={false}
                             ownedCards={[]} popup={false} id={2690} condensed={false}/>
                </div>

                <div>
                    UID 29490729 Add me :)
                </div>

                <h5>
                    Instructions
                    <br/>
                    1. Login to <a href={"https://checkup.tosgame.com/"}>https://checkup.tosgame.com/</a>.
                    <br/>
                    2. Tick the 公開背包 (公開後方可接受健檢) box to set profile to public.
                    <br/>
                    3. Click the 發送 button to update your profile.
                    <br/>
                    4. Enter player ID below and click "Update owned cards"
                </h5>
                <h4>
                    {this.state.errorString}
                </h4>
                <div>
                    <label htmlFor="quantity">Player Id / 你的UID (e.g. 29490729) </label>
                    <input type="number" name="quantity" id='player-id-input' onChange={this.updatePlayerId} min="1" max="99999999999"/>
                    <button id="search" onClick={this.updateOwnedCards}>
                        Update owned cards
                    </button>
                </div>
                <br/>


                {/*<div><a href="https://forum.gamer.com.tw/C.php?bsn=23805&snA=647826&tnum=18">Bahamut discussion / 巴哈討論串</a></div>*/}
                {/*<div><a href="https://www.youtube.com/watch?v=9D2jtT9jVUg">ToS Youtube video</a></div>*/}

                <div className="radio">
                    <form>
                    <label>
                        <input
                            type="radio"
                            checked={this.state.screen === 0}
                            onChange={this.updateScreen.bind(this,0)}
                        />
                        All max chooser
                    </label>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <label>
                        <input
                            type="radio"
                            checked={this.state.screen === 1}
                            onChange={this.updateScreen.bind(this,1)}
                        />
                        Dupe counter
                    </label>
                    </form>
                </div>
                <hr/>

                {/*{<TosDupe ownedCards={this.state.cards}/>}*/}
                {/*{<TosAllMaxChooser ownedCards={this.state.cards}/>}*/}
                {/*{this.renderCards()}*/}
                {this.getScreen()}
                <hr/>
                {/*<br />*/}
                {/*<div><a style={{ fontSize: "14px"}} href="https://www.buymeacoffee.com/nombmac/tos-all-max-tool">Donate</a></div>*/}
            </div>

        );
    }
}

export default TosCheckup;
