import React, { useState, useEffect, useContext } from "react";
import {} from "semantic-ui-react";
import QrReader from "react-qr-reader";
import axios from "axios";

//IMPORT CONPONENTS

//import Popup from "./popup";
import DataContext from "../../context/DataContext";

export default function ScanQR() {
  const {listTrips, setTripsContext} = useContext(DataContext);
  let tripsLS = JSON.parse(localStorage.getItem("getTrips"));
  const {url, setUrl} = useContext(DataContext);
  
  
  const handleScan = (data) => {
    //si j'ai des datas
    if (data) {
      const qr = data
      //je lance une requête axios
      console.log(url)
      axios
        .get(`${url}/trips/${qr}`)
        .then(response => {
          //console.log("Data: ", response.data);
          //si il y a des objets dans le local storage...
          if(localStorage.getItem("getTrips")){
            //console.log("il y a quelque chose dedans")
            //je boucle sur tout ce que j'ai dans le contexte de l'app
            listTrips.map(t=>{
              //si l'id scanné correspond à l'id d'une des entrées du contexte
              if(t.id === response.data.id){
                return (alert("QR code déjà scanné"))
              //sinon je rajoute une entrée dans le local storage, je rajoute une entrée dans le contexte.
              }else{
                const addData = response.data;
                tripsLS = JSON.parse(localStorage.getItem("getTrips"))
                localStorage.setItem('getTrips', JSON.stringify([...tripsLS, addData]))
                setTripsContext(response.data)
                //si tout s'est bien passé
                alert("Le QR Code a bien été scanné");
              }
            })
            //... Si il n'y a rien dans le local storage, j'ajoute au local storage
          } else{ 
            console.log("il n' y a rien dedans")
             localStorage.setItem("getTrips", JSON.stringify([response.data]))
             setTripsContext(response.data)
             //si tout s'est bien passé
            alert("Le QR Code a bien été scanné");
          }
        })
        .catch(error => {
          console.log("An error occurred:", error);
        });
    }
  };

  
  const handleError = () => {
    alert("Code non valide");
  };
  
  return (
    <div className="scanQR">
      <h2>Scannez un QR Code</h2>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
    </div>
  );
}

