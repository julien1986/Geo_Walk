import React, { useContext } from "react";
import "../scss/tourisme.scss";

//SEMANTIC UI
import { Container, Segment } from "semantic-ui-react";

//IMPORT COMPONENTS
import ListParcours from "../components/toursime/list-parcours";
import ScanQR from "../components/toursime/scanQR";
import Plan from "../components/toursime/plan";

//IMPORT CONTEXT
import DataContext from "../context/DataContext";

//APP CONTEXT

export default function Tourisme() {
  const { showmap } = useContext(DataContext);

  return (
    <Container>
      <Segment.Group>
        {!showmap ? (
          <Segment>
            <ListParcours />
            <ScanQR />
            <Plan/>
          </Segment>
        ) : (
          <Segment>
            <Plan />
          </Segment>
        )}
      </Segment.Group>
    </Container>
  );
}
