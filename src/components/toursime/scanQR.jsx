import React, { useState, useEffect, useContext } from "react";
import {} from "semantic-ui-react";
import QrReader from "react-qr-reader";
import axios from "axios";

//IMPORT CONPONENTS

//import Popup from "./popup";
import DataContext from "../../context/DataContext";

export default function ScanQR() {
  const { listTrips, setTripsContext } = useContext(DataContext);
  const { url, setUrl } = useContext(DataContext);

  const handleScan = data => {
    //si j'ai des datas
    if (data) {
      const qr = data;
      //je lance une requête axios
      //console.log(url);

      axios
        .get(`${url}/trips/${qr}`)
        .then(response => {
          console.log("Data: ", response.data);
          if (listTrips !== []) {
            if (listTrips.find(trips => trips.id === response.data.id)) {
              console.log("parcours déjà scanné");
              return;
            } else {
              localStorage.setItem("getTrips", JSON.stringify([...listTrips, response.data]));
              setTripsContext(response.data);
            }
          } else {
            localStorage.setItem("getTrips", JSON.stringify([response.data]));
            setTripsContext(response.data);
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
      <QrReader delay={300} onError={handleError} onScan={handleScan} style={{ width: "100%" }} />
    </div>
  );
}
