import React, { useState, useEffect, useContext } from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Header, Segment, List } from "semantic-ui-react";
import uid from "uid";

//IMPORT CONPONENTS
import ScanQR from "../toursime/scanQR";

//IMPORT CONTEXT
import DataContext from "../../context/DataContext";

export default function ListParcours() {

  const {showmap, setShowmap} = useContext(DataContext);
  const {currentParcours, setCurrentParcours} = useContext(DataContext);
  const {listTrips} = useContext(DataContext)
  const {handleClick} = useContext(DataContext)
  
  

  return (
    <>
      <Header as='h1'>Liste des parcours</Header>
        <Segment>
        <List divided relaxed>
        {
          listTrips !== [] ? (listTrips.map(t => (
            <List.Item key={uid()} onClick={()=>handleClick(t)}>
              <List.Content as='a'>
                  <List.Header>{t.trip_name}:</List.Header>
                  <List.Description>{t.categorie}</List.Description>
              </List.Content>
            </List.Item>)))
            :  (<List.Item>Rien</List.Item>)
        }
        </List>
      </Segment>
      <ScanQR/>  
    </>
  );
}

