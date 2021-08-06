import React from 'react';
import styles from './TosIconPopup.module.css';
import TosIcon from "../TosIcon/TosIcon";
import {getEvolutionIds} from "../utils/Utils";

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
        };

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
                        (
                        <TosIcon callback={null} forceNoShade={false} popup={false} id={number} ownedCards={this.props.ownedCards} condensed={false}/>
                        )
                    )
                }
            </div>

        );
    }
}

export default TosIconPopup;
