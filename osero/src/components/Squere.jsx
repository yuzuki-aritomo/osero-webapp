import React from "react";
import styles from "./Board.module.css";

const NoPiece = 0;
const BlackPiece = 1;
const WhitePiece = 2;
const CanPutPiece = 3;

class Squere extends React.Component {
    render(){
        let pieceStyle = styles.pieceNone
        if(this.props.value === NoPiece){
            pieceStyle = styles.pieceNone
        }else if(this.props.value === BlackPiece){
            pieceStyle = styles.pieceBlack
        }else if(this.props.value === WhitePiece){
            pieceStyle = styles.pieceWhite
        }else if(this.props.value === CanPutPiece){
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