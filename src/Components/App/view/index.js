import React from "react";
import Form from "../form/index"
//import Edit from "../edit";

function fetchDetails(ID) {
    const request = new Request('/heroes/' + ID, { method: 'GET', headers: { "Content-Type": "application/json" } });
    return fetch(request);
}

class View extends React.Component {
    state = {
        ID: '',
        Name: '',
        Alias: '',
        Team: ''
    }
    componentDidMount() {
        let self = this;
        fetchDetails(this.props.match.params.id) // the id here matches the syntax of the id in the URL
            .then(res => res.json())
            .then(function (data) {
                self.setState({
                    id: data[0],
                    Name: data[1],
                    Alias: data[2],
                    Team: data[3]
                })
            });
    }
    render() {
        return (
            <section>
                <h3>View Detail</h3>
                <div> Name : {this.state.Name} </div>
                <div> Alias : {this.state.Alias} </div>
                <div> Team: {this.state.Team} </div>
                <br />

            </section>


        )
    }

}
export default View;
/*actually supposede to be in line 14 but only for debugging
<Form formSubmitCallback={(Name,Alias,Team) => {console.log(Name,Alias,Team)}}/>
*/