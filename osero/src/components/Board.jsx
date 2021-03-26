import React from "react";
import Squere from "./Squere";

class Board extends React.Component {
    constructor(props){
        super(props);
        //boardの初期化
        const squares = Array(9).fill(0);
        for(let i=0; i<9; i++){
            squares[i] = Array(9).fill(0)
        }
        this.state = {
            squares: squares,
        };
    }
    //盤面の横列の作成
    renderSquereLine(i){
        const Line = [];
        for(let j=0; j<9; j++){
            Line.push(<Squere key={ i+j } value={ this.state.squares[i][j] } onClick={ ()=>this.handleClick(i, j) } />)
        };
        return Line
    }
    //ボタンクリック処理
    handleClick(i, j){
        console.log(i, j);
    }
    render(){
        return(
            <div>
                <div>{ this.renderSquereLine(0) }</div>
                <div>{ this.renderSquereLine(1) }</div>
                <div>{ this.renderSquereLine(2) }</div>
                <div>{ this.renderSquereLine(3) }</div>
                <div>{ this.renderSquereLine(4) }</div>
                <div>{ this.renderSquereLine(5) }</div>
                <div>{ this.renderSquereLine(6) }</div>
                <div>{ this.renderSquereLine(7) }</div>
                <div>{ this.renderSquereLine(8) }</div>
            </div>
        );
    }
}

export default Board;