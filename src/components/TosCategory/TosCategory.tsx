import React from 'react';
import styles from './TosCategory.module.css';
import TosIcon from "../TosIcon/TosIcon";

type TosCategoryProps = {
    ids: Array<number>,
    ownedCards: Array<number>
}

class TosCategory extends React.Component<TosCategoryProps> {
    constructor(props: TosCategoryProps, context: any) {
        super(props, context);
    }
    render() {
        return (
            <div className={styles.TosCategory}>
            {
                this.props.ids.sort((a, b) => a - b).map((number) =>

                    <TosIcon id={number} owned={this.props.ownedCards.includes(number)}/>
                )
            }
            </div>
        );
    }
}

export default TosCategory;
