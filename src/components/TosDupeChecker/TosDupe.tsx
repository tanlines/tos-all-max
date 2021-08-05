import React from 'react';
import TosIcon from "../TosIcon/TosIcon";
import {getEvolutionIds} from '../utils/Utils';
import styles from "../TosDupeChecker/TosDupe.module.css";

type TosDupeProps = {
    ownedCards: Array<number>
}

class TosDupe extends React.Component<TosDupeProps> {
    seenSet:Array<number> = [];

    constructor(props: TosDupeProps, context: any) {
        super(props, context);
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
                            <>
                                <TosIcon id={id} ownedCards={this.props.ownedCards} popup={true} forceNoShade={true}
                                         callback={null} condensed={false}/>
                            </>,
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
        newrows.sort((a:any,b:any) => { return (a.count > b.count) ? -1 : (b.count > a.count) ? 1 : 0;} );
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
