import React, { useContext } from "react";

//SEMANTIC UI
import { Container } from "semantic-ui-react";
//IMPORT CONTEXT
import DataContext from "../../context/DataContext";

//créer le state qui va utiliser la requete vers les différents POI

export default function Plan() {
  const {currentParcours, setCurrentParcours} = useContext(DataContext)

  return (
    <Container>
      <h1>Je suis le module plan</h1>
      {console.log(currentParcours)}
    </Container>
  );
}
