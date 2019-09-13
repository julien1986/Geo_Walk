import React, { useState, useEffect, useContext } from "react";
import {} from "semantic-ui-react";
import QrReader from "react-qr-reader";
import axios from "axios";

//IMPORT CONPONENTS

//import Popup from "./popup";
import DataContext from "../../context/DataContext";

export default function ScanQR() {
  const [trips, setTrips] = useState([]);
  const [getQR, setQR] = useState({ resultat: "" });
  //const { newtrips, setnewtrips } = useContext(DataContext);

  // useEffect(() => {
  //   axios
  //     .get("10.1.107.4:8080/trips")
  //     .then(response => {
  //       // Handle success.
  //       console.log("Data: ", response.data);
  //       setTrips(response.data);
  //     })
  //     .catch(error => {
  //       // Handle error.
  //       console.log("An error occurred:", error);
  //     });
  // }, []);
  const handleError = () => {
    alert("Code non valide");
  };
  const handleScan = data => {
    if (data) {
      console.log(data);
      setQR({ resultat: data });
      axios
        .get(`10.1.107.4:8080/trips/${getQR.resultat}`)
        .then(response => {
          // Handle success.
          console.log("Data: ", response.data);
          let temp = [];
          trips.map(
            t =>
              (temp = [
                ...temp,
                {
                  trip_name: t.trip_name,
                  categorie: t.categorie,
                  pois: t.pois
                }
              ])
          );
          //console.log(temp)
          localStorage.setItem("trips", JSON.stringify(temp));
        })
        .catch(error => {
          // Handle error.
          console.log("An error occurred:", error);
        });

      alert("Le QR Code a bien été scanné");
    }
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
      <p>Resultat: {getQR.resultat}</p>
    </div>
  );
}
