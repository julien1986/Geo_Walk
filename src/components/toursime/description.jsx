import React from "react";
import "../../scss/tourisme/description.scss";

//SEMANTIC UI
import { Card, Icon, Image } from "semantic-ui-react";

//MATERIAL UI
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5)
  }
}));

export default function Description(props) {
  console.log(props);
  const classes = useStyles();
  const [openPopup, setOpenPopup] = React.useState(true);

  function handleClosePopup(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpenPopup(false);
  }

  return openPopup ? (
    <Card className="Mydescription">
      <IconButton key="close" aria-label="close" color="inherit" className={classes.close} onClick={handleClosePopup}>
        <CloseIcon />
      </IconButton>
      <Image src="/images/avatar/large/matthew.png" wrapped ui={false} />
      <Card.Content>
        <Card.Header>Matthew</Card.Header>
        <Card.Meta>
          <span className="date">Joined in 2015</span>
        </Card.Meta>
        <Card.Description>Matthew is a musician living in Nashville.</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="user" />
          22 Friends
        </a>
      </Card.Content>
    </Card>
  ) : (
    ""
  );
}
