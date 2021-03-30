import React from "react";
import styles from "./Board.module.css";

const BlackPiece = 1;

class BoardTopBar extends React.Component {
    render(){
        const player = this.props.PlayerPiece===BlackPiece ? 'Black' : 'White'
        return(
            <div className={ styles.Bar }>
                <div>Black : { this.props.CountPiece.Black }</div>
                <div>White : { this.props.CountPiece.White }</div>
                <div>Player : { player }</div>
            </div>
        )
    };
}

export default BoardTopBar;