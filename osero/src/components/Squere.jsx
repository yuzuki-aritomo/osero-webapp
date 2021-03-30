import React from "react";

import styles from "./Board.module.css";

class Squere extends React.Component {
    render(){
        let peiceStyle;
        if(this.props.value === 0){
            peiceStyle = styles.buttonNormal
        }else if(this.props.value === 1){
            peiceStyle = styles.buttonBlack
        }else if(this.props.value === 2){
            peiceStyle = styles.buttonWhite
        }else if(this.props.value === 3){
            peiceStyle = styles.buttonCan
        }

        return(
            <button className={`${styles.button} ${peiceStyle}`} onClick={ ()=>this.props.onClick() }>
                { 
                    this.props.value
                }
            </button>
        )
    };
}

export default Squere;