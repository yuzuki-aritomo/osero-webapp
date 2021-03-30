import React from "react";
import Squere from "./Squere";
import BoardTopBar from "./BoardTopBar";
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
        const PlayerPiece = BlackPiece;
        const CountPiece = {
            Black: 2,
            White: 2,
        }
        const CountCanPutPiece = {
            Black: 2,
            White: 2,
        }
        this.state = {
            squares: squares,
            PlayerPiece: PlayerPiece,
            CountPiece: CountPiece,
            CountCanPutPiece: CountCanPutPiece,
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
        await this.CounterPiece()
        await this.CheckGame()
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
    //黒と白と設置可能なピースを数える
    CounterPiece(){
        const PlayerPiece = this.state.PlayerPiece
        const squares = this.state.squares.slice();
        let CountPiece = Object.create(this.state.CountPiece);
        let CountCanPutPiece = Object.create(this.state.CountCanPutPiece);
        let CountBlack = 0;
        let CountWhite = 0;
        let CountCanPut = 0;
        for(let i=0; i<8; i++){
            for(let j=0; j<8; j++){
                if(squares[i][j] === BlackPiece){ CountBlack++ }
                if(squares[i][j] === WhitePiece){ CountWhite++ }
                if(squares[i][j] === CanPutPiece){ CountCanPut++ }
            }
        }
        CountPiece.Black = CountBlack;
        CountPiece.White = CountWhite;
        if(PlayerPiece === BlackPiece){
            CountCanPutPiece.Black = CountCanPut
        }else{
            CountCanPutPiece.White = CountCanPut
        }
        this.setState({
            CountPiece: CountPiece,
            CountCanPutPiece: CountCanPutPiece
        })
    }
    //ゲームセットの確認(true: gameset)、置けるコマがない場合プレイヤー交代
    async CheckGame(){
        const PlayerPiece = this.state.PlayerPiece
        const EnemyPiece = PlayerPiece === BlackPiece ? WhitePiece : BlackPiece
        const CountCanPutPiece = this.state.CountCanPutPiece
        if(CountCanPutPiece.Black === 0 && CountCanPutPiece.White===0){
            console.log("Game Set")
        }else if(
                (CountCanPutPiece.Black === 0 && PlayerPiece === BlackPiece) ||
                (CountCanPutPiece.White === 0 && PlayerPiece === WhitePiece)
            ){
            this.state.PlayerPiece = EnemyPiece
            await this.ColoredCanPutPiece()
            await this.CounterPiece()
            this.CheckGame()
        }
    }
    render(){
        return(
            <div>
                <BoardTopBar 
                    PlayerPiece={this.state.PlayerPiece}
                    CountPiece={ this.state.CountPiece }
                />
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
            </div>
            
        );
    }
}

export default Board;