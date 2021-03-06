import React from "react";//no path coz from node modules
import Table from "./table/index";//path coz we need relative path
//import Incrementer from "./incrementer/index" // This is for incrementer
import View from "./view/index";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
//import Edit from "./edit/index";
import Form from "./form/index";

const tableHeaders = ['ID', 'Name', 'Alias', 'Team'];
//const tableHeadersSecond = ['Name-2','Alias-2','Team-2'];  

class App extends React.Component {

    state = {
        tableValues: []
    }

    constructor(props) {
        super(props)
        this.createRecord = this.createRecord.bind(this);
    }

    fetchList() {
        let self = this //to enable the usage of the actual this, not the one within the function
        const request = new Request('/heroes',
            {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            })
        fetch(request)//This is promise that returns itself
            .then(res => res.json())// this is yet another chain promise which returns itself
            .then(function (data) {
                self.setState({ 'tableValues': data });
            }
            )
    }

    componentDidMount() {
       
        this.fetchList();
    }

    /*createRecord(Name,Alias,Team) {
        console.log(Name,Alias,Team)
        const ID = (Math.ceil(Math.random() * 1000)).toString()
        const newRecord = [ID,Name,Alias,Team]
        const newTableValues = this.state.tableValues.map(val => val)
        //const newTableValues = [...this.state.tableValues]
        newTableValues.push(newRecord)
        this.setState({tableValues:newTableValues})
    }*/

    createRecord(Name, Alias, Team) {
        let self = this;
        var body = {
            name: Name,
            alias: Alias,
            team: Team
        };

        var request = new Request('/heroes', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
        fetch(request)
            .then(function() {
                self.fetchList();
            });
    }

    render() {
        return (
            //<Hello name= "World"></Hello>
            //<Incrementer/>
            <Router>
                <Switch>
                    <Route exact path="/list" render={(props) => {
                        return (<Table
                            values={this.state.tableValues}
                            headers={tableHeaders}
                            history={props.history}
                        //onViewClick={this.onViewClick}  
                        />)
                    }} />
                    <Route exact path="/view/:id" component={View} />
                    <Route exact path="/form" render={(props) => {
                        console.log(props)
                        return (<Form formSubmitCallback={this.createRecord} history={props.history} />)
                    }} />
                    <Redirect to="/list" />
                </Switch>
            </Router>
        )
    }
}


export default App;
