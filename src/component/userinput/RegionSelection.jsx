export default class RegionSelector extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            content = props.item,
        }
    }

    render(){
        return <div>
            {this.state.item}
        </div>
    }
}