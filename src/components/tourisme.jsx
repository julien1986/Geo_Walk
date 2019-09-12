import React, { useContext } from "react";
import "../scss/tourisme.scss";

//SEMANTIC UI
import { Container, Segment } from "semantic-ui-react";

//IMPORT COMPONENTS
import ListParcours from "../components/toursime/list-parcours";
import ScanQR from "../components/toursime/scanQR";

//APP CONTEXT

export default function Tourisme() {
  return (
    <Container>
      <Segment.Group>
        <Segment>
          <ListParcours />
        </Segment>
        <Segment>
          <ScanQR />
        </Segment>
      </Segment.Group>
    </Container>
  );
}
