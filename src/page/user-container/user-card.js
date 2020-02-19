import React, {useEffect} from 'react'
import actions from "../store/actions";
import {connect} from "react-redux";
import InfiniteScroll from 'react-bidirectional-infinite-scroll'

import './_user-card.scss'
import Spinner from "../component/spinner";

function UserCard(props) {
    useEffect(() => {
        if(localStorage.getItem('results')){
            props.receivedDataUsers({results: JSON.parse(localStorage.getItem('results'))})
        } else {
            props.getUsers()
        }
    }, [])

    function fetchData() {
        props.getUsers()
    }

    return (
        <div className="m--10 container--card">
            {
                Number(window.screen.width) > 480 ?
                    <InfiniteScroll
                        horizontal
                        dataLength={props.app.results.length}
                        hasMore={props.app.hasMore}
                        onReachRight={fetchData}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: "center" }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        {
                            props.app.results.map((el, i) =>
                                <div key={i} className={ "user-container m--20 p--20 " + (Number(el.dob.age) < 21 ? 'bc--red' : Number(el.dob.age) > 56 ? 'bc--seafoam' : 'bc--green')}>
                                    <img alt='img' className='img-article' src={el.picture.large}/>
                                    <h5>{el.name.title + ' ' + el.name.first + ' ' + el.name.last}</h5>
                                    <p>{el.email}</p>
                                    <p className="f--ubuntu__condose content-user">
                                        {
                                            el.location.street.name + ' ' +
                                            el.location.street.number + ', ' +
                                            el.location.city + ', ' +
                                            el.location.state + ', ' +
                                            el.location.country + ', ' +
                                            el.location.postcode
                                        }
                                    </p>
                                    <h6 className='m--0'>{el.gender || ''}</h6>
                                    <p className="f--ubuntu__light">{(el.dob.date.split('T'))[0] + ( el.dob.age ? ' ( ' + el.dob.age + ' )' : '') || ''}</p>
                                    <br/>
                                </div>
                            )
                        }
                    </InfiniteScroll>
                    :
                    <InfiniteScroll
                        dataLength={props.app.results.length}
                        hasMore={props.app.hasMore}
                        onReachBottom={fetchData}
                        next={fetchData}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: "center" }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        {
                            props.app.results.map((el, i) =>
                                <div key={i} className={ "user-container m--20 p--20 " + (Number(el.dob.age) < 21 ? 'bc--red' : Number(el.dob.age) > 56 ? 'bc--seafoam' : 'bc--green')}>
                                    <img alt='img' className='img-article' src={el.picture.large}/>
                                    <h5>{el.name.title + ' ' + el.name.first + ' ' + el.name.last}</h5>
                                    <p>{el.email}</p>
                                    <p className="f--ubuntu__condose content-user">
                                        {
                                            el.location.street.name + ' ' +
                                            el.location.street.number + ', ' +
                                            el.location.city + ', ' +
                                            el.location.state + ', ' +
                                            el.location.country + ', ' +
                                            el.location.postcode
                                        }
                                    </p>
                                    <h6 className='m--0'>{el.gender || ''}</h6>
                                    <p className="f--ubuntu__light">{(el.dob.date.split('T'))[0] + ( el.dob.age ? ' ( ' + el.dob.age + ' )' : '') || ''}</p>
                                    <br/>
                                </div>
                            )
                        }
                    </InfiniteScroll>
            }

            {
                props.app.isGettingData ?
                    <Spinner /> : ''
            }
        </div>
    )
}

const mapState = ({app}) => ({
    app
})
const mapActions = actions

export default connect(mapState, mapActions)(UserCard);
