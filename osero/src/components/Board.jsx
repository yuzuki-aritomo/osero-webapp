import React from "react";
import Squere from "./Squere";
import styles from "./Board.module.css";
const NoPiece = 0;
const BlackPiece = 1;
const WhitePiece = 2;
const CanPutPiece = 3;

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
        const PlayerPiece = WhitePiece;
        this.state = {
            squares: squares,
            PlayerPiece: PlayerPiece,
        };
    }
    //マウントしたあとに呼び出す関数
    componentDidMount(){
        this.ColoredCanPutPiece()
    }
    //盤面の横列の作成
    renderSquereLine(i){
        const Line = [];
        for(let j=0; j<8; j++){
            Line.push(<Squere key={ i+j } value={ this.state.squares[i][j] } onClick={ ()=>this.handleClick(i, j) } />)
        };
        return Line
    }
    //ピースをクリックしたときの処理
    async handleClick(i, j){
        if(!this.CheckPutPiece(i, j)){
            return
        }
        await this.PutPiece(i, j)
        await this.ColoredCanPutPiece()
    }
    //コマを置けるかのチェック
    CheckPutPiece(i, j){
        const squares = this.state.squares.slice();
        if(squares[i][j] === CanPutPiece){
            return true
        }
        return false
    }
    //ピースを置いたときの処理
    PutPiece(i, j){
        const PlayerPiece = this.state.PlayerPiece
        const EnemyPiece = PlayerPiece === BlackPiece ? WhitePiece : BlackPiece
        const X = [ 0, 1, 1, 1, 0,-1,-1,-1];
        const Y = [-1,-1, 0, 1, 1, 1, 0,-1];
        const squares = this.state.squares.slice();
        // console.log(i, j);
        //8方向の相手のコマを裏返す
        for(let k = 0; k<8; k++){
            var x = i+X[k]
            var y = j+Y[k]
            var loop = 0
            if(x>=0 && x<8 && y>=0 && y<8){
                if(squares[x][y] === EnemyPiece){
                    while(squares[x][y] === EnemyPiece){
                        x += X[k]
                        y += Y[k]
                        loop += 1
                        if(!(x>=0 && x<8 && y>=0 && y<8)){break}
                        if(squares[x][y] === PlayerPiece){
                            for(let l = 0; l<=loop; l++){
                                squares[i + X[k]*l][j + Y[k]*l] = PlayerPiece
                            }
                        }
                    }
                }
            }
        }
        this.setState({
            squares: squares,
            PlayerPiece: EnemyPiece
        });
    }
    //コマを置ける位置を表示
    ColoredCanPutPiece(){
        const PlayerPiece = this.state.PlayerPiece
        const EnemyPiece = PlayerPiece === BlackPiece ? WhitePiece : BlackPiece
        const X = [ 0, 1, 1, 1, 0,-1,-1,-1];
        const Y = [-1,-1, 0, 1, 1, 1, 0,-1];
        // console.log(i, j);
        const squares = this.state.squares.slice();
        //全面の処理
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                //前の置ける位置は消す
                if(squares[i][j] === CanPutPiece){squares[i][j] = NoPiece}
                if(squares[i][j] === NoPiece){
                    for(let k = 0; k<8; k++){
                        var x = i+X[k]
                        var y = j+Y[k]
                        if(x>=0 && x<8 && y>=0 && y<8){
                            if(squares[i+X[k]][j+Y[k]] === EnemyPiece){
                                // var loop = 0
                                while(squares[x][y] === EnemyPiece){
                                    x += X[k]
                                    y += Y[k]
                                    // loop += 1
                                    if(!(x>=0 && x<8 && y>=0 && y<8)){break}
                                    if(squares[x][y] === PlayerPiece){
                                        squares[i][j] = CanPutPiece
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        this.setState({
            squares: squares
        });
    }
    render(){
        return(
            <div>
                <div className={styles.BoardLine}>{ this.renderSquereLine(0) }</div>
                <div className={styles.BoardLine}>{ this.renderSquereLine(1) }</div>
                <div className={styles.BoardLine}>{ this.renderSquereLine(2) }</div>
                <div className={styles.BoardLine}>{ this.renderSquereLine(3) }</div>
                <div className={styles.BoardLine}>{ this.renderSquereLine(4) }</div>
                <div className={styles.BoardLine}>{ this.renderSquereLine(5) }</div>
                <div className={styles.BoardLine}>{ this.renderSquereLine(6) }</div>
                <div className={styles.BoardLine}>{ this.renderSquereLine(7) }</div>
            </div>
        );
    }
}

export default Board;