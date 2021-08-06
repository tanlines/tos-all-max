import React from 'react';
import styles from './TosIcon.module.css';
import TosIconPopup from "../TosIconPopup/TosIconPopup";
import {getEvolutionIds, getWikiImage, hasAnyEvo} from "../utils/Utils";

type TosIconProps = {
    id: number,
    ownedCards: Array<number>
    popup: boolean
    forceNoShade: boolean
    callback: any,
    condensed: boolean
}
type TosIconState = {
    shaded: boolean,
    hasAnyEvo: boolean,
    errored: boolean,
    src: string
}

class TosIcon extends React.Component<TosIconProps,TosIconState> {
    constructor(props: TosIconProps, context: any) {
        super(props, context);
        this.state = {
            shaded: this.props.ownedCards.includes(this.props.id),
            hasAnyEvo: false,
            errored: false,
            src: getWikiImage(this.props.id)
        };

        this.toggleShade = this.toggleShade.bind(this);
    }


    onError = () => {
        if (!this.state.errored) {
            this.setState({
                src: "https://web-assets.tosconfig.com/gallery/icons/1883.jpg",
                errored: true,
            });
        }
    };

    componentDidUpdate(prevProps: TosIconProps, prevState:TosIconState) {
        if (this.props.ownedCards.length !== prevProps.ownedCards.length) {
            this.setState({shaded: false});
            this.setState({src: getWikiImage(this.props.id)});
        }
    }

    toggleShade() {
        if (!this.props.forceNoShade && this.props.popup && !hasAnyEvo(this.props.id,this.props.ownedCards)) {
            this.setState({shaded: !this.state.shaded});
            this.props.callback(this.state.shaded);
        }
    }

    isShaded() {
        if (this.props.forceNoShade) return false;
        return this.state.shaded || (this.props.ownedCards.includes(this.props.id)) ||
            (this.props.popup && hasAnyEvo(this.props.id, this.props.ownedCards))
            ;
    }

    render() {
        if (this.props.condensed && this.isShaded()) {
            return "";
        }
        return (
            <div className={styles.popup}>
                <div className={styles.TosIcon}>
                    <img className={this.isShaded() ? styles.shaded : styles.normal} onClick={this.toggleShade} src={this.state.src} alt="" onError={this.onError}/>
                    <div className={styles.background}>

                    </div>
                    <div className={styles.monsterId}>
                    <a target="_blank" href={"https://tos.fandom.com/en/wiki/" + this.props.id}>{this.props.id}</a>
                    <a target="_blank" href={"https://tos.fandom.com/zh/wiki/" + this.props.id}> zh</a>
                    </div>
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
