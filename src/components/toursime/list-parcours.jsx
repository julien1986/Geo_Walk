import React from "react";
import { Container, Segment } from "semantic-ui-react";

//IMPORT CONPONENTS
import Plan from "./plan";

export default function ListParcours() {
  return (
    <>
      <h1>Je suis le module de liste des parcours</h1>
      <Segment>
        <Plan />
      </Segment>
    </>
  );
}
