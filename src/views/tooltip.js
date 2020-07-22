import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Alert from "react-bootstrap/Alert";

function Offlline() {
  return (
    <>
      <Alert variant="danger">
        <Alert.Heading>You Are Offline!</Alert.Heading>
        <p>
          Change this and that and try again. Duis mollis, est non commodo
          luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
          Cras mattis consectetur purus sit amet fermentum.
        </p>
      </Alert>
    </>
  );
}

export default Offlline;
