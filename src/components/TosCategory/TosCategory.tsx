import React from 'react';
import styles from './TosCategory.module.css';
import TosIcon from "../TosIcon/TosIcon";
import {hasAnyEvo} from "../../App";

type TosCategoryProps = {
    element: string,
    race: string,
    ids: Array<number>,
    ownedCards: Array<number>
}

type TosCategoryState = {
    numOwnedInCategory: number;
}

class TosCategory extends React.Component<TosCategoryProps, TosCategoryState> {
    finishedCounting = false;
    tempNum = 0;
    constructor(props: TosCategoryProps, context: any) {
        super(props, context);
        this.state = {
            numOwnedInCategory: 0
        };


        this.iconCallback = this.iconCallback.bind(this);
    }

    iconCallback(shaded: boolean) {
        this.setState({numOwnedInCategory: this.state.numOwnedInCategory + (shaded ? -1 : +1)});
    }

    finishCounting() {
        if (this.tempNum > 0) {
            this.finishedCounting = true;
        }
    }

    render() {
        return (
            <>
                <div className={styles.TosCategory}>
                <h4>{this.props.race} owned {this.tempNum + this.state.numOwnedInCategory}/{this.props.ids.length}</h4>

                {
                    this.props.ids.sort((a, b) => a - b).map((number) => {
                            let preshad: boolean;
                            preshad = hasAnyEvo(number, this.props.ownedCards);
                            if (!this.finishedCounting && preshad) {
                                this.tempNum++;
                            }
                            return <TosIcon callback={this.iconCallback} preshade={preshad}
                                     ownedCards={this.props.ownedCards} popup={true} id={number}/>
                        }
                    )
                }
                {
                    this.finishCounting()
                }
                </div>
            </>
        );
    }
}

export default TosCategory;
