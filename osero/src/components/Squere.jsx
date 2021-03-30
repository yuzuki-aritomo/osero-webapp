import React from "react";

import styles from "./Board.module.css";

class Squere extends React.Component {
    render(){
        let pieceStyle = styles.pieceNone
        if(this.props.value === 0){
            pieceStyle = styles.pieceNone
        }else if(this.props.value === 1){
            pieceStyle = styles.pieceBlack
        }else if(this.props.value === 2){
            pieceStyle = styles.pieceWhite
        }else if(this.props.value === 3){
            pieceStyle = styles.pieceCanPut
        }
        return(
            <div className={`${styles.SquereButton}`} onClick={ ()=>this.props.onClick() }>
                <div className={`${ pieceStyle }`}></div>
            </div>
        )
    };
}

export default Squere;