import React from "react";

const style = {
    'width': '50px',
    'height': '50px',
    'border': 'solid 1px #000',
    'backgroundColor' : '#339933',
    'outline': 'none',
}

class Squere extends React.Component {
    render(){
        return(
            <button style={ style } onClick={ ()=>this.props.onClick() }>
                { this.props.value }
            </button>
        )
    };
}

export default Squere;