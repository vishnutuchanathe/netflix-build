import React from 'react';
import './HomeScreen.css';
import Nav from '../Nav.js';
import Banner from '../Banner'
import Row from '../Row'
import requests from '../Requests';

function HomeScreen() {

    return (
        <div className="homeScreen">
            <Nav />
            <Banner />
            <Row title="Trending Now"
                fetchUrl={requests.fetchTopRated}/>
            <Row 
                title="Only on Netflix"
                fetchUrl={requests.fetchNetflixOriginals}
                isLargeRow
            />
            <Row title="Action Movies"
                fetchUrl={requests.fetchActionMovies}/>
            <Row 
                title="Top 10 in India Today"
                fetchUrl={requests.fetchNetflixOriginals}
                isNumberRow="true"
            />
            <Row title="Comedy Movies"
                fetchUrl={requests.fetchComedyMovies}/>
            <Row title="Horror Movies"
                fetchUrl={requests.fetchHorrorMovies}/>
            <Row title="Romance Movies"
                fetchUrl={requests.fetchRomanceMovies}/>
            <Row title="Documentaries Movies"
                fetchUrl={requests.fetchDocumentaries}/>
        </div>
    )
}

export default HomeScreen
