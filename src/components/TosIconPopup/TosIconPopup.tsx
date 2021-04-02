import React from 'react';
import styles from './TosIconPopup.module.css';
import TosIcon from "../TosIcon/TosIcon";

type TosIconProps = {
    ids: Array<number>,
    ownedCards: Array<number>
}
type TosIconState = {
    shaded: boolean
}

class TosIconPopup extends React.Component<TosIconProps,TosIconState> {
    constructor(props: TosIconProps, context: any) {
        super(props, context);
        this.state = {
            shaded: false
        }

        this.toggleShade = this.toggleShade.bind(this);
    }

    toggleShade() {
        this.setState({shaded: !this.state.shaded});
    }

    render() {
        return (

            <div>
                {
                    this.props.ids.sort((a, b) => a - b).map((number) =>
                        <TosIcon callback={null} preshade={this.props.ownedCards.includes(number)} popup={false} id={number} ownedCards={this.props.ownedCards} condensed={false}/>
                    )
                }
            </div>

        );
    }
}

export default TosIconPopup;
