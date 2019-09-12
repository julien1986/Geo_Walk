import React, { useState, useEffect } from "react";
import { Container, Segment, List } from "semantic-ui-react";
import axios from "axios";
import uid from "uid";

//IMPORT CONPONENTS
import Plan from "./plan";

export default function ListParcours() {


  const [trips, setTrips] = useState([]);

  useEffect(() => {
    axios
    .get('http://localhost:8080/trips')
    .then(response => {
      console.log('Data: ', response.data);
      setTrips(response.data)
    })
    .catch(error => {
      console.log('An error occurred:', error);
    });
  }, [])


  const handleList = () =>{

    let localTrips;
    if(localStorage){
      localTrips = JSON.parse(localStorage.getItem("trips"));
      console.log(localTrips)
      setTrips(localTrips)

      return (
      trips.map(trip =>
      <List.Item key={uid()}>{trip.trip_name}, {trip.categorie}</List.Item>
      ))
    }
    else{
      return "Vous n'avez pas encore enregistré de parcours"
    };

    // let temp = [];
    // trips.map(t => temp = [...temp, {
    //     "trip_name": t.trip_name,
    //     "categorie": t.categorie,
    //     "pois": t.pois
    //   }]);
    // //console.log(temp)
    // localStorage.setItem("trips", JSON.stringify(temp))
  }

  return (
    <>
      <h1>Je suis le module de liste des parcours</h1>
      <Segment>
      <Plan />
          <List>{handleList}</List>
      </Segment>
    </>
  );
}
