
class Computer{
    async Comput(squares, CPULV = 1){
        if(CPULV === 1){
            return this.ComPut_randm(squares)
        }else if(CPULV === 2){
            return this.ComPut_wight(squares)
        }
        return this.ComPut_randm(squares)
    }
    async ComPut_randm(squares){
        await this.waitTime()
        let Turn = []
        let loop = 0
        for(let i = 0;  i<8; i++){
            for(let j=0; j<8; j++){
                if(squares[i][j] === 3){
                    Turn.push([i, j]);
                    loop++;
                }
            }
        }
        var rnd = Math.floor( Math.random() * loop ) ;
        return Turn[rnd]
    }
    async ComPut_wight(squares){
        await this.waitTime()
        const weightSquares = [
            [ 68,-12, 53, -8, -8, 53,-12, 68],
            [-12,-62,-33, -7, -7,-33,-62,-12],
            [ 53,-33, 26,  8,  8, 26,-33, 53],
            [-8, -7,  8,-18,-18,  8, -7, -8],
            [-8, -7,  8,-18,-18,  8, -7, -8],
            [53,-33,26,  8,  8,  26,-33, 53],
            [-12,-62,-33, -7, -7,-33,-62,-12],
            [68-12, 53, -8, -8, 53, -12, 68],
        ];
        let Turn = []
        let compare = -100
        for(let i = 0;  i<8; i++){
            for(let j=0; j<8; j++){
                if(squares[i][j] === 3){
                    if(weightSquares[i][j] > compare){
                        compare = weightSquares[i][j]
                        Turn = [i, j]
                    }
                }
            }
        }
        return Turn
    }
    //一秒まつ
    waitTime(){
        return new Promise(function(resolve) {
        setTimeout(function() {resolve()}, 1000);
        })
    }
}

export default Computer