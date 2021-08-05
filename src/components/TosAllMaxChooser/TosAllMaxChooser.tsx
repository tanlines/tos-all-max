import React from 'react';
import styles from "../TosAllMaxChooser/TosAllMaxChooser.module.css";
import TosCategory from "../TosCategory/TosCategory";

type TosAllMaxChooserProps = {
    ownedCards: Array<number>
}


type TosAllMaxChooserState = {
    condensed: boolean
}

class TosAllMaxChooser extends React.Component<TosAllMaxChooserProps, TosAllMaxChooserState> {
    constructor(props: TosAllMaxChooserProps, context: any) {
        super(props, context);
        this.state = {
            condensed: false
        };
        this.updateCondensed = this.updateCondensed.bind(this);
    }

    render() {
        return (
            <>
                <div>
                    <label htmlFor="condensed">Condensed form</label>
                    <input type="checkbox" name="condensed" id='condensed-form' onChange={this.updateCondensed}/>
                </div>
                {this.renderCards()}
            </>
        );
    }
    
    updateCondensed(e: any) {
        if (e.target.checked === true) {
            this.setState({condensed: true});
        } else {
            this.setState({condensed: false});
        }
    }



    water() {
        return (
            <>
                <TosCategory element={"Water 水"} race={"Human 人類"} ids={[597,1041,1046,2259,2381,2268,2017,1482,1472,1447,1336,2273,1701,2274,2041]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
                <TosCategory element={"Water 水"} race={"Beast 獸類"} ids={[1406,1647,2129,1381,1922]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
                <TosCategory element={"Water 水"} race={"Elf 妖精類"} ids={[2217,1602,1191,2087,1537,2052,1612,1390]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
                <TosCategory element={"Water 水"} race={"Dragon 龍類"} ids={[1181,2181,1637,2306,2311,1066]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
                <TosCategory element={"Water 水"} race={"God 神族"} ids={[2481,1916,826,1822,2431,2496,2082,1311,1837,2001,1847,1375,1261,827]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
                <TosCategory element={"Water 水"} race={"Demon 魔族"} ids={[2551,1811,1351,2546,2566,1666,1327,1266,1126]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
                <TosCategory element={"Water 水"} race={"Machina 機械族"} ids={[1720,1366,2007]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
            </>
        );
    }

    fire() {
        return (
            <>
                <TosCategory element={"Fire 火"} race={"Human 人類"} ids={[2043,1457,1047,1474,2382,1484,1449,2275,2276,2182,599,2009]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
                <TosCategory element={"Fire 火"} race={"Beast 獸類"} ids={[2134,1391,1924,1407]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
                <TosCategory element={"Fire 火"} race={"Elf 妖精類"} ids={[1604,2219,2227,1614,1192]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
                <TosCategory element={"Fire 火"} race={"Dragon 龍類"} ids={[2603,1868,1383,1182,2312,2567]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
                <TosCategory element={"Fire 火"} race={"God 神族"} ids={[2497,1702,1262,816,2002,2083,1547,1706,1839,1539,2307,1042,2432,1376,2486,2482,1917,2313,2130,1849,1823,1337,817,1312]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
                <TosCategory element={"Fire 火"} race={"Demon 魔族"} ids={[2547,2552,1812,1267,2062,1328,2269,1639,2501,2054,1667,1127,1352]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
                <TosCategory element={"Fire 火"} race={"Machina 機械族"} ids={[1367,1721]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
            </>
        );
    }

    earth() {
        return (
            <>
                <TosCategory element={"Earth 木"} race={"Human 人類"} ids={[601,1043,1048,1451,1459,1476,2045,2261,2263,2383,2386]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
                <TosCategory element={"Earth 木"} race={"Beast 獸類"} ids={[1392,1408,1668,1926,1932,2183,2308,2483,2568]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
                <TosCategory element={"Earth 木"} race={"Elf 妖精類"} ids={[1869,2221,2056,1606,2571,2229,1193]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
                <TosCategory element={"Earth 木"} race={"Dragon 龍類"} ids={[1384,1068,1549,1183]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
                <TosCategory element={"Earth 木"} race={"God 神族"} ids={[824,825,1263,1313,1338,1377,1541,1707,1825,1841,2003,2084,2131,2135,2433,2487,1918]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
                <TosCategory element={"Earth 木"} race={"Demon 魔族"} ids={[1128,1268,1330,1353,1641,1813,2088,2498,2502,2548,2553]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
                <TosCategory element={"Earth 木"} race={"Machina 機械族"} ids={[2019,1368,1722,1703,2011]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
            </>
        );
    }

    light() {
        return (
            <>
                <TosCategory element={"Light 光"} race={"Human 人類"} ids={[603,1339,1453,1478,2013,2047,2089,2264,2265,2271,2277,2384,2484]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
                <TosCategory element={"Light 光"} race={"Beast 獸類"} ids={[1386,1409,1543,1649,1870,1928,1934,2569]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
                <TosCategory element={"Light 光"} race={"Elf 妖精類"} ids={[2223,2231,1608,1461,1194,1669,2064]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
                <TosCategory element={"Light 光"} race={"Dragon 龍類"} ids={[1643,1069,2309,1184,1393]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
                <TosCategory element={"Light 光"} race={"God 神族"} ids={[820,821,822,1044,1264,1269,1314,1378,1551,1704,1708,1827,1843,2004,2085,2132,2136,2184,2434,2499,2503,2572]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
                <TosCategory element={"Light 光"} race={"Demon 魔族"} ids={[1129,1332,1354,1486,1814,2058,2549,2554]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
                <TosCategory element={"Light 光"} race={"Machina 機械族"} ids={[1369,1723]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
            </>
        );
    }

    dark() {
        return (
            <>
                <TosCategory element={"Dark 暗"} race={"Human 人類"} ids={[2021,2388,2570,605,2272,2387,2266,2049]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
                <TosCategory element={"Dark 暗"} race={"Beast 獸類"} ids={[1930,1545,1936,2310,1410,1651]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
                <TosCategory element={"Dark 暗"} race={"Elf 妖精類"} ids={[1195,1480,1610,1616,2185,2225]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
                <TosCategory element={"Dark 暗"} race={"Dragon 龍類"} ids={[1645,1070,1185,1394]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
                <TosCategory element={"Dark 暗"} race={"God 神族"} ids={[818,819,823,1045,1265,1270,1315,1340,1379,1388,1705,1829,1845,1851,2005,2133,2385,2435,2485,2488]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
                <TosCategory element={"Dark 暗"} race={"Demon 魔族"} ids={[1130,1334,1355,1455,1670,1815,2060,2066,2086,2262,2500,2550,2555]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
                <TosCategory element={"Dark 暗"} race={"Machina 機械族"} ids={[2015,1370,2573,1724]} ownedCards={this.props.ownedCards} condensed={this.state.condensed}/>
            </>
        );
    }

    renderCards() {
        if (this.state.condensed) {
            return ( <>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            {this.water()}
                        </div>
                        <div className={styles.column}>
                            {this.fire()}
                        </div>
                        <div className={styles.column}>
                            {this.earth()}
                        </div>
                        <div className={styles.column}>
                            {this.light()}
                        </div>
                        <div className={styles.column}>
                            {this.dark()}
                        </div>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            {this.water()}
                            {this.fire()}
                            {this.earth()}
                        </div>
                        <div className={styles.column}>
                            {this.light()}
                            {this.dark()}
                        </div>
                    </div>
                </>
            )
        }
    }
}

export default TosAllMaxChooser;
