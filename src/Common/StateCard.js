import React, {Component} from "react"
import ReactDOM from "react-dom"

///////////////////////////////////////////////////////////////////////
// Each State Card is divided into 3 parts
// * card title - primarily the platform for which states will be shown
// * card states - user states in that platform
// * card footer - times of last update
///////////////////////////////////////////////////////////////////////

// card title component (functional)
const cardTitle = (title) => {
    let styles = {
    }

    return (
        <h4 style={styles}>{title}</h4>
    )
}

// card feature state (< card state child) component (functional)
const cardFeatureState = (quickStates, featureState) => {
    let styles = {
        listStyleType: "none"
    }

    return (
        <h4>{quickStates[featureState]}</h4>
    )
}

// card quick states component (< card state child) (functional)
const cardQuickStates = (quickStates) => {
    let styles = {
        listStyleType: "none",
        margin: 0
    }

    return (
        <ul className="fa-ul" style={styles}>
            {
                Object.keys(quickStates).map(key => {
                    return (
                        <li>
                            {/* <i className="fas fa-check-square fa-li"></i> */}
                            <div className="container">
                                <div className="row">
                                    <div className="col text-start" style={{padding:0}}>
                                        <small className="fw-bolder">{key}</small>
                                    </div>
                                    <div className="col text-end" style={{padding:0}}>
                                        <small className="fw-bolder">{quickStates[key]}</small>
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
}

// card states component (functional)
const cardStates = (quickStates, featureState) => {
    let styles = {
    }

    return (
        <div className="container" style={{padding:0}}>
            <div className="row">
                <div className="col-12 col-lg-12 card-quick-states" style={{padding:0}}>
                    {cardQuickStates(quickStates)}
                </div>
                {/* <div className="col-12 col-lg-4 card-feature-state" style={{padding:0}}>
                    {cardFeatureState(quickStates, featureState)}
                </div> */}
            </div>
        </div>
    )
}

// card footer component (functional)
const cardFooter = () => {
    let styles = {
        fontStyle: "italic",
        textAlign: "center",
        fontSize: "small"
    }

    let currentTime = new Date()
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Sep", "Oct", "Nov", "Dec"]
    let dateString = ""
    
    dateString += "ri " +
        ('0' + currentTime.getDate()).slice(-2) + " " + 
        months[currentTime.getMonth()] + " " +
        currentTime.getFullYear() + " " +
        ('0' + currentTime.getHours()).slice(-2) + ":" +
        ('0' + currentTime.getMinutes()).slice(-2) + ":" +
        ('0' + currentTime.getSeconds()).slice(-2);

    return (
        <div style={styles}>
            {dateString}
        </div>
    )
}

// state card component (class)
class StateCard extends Component {
    constructor (props) {
        super(props)

        this.styles = {
            width: 200,
            fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
            background: "#dc3545",
            color: "#ffffff"    
        }

        this.state = {
            title: this.props.title,
            quickStates: this.props.quickStates,
            featureState: this.props.featureState,
            lastUpdated: this.props.lastUpdated
        }
    }

    static getDerivedStateFromProps = (newProps, prevState) => {
        if(newProps.quickStates != prevState.quickStates){
            return {
                quickStates: newProps.quickStates
            }
        }
        return null
    }

    render = () => {
        // console.log("StateCard prop", this.props)
        // console.log("StateCard state", this.state)
        return (
            <div>
                <div className="card" style={this.styles}>
                    <div className="card-body">

                        <div className="card-title">{cardTitle(this.state.title)}</div>

                        <div className="card-states">
                            {cardStates(this.state.quickStates, this.state.featureState)}
                        </div>
                        
                    </div> 

                    <p className="card-footer" style={{margin:0}}>{cardFooter()}</p>
                </div>
            </div>
        )
    }
}

export default StateCard