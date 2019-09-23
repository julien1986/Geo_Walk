import React, { useContext } from "react";
import "../../scss/tourisme/description.scss";

//SEMANTIC UI
import { Card, Icon, Image } from "semantic-ui-react";

//MATERIAL UI
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import DataContext from "../../context/DataContext";
import { timeout } from "q";

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5)
  }
}));

export default function Description(props) {
  //console.log(props);
  const classes = useStyles();
  const [openPopup, setOpenPopup] = React.useState(true);
  const { currentParcours, setCurrentParcours, listTrips, setTrips, setTripsContext } = useContext(DataContext);

  function handleClosePopup(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpenPopup(false);
    console.log(currentParcours);
    listTrips.map(trip => {
      if (trip.id === currentParcours.id) {
        setCurrentParcours({ ...currentParcours, pois: currentParcours.pois.map(p => (p.id === props.poi.id ? { ...p, visited: true } : p)) });
      }
    });
  }

  return openPopup ? (
    <div className="Mydescription">
      <Card>
        <IconButton key="close" aria-label="close" color="inherit" className={classes.close} onClick={handleClosePopup}>
          <CloseIcon />
        </IconButton>
        <Image src={props.poi.medias.image} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{props.poi.name}</Card.Header>
          <Card.Description>{props.poi.description}</Card.Description>
        </Card.Content>
      </Card>
    </div>
  ) : (
    ""
  );
}
