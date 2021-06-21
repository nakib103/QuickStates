import React, {Component} from "react"
import ReactDOM from "react-dom"
import StateCard from "../Common/StateCard"

class Uva extends Component {
    constructor(props) {
        console.log(props)
        super(props)

        if (!props.userID){
            console.error("[Uva:constructor] userID cannot be null!")
        }

        this.baseUrl = "https://uhunt.onlinejudge.org/api/"
        this.userID = props.userID

        this.state = {
            title: "Uva",
            quickStates: {
                Standing: "loading",
                Solved: "loading"
            },
            featureState: "Standing"
        }

        this.updateStates = this.updateStates.bind(this)
    }

    updateStates = (data) => {
        console.log(data)
        const stats = data[0]
        this.setState( prevState => {
            let quickStates = Object.assign({}, prevState.quickStates)
            quickStates.Standing = stats.rank,
            quickStates.Solved = stats.ac

            return {quickStates};
        })
        console.log(this.states)
    }

    componentDidMount = async () => {
        try {
            await fetch(this.baseUrl+"ranklist/"+this.userID+"/0/0").
                then(response => response.json()).
                then(data => this.updateStates(data))
        } catch(error){
            console.error(error)
        }
    }

    render = () => {
        return (
            <StateCard 
                title = {this.state.title}
                quickStates = {this.state.quickStates}
                featureState = {this.state.featureState}
            />
        )
    }
}

export default Uva