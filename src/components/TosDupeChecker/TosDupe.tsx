import React from 'react';
import TosIcon from "../TosIcon/TosIcon";
import {getEvolutionIds, getWikiImage} from '../utils/Utils';
import styles from "../TosDupeChecker/TosDupe.module.css";


type TosDupeProps = {
    ownedCards: Array<number>
}

class TosDupe extends React.Component<TosDupeProps> {
    seenSet:Array<number> = [];

    constructor(props: TosDupeProps, context: any) {
        super(props, context);
    }
    isVR(id:number) {
        let vrCards:Array<number> = [
            1022,1024,1026,1028,1030, //NORSE
            1082,1084,1086,1088,1090, //CHINESE
            1327,1329,1331,1333,1335, //CRIMSON GRACE
            1357,1359,1361,1363,1365, // GREEK
            1381,1383,1385,1387,1389, //EGYPTIAN
            2602,2604,2606,2608,2610, //DRAGON SPIRITOR
            1822,1824,1826,1828,1830, //BABYLON
            1189,1190 //XI
        ];
        var commonElements = getEvolutionIds(id).filter(function(e) {
            return vrCards.indexOf(e) > -1;
        });
        return commonElements.length > 0;
    }
    isDW(id:number) {
        let dwCards:Array<number> = [
            408,409,410,411,412, //PROTAG
            481,482,483,484,485, //NORN
            686,687,688,689,690, //PALADIN
            511,514,515,512,513, //BEAST
            1046,1047,1048, //ENCH
            791,793,795,797,799, //SEPUL
            1022,1024,1026,1028,1030, //NORSE
            1082,1084,1086,1088,1090, //CHINESE
            1327,1329,1331,1333,1335, //CRIMSON GRACE
            1357,1359,1361,1363,1365, //GREEK
            1381,1383,1385,1387,1389, //EGYPTIAN
            2602,2604,2606,2608,2610, //DRAGON SPIRITOR
            1822,1824,1826,1828,1830, //BABYLON
            2636,2637,2638,2639,2640,2641,2642, //CHRONOS GATE
            2660 //HIMIKO

        ];
        var commonElements = getEvolutionIds(id).filter(function(e) {
            return dwCards.indexOf(e) > -1;
        });
        return commonElements.length > 0;
    }
    dupeCount() {
        if (this.props.ownedCards.length === 0) {
            return (
                <>
                    No owned cards found
                </>
            )
        }
        let rows:Array<Object> = [];
        this.seenSet = [];
        this.props.ownedCards.sort(function(a, b) {
            return b-a;
        }).forEach((id:number) => {
            if (this.seenSet.includes(id)) {
                return;
            }
            let count:number = 0;
            getEvolutionIds(id).forEach((eid:number) => {
                let n:number = this.props.ownedCards.reduce(
                    function(n:number, val:number) {
                        return n + (val === eid ? 1 : 0);
                    }
                , 0);
                if (n > 0) this.seenSet.push(eid);
                count = count + n;
            });
            if (count > 1) {
                rows.push(
                    {
                        "row":
                            (
                            <div className={styles.container3}>
                            <a className={styles.container1}>
                                <img className={this.isVR(id) ? styles.image1 : styles.none} src="https://static.wikia.nocookie.net/towerofsaviors/images/5/50/EvoPlus.png"/>
                                <TosIcon id={id} ownedCards={this.props.ownedCards} popup={true} forceNoShade={true}
                                         callback={null} condensed={false}/>
                                <img className={this.isDW(id) ? styles.image2 : styles.none} src="https://static.wikia.nocookie.net/towerofsaviors/images/3/37/DC2006.png"/>
                            </a>
                            </div>
                            )
                            ,
                        "count": count
                    }
                )
            }
        });
        rows.sort((a:any,b:any) => { return (a.count > b.count) ? -1 : (b.count > a.count) ? 1 : 0;} );

        let rowss = rows.reduce(
            function(acc:any, val:any) {
                if (!acc[val.count]) {
                    acc[val.count] = [];
                }
                acc[val.count].push(val.row);
                return acc;
            }
            , []);
        let newrows:Array<Object> = [];
        for (let rowssKey in rowss) {
            newrows.push({
                    "count": rowssKey,
                    "row":
                        <>
                            <div>{rowssKey} dupes</div>
                            {rowss[rowssKey]}
                            <hr/>
                        </>
                }
            )
        }
        newrows.sort(function(a:any, b:any) {
            return b.count-a.count;
        });
        return (
            <>
                <div className={styles.TosDupe}>
                {

                    // rows.map((r:any) => r.row)
                    newrows.map((r:any) => r.row)
                }
                </div>
            </>
        )
    }

    render() {
        return (
            <>
                <div className={styles.TosDupee}>
                {
                    this.dupeCount()
                }
                </div>
            </>
        );
    }
}

export default TosDupe;
