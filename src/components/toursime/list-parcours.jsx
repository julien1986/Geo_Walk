import React, { useState, useEffect, useContext } from "react";
import { Header, Segment, List } from "semantic-ui-react";
import uid from "uid";

//IMPORT CONPONENTS
import Plan from "./plan";

//IMPORT CONTEXT
import DataContext from "../../context/DataContext";

export default function ListParcours() {

  const {listTrips} = useContext(DataContext)
  

  return (
    <>
      <Header as='h1'>Liste des parcours</Header>
      <Segment>
        <List divided relaxed>
        {
          listTrips !== [] ? (listTrips.map(t => (
          <List.Item key={uid()}>
            <List.Content>
                <List.Header as='a'>{t.trip_name}:</List.Header>
                <List.Description as='a'>{t.categorie}</List.Description>
            </List.Content>
          </List.Item>))) :  (<List.Item>Rien</List.Item>)
        }
        </List>
      </Segment>
    </>
  );
}
