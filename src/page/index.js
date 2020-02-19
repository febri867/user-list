import React from 'react';
import actions from "./store/actions";
import {connect} from "react-redux";
import UserCard from "./user-container/user-card";

function App(props) {



    return (
        <div className="App">
                <div className="row header m--0 p--0 bc--seafoam c--ocean header">
                    <div className="col-md-12">
                        <div className="col-md-10 offset-1">
                            <h3 className="p--20 brand bc--ocean c--white m--0">User</h3>
                            <button onClick={() => props.changeCategory('cities')} className="btn btn-light pull__right m--10">
                                Cities
                            </button>
                            <button onClick={() => props.changeCategory('color')} className="btn btn-light pull__right m--10">
                                Color
                            </button>
                        </div>
                    </div>
                </div>
            <div className="col-md-10 offset-1 box-container">
                <UserCard/>
            </div>
        </div>
    );
}

const mapState = ({}) => ({
})
const mapActions = actions

export default connect(mapState, mapActions)(App);
