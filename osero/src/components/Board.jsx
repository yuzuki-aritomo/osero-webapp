import React from "react";
import Squere from "./Squere";

const NoPiece = 0;
const BlackPiece = 1;
const WhitePiece = 2;
const CanPiece = 3;

class Board extends React.Component {
    constructor(props){
        super(props);
        //boardの初期化と最初のコマの作成
        const squares = Array(8).fill(NoPiece);
        for(let i=0; i<8; i++){
            squares[i] = Array(8).fill(NoPiece);
        }
        squares[3][3] = WhitePiece;
        squares[4][4] = WhitePiece;
        squares[3][4] = BlackPiece;
        squares[4][3] = BlackPiece;
        this.state = {
            squares: squares,
        };
    }
    //盤面の横列の作成
    renderSquereLine(i){
        const Line = [];
        for(let j=0; j<8; j++){
            Line.push(<Squere key={ i+j } value={ this.state.squares[i][j] } onClick={ ()=>this.handleClick(i, j) } />)
        };
        return Line
    }
    //ピースクリック処理
    handleClick(i, j){
        if(!this.CheckPutPiece(i, j)){
            return
        }
        this.PutPiece(i, j, BlackPiece)
    }
    //コマを置けるかのチェック
    CheckPutPiece(i, j){
        const squares = this.state.squares.slice();
        if(squares[i][j] != NoPiece){
            return false
        }
        return true
    }
    //ピースを置いたときの処理
    PutPiece(i, j, PlayerPiece){
        const EnemyPiece = PlayerPiece == BlackPiece ? WhitePiece : BlackPiece
        const X = [ 0, 1, 1, 1, 0,-1,-1,-1];
        const Y = [-1,-1, 0, 1, 1, 1, 0,-1];
        console.log(i, j);
        const squares = this.state.squares.slice();
        //8方向の相手のコマを裏返す
        for(let k = 0; k<8; k++){
            if(squares[i+X[k]][j+Y[k]] == EnemyPiece){
                var x = i+X[k]
                var y = j+Y[k]
                var loop = 0
                while(squares[x][y] == EnemyPiece){
                    x += X[k]
                    y += Y[k]
                    loop += 1
                    if(squares[x][y] == PlayerPiece){
                        for(let l = 0; l<=loop; l++){
                            squares[i + X[k]*l][j + Y[k]*l] = PlayerPiece
                        }
                    }
                }
            }
        }
        this.setState({squares: squares});
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
            </div>
        );
    }
}

export default Board;