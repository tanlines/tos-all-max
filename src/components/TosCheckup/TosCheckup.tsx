import React from 'react';
import styles from './TosCheckup.module.css';
import TosCategory from "../TosCategory/TosCategory";

type CheckupProps = {
}
type CheckupState = {
    previousPlayerId: number,
    playerId: number,
    token: string
    cards: Array<number>,
    errorString: string
}

class TosCheckup extends React.Component<CheckupProps,CheckupState> {
    constructor(props: CheckupProps, context: any) {
        super(props, context);
        this.state = {
            errorString: "Uninitialized",
            previousPlayerId: 1,
            playerId: 1,
            token: "",
            cards: []
        };
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
        this.setState({playerId: e.target.value})
    }

    updateOwnedCards() {
        if (this.state.token) {
            if (this.state.cards.length === 0 || this.state.playerId !== this.state.previousPlayerId) {
                this.setState({previousPlayerId: this.state.playerId})
                fetch(
                    `https://checkupapi.tosgame.com/api/inventoryReview/getUserProfile?uid=${this.state.playerId}&includeInventory=true&token=${this.state.token}`)
                    .then(res => res.json())
                    .then(json => {
                        let tempArr: Array<number>;
                        tempArr = [];
                        if (json["isSuccess"] === 0) {
                            this.setState({errorString: json.errorMessage});
                            return;
                        }
                        json["cards"].map((obj: any) =>
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

    render() {
        return (
            <div>
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
                <label htmlFor="quantity">Player Id (e.g. 29490729) </label>
                <input type="number" name="quantity" id='player-id-input' onChange={this.updatePlayerId} min="1" max="99999999999"/>
                <button id="search" onClick={this.updateOwnedCards}>
                    Update owned cards
                </button>
                <hr/>
                <div className={styles.row}>
                    <div className={styles.column}>
                    <TosCategory element={"Water"} race={"Human"} ids={[597,1041,1046,2259,2381,2268,2017,1482,1472,1447,1336,2273,1701,2274,2041]} ownedCards={this.state.cards}/>
                    <TosCategory element={"Water"} race={"Beast"} ids={[1406,1647,2129,1381,1922]} ownedCards={this.state.cards}/>
                    <TosCategory element={"Water"} race={"Elf"} ids={[2217,1602,1191,2087,1537,2052,1612,1390]} ownedCards={this.state.cards}/>
                    <TosCategory element={"Water"} race={"Dragon"} ids={[1181,2181,1637,2306,2311,1066]} ownedCards={this.state.cards}/>
                    <TosCategory element={"Water"} race={"God"} ids={[2481,1916,826,1822,2431,2496,2082,1311,1837,2001,1847,1375,1261,827]} ownedCards={this.state.cards}/>
                    <TosCategory element={"Water"} race={"Demon"} ids={[2551,1811,1351,2546,2566,1666,1327,1266,1126]} ownedCards={this.state.cards}/>
                    <TosCategory element={"Water"} race={"Machina"} ids={[1720,1366,2007]} ownedCards={this.state.cards}/>
                    <TosCategory element={"Fire"} race={"Human"} ids={[2043,1457,1047,1474,2382,1484,1449,2275,2276,2182,1367,2009]} ownedCards={this.state.cards}/>
                    <TosCategory element={"Fire"} race={"Beast"} ids={[2134,1391,1924,1407]} ownedCards={this.state.cards}/>
                    <TosCategory element={"Fire"} race={"Elf"} ids={[1604,2219,2227,1614,1192]} ownedCards={this.state.cards}/>
                    <TosCategory element={"Fire"} race={"Dragon"} ids={[2603,1868,1383,1182,2312,2567]} ownedCards={this.state.cards}/>
                    <TosCategory element={"Fire"} race={"God"} ids={[2497,1702,1262,816,2002,2083,1547,1706,1839,1539,2307,1042,2432,1376,2486,2482,1917,2313,2130,1849,1823,1337,817,1312]} ownedCards={this.state.cards}/>
                    <TosCategory element={"Fire"} race={"Demon"} ids={[2547,2552,1812,1267,2062,1328,2269,1639,2501,2054,1667,1127,1352]} ownedCards={this.state.cards}/>
                    <TosCategory element={"Fire"} race={"Machina"} ids={[1367,1721]} ownedCards={this.state.cards}/>
                    <TosCategory element={"Earth"} race={"Human"} ids={[601,1043,1048,1451,1459,1476,2045,2261,2263,2383,2386]} ownedCards={this.state.cards}/>
                    <TosCategory element={"Earth"} race={"Beast"} ids={[1392,1408,1668,1926,1932,2183,2308,2483,2568]} ownedCards={this.state.cards}/>
                    <TosCategory element={"Earth"} race={"Elf"} ids={[1869,2221,2056,1606,2571,2229,1193]} ownedCards={this.state.cards}/>
                    <TosCategory element={"Earth"} race={"Dragon"} ids={[1384,1068,1549,1183]} ownedCards={this.state.cards}/>
                    <TosCategory element={"Earth"} race={"God"} ids={[824,825,1263,1313,1338,1377,1541,1707,1825,1841,2003,2084,2131,2135,2433,2487,1918]} ownedCards={this.state.cards}/>
                    <TosCategory element={"Earth"} race={"Demon"} ids={[1128,1268,1330,1353,1641,1813,2088,2498,2502,2548,2553]} ownedCards={this.state.cards}/>
                    <TosCategory element={"Earth"} race={"Machina"} ids={[2019,1368,1722,1703,2011]} ownedCards={this.state.cards}/>
                    </div>

                    <div className={styles.column}>
                    <TosCategory element={"Light"} race={"Human"} ids={[603,1339,1453,1478,2013,2047,2089,2264,2265,2271,2277,2384,2484]} ownedCards={this.state.cards}/>
                    <TosCategory element={"Light"} race={"Beast"} ids={[1386,1409,1543,1649,1870,1928,1934,2569]} ownedCards={this.state.cards}/>
                    <TosCategory element={"Light"} race={"Elf"} ids={[2223,2231,1608,1461,1194,1669,2064]} ownedCards={this.state.cards}/>
                    <TosCategory element={"Light"} race={"Dragon"} ids={[1643,1069,2309,1184,1393]} ownedCards={this.state.cards}/>
                    <TosCategory element={"Light"} race={"God"} ids={[820,821,822,1044,1264,1269,1314,1378,1551,1704,1708,1827,1843,2004,2085,2132,2136,2184,2434,2499,2503,2572]} ownedCards={this.state.cards}/>
                    <TosCategory element={"Light"} race={"Demon"} ids={[1129,1332,1354,1486,1814,2058,2549,2554]} ownedCards={this.state.cards}/>
                    <TosCategory element={"Light"} race={"Machina"} ids={[1369,1723]} ownedCards={this.state.cards}/>
                    <TosCategory element={"Dark"} race={"Human"} ids={[2021,2388,2570,605,2272,2387,2266,2049]} ownedCards={this.state.cards}/>
                    <TosCategory element={"Dark"} race={"Beast"} ids={[1930,1545,1936,2310,1410,1651]} ownedCards={this.state.cards}/>
                    <TosCategory element={"Dark"} race={"Elf"} ids={[1195,1480,1610,1616,2185,2225]} ownedCards={this.state.cards}/>
                    <TosCategory element={"Dark"} race={"Dragon"} ids={[1645,1070,1185,1394]} ownedCards={this.state.cards}/>
                    <TosCategory element={"Dark"} race={"God"} ids={[818,819,823,1045,1265,1270,1315,1340,1379,1388,1705,1829,1845,1851,2005,2133,2385,2435,2485,2488]} ownedCards={this.state.cards}/>
                    <TosCategory element={"Dark"} race={"Demon"} ids={[1130,1334,1355,1455,1670,1815,2060,2066,2086,2262,2500,2550,2555]} ownedCards={this.state.cards}/>
                    <TosCategory element={"Dark"} race={"Machina"} ids={[2015,1370,2573,1724]} ownedCards={this.state.cards}/>
                    </div>
                </div>
            </div>

        );
    }
}

export default TosCheckup;
