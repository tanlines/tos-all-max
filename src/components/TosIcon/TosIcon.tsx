import React from 'react';
import styles from './TosIcon.module.css';

type TosIconProps = {
    id: number,
    owned: boolean
}
type TosIconState = {
    shaded: boolean
}

class TosIcon extends React.Component<TosIconProps,TosIconState> {
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

            <div className={styles.TosIcon}>
            <img className={this.props.owned || this.state.shaded ? styles.shaded : styles.normal} onClick={this.toggleShade} src={"https://tanlines.github.io/tos_tool_data/img/monster/" + this.props.id + ".png"} alt=""/>
            <a href={"https://tos.fandom.com/en/wiki/" + this.props.id}>{this.props.id}</a>
            </div>

        );
    }
}

export default TosIcon;
