import React, { useState, useEffect } from "react";
import {} from "semantic-ui-react";
import QrReader from "react-qr-reader";
import axios from "axios";

//IMPORT CONPONENTS

//import Popup from "./popup";

export default function ScanQR() {
  const [trips, setTrips] = useState([]);
  const [getQR, setQR] = useState({ resultat: "" });

  useEffect(() => {
    axios
      .get("http://10.1.107.4:8080/trips")
      .then(response => {
        // Handle success.
        console.log("Data: ", response.data);
        setTrips(response.data);
      })
      .catch(error => {
        // Handle error.
        console.log("An error occurred:", error);
      });
  }, []);
  const handleError = () => {
    alert("Code non valide");
  };
  const handleScan = data => {
    if (data) {
      console.log(data);
      setQR({ resultat: data });
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
    </div>
  );
}
