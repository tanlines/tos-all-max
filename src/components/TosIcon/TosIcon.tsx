import React from 'react';
import styles from './TosIcon.module.css';
import TosIconPopup from "../TosIconPopup/TosIconPopup";
import {getEvolutionIds, hasAnyEvo } from '../../App';

type TosIconProps = {
    id: number,
    ownedCards: Array<number>
    popup: boolean
    preshade: boolean
    callback: any
}
type TosIconState = {
    shaded: boolean,
    hasAnyEvo: boolean
}

class TosIcon extends React.Component<TosIconProps,TosIconState> {
    constructor(props: TosIconProps, context: any) {
        super(props, context);
        this.state = {
            shaded: this.props.ownedCards.includes(this.props.id),
            hasAnyEvo: false
        };

        this.toggleShade = this.toggleShade.bind(this);
    }

    toggleShade() {
        if (!this.props.preshade && this.props.popup && !hasAnyEvo(this.props.id,this.props.ownedCards)) {
            this.setState({shaded: !this.state.shaded});
            this.props.callback(this.state.shaded);
        }
    }

    isShaded() {
        return this.props.preshade || this.state.shaded || (this.props.popup && hasAnyEvo(this.props.id,this.props.ownedCards));
    }

    render() {
        return (
            <div className={styles.popup}>
                <div className={styles.TosIcon}>
                    <img className={this.isShaded() ? styles.shaded : styles.normal} onClick={this.toggleShade} src={"https://tanlines.github.io/tos_tool_data/img/monster/" + this.props.id + ".png"} alt=""/>
                    <a href={"https://tos.fandom.com/en/wiki/" + this.props.id}>{this.props.id}</a>
                </div>
                <span className={styles.popuptext}>
                {
                    this.props.popup &&
                    <TosIconPopup ids={getEvolutionIds(this.props.id)} ownedCards={this.props.ownedCards}/>
                }
                </span>
            </div>


        );
    }
}

export default TosIcon;
