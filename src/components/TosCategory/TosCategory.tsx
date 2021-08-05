import React from 'react';
import styles from './TosCategory.module.css';
import TosIcon from "../TosIcon/TosIcon";
import { hasAnyEvo } from '../utils/Utils';

type TosCategoryProps = {
    element: string,
    race: string,
    ids: Array<number>,
    ownedCards: Array<number>,
    condensed: boolean
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

    startCounting() {
        this.finishedCounting = false;
        this.tempNum = 0;
    }


    finishCounting() {
        if (this.tempNum > 0) {
            this.finishedCounting = true;
        }
    }

    componentDidUpdate(prevProps: TosCategoryProps, prevState:TosCategoryState) {
        if (this.props.ownedCards.length !== prevProps.ownedCards.length) {
            this.setState({numOwnedInCategory: 0});
        }
    }

    render() {
        this.startCounting();
        this.props.ids.sort((a, b) => a - b).map((number) => {
                if (!this.finishedCounting && hasAnyEvo(number, this.props.ownedCards)) {
                    this.tempNum++;
                }
            }
        );
        this.finishCounting();
        const remainingCards: number = this.props.ids.length - (this.tempNum + this.state.numOwnedInCategory);
        if (this.props.condensed && (remainingCards > 5 || remainingCards <= 0 )) {
            return "";
        }
        return (
            <>
                <div className={styles.TosCategory}>
                <h4>{this.props.race} {this.tempNum + this.state.numOwnedInCategory}/{this.props.ids.length} {remainingCards <= 5 ? "✔️" : ""}</h4>
                {
                    this.props.ids.sort((a, b) => a - b).map((number) => {
                            return <TosIcon callback={this.iconCallback} forceNoShade={false}
                                     ownedCards={this.props.ownedCards} popup={true} id={number} condensed={this.props.condensed}/>
                        }
                    )
                }
                </div>
            </>
        );
    }
}

export default TosCategory;
