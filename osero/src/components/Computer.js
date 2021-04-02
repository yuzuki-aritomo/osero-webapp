
class Computer{
    async Comput(squares){
        await this.sleep(1000)
        for(let i = 0;  i<8; i++){
            for(let j=0; j<8; j++){
                if(squares[i][j] === 3){
                    var Turn = [i, j]
                    return Turn
                }
            }
        }
    }
    sleep(msec) {
        return new Promise(function(resolve) {
        setTimeout(function() {resolve()}, msec);
        })
    }
}

export default Computer