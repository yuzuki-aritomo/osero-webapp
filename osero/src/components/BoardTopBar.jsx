import React from "react";
import styles from "./Board.module.css";

const BlackPiece = 1;

class BoardTopBar extends React.Component {
    render(){
        const player = this.props.PlayerPiece===BlackPiece ? 'Black' : 'White'
        return(
            <div className={ styles.Bar }>
                <div>Black : { this.props.CountBlack }</div>
                <div>White : { this.props.CountWhite }</div>
                <div>Player : { player }</div>
            </div>
        )
    };
}

export default BoardTopBar;