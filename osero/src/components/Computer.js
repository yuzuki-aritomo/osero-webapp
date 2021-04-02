
class Computer{
    async Comput(squares){
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
    //一秒まつ
    waitTime(){
        return new Promise(function(resolve) {
        setTimeout(function() {resolve()}, 1000);
        })
    }
}

export default Computer