// * Neetu Chauhan * /

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import { withRouter } from "react-router-dom";
import { sendUserInformation } from "../containers/actions/userActions";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: "#A66782"
    },
}));
function FullWidthGrid(props) {
    const classes = useStyles();
    function deleteFromCart(product) {


        let usercart = props.user.add_details;

        let index = usercart.indexOf(product);
        usercart.splice(index, 1);

        props.sendUserInformation(usercart)

    };

    return (
        <div className={classes.root}>

            <Typography variant="h4" component="h2"
                style={{
                    fontFamily: "cursive",
                    fontSize: "3rem",
                    color: "darkblue"
                }}
            >Budget</Typography>
            <Grid

            >
                {props.user.add_details && props.user.add_details.length ? (
                    <Grid container
                        spacing={2}
                    >
                        {props.user.add_details.map((user) => <Grid item xs={6} sm={3}>

                            <Paper className={classes.paper}>

                                < Button style={{
                                    borderRadius: 30,
                                    backgroundColor: "#365E7F",
                                    padding: "10px 28px",
                                    fontSize: "10px",
                                    marginRight: "1rem", color: "white"
                                }}
                                    variant="contained"
                                >
                                    {user.start}
                                </Button>

                                <Typography>
                                    {user.notes}

                                </Typography>

                                <Typography>
                                    {user.seller}

                                </Typography>
                                <Typography variant="h5" className={classes.title} color="textSecondary" gutterBottom style={{ fontFamily: "fantasy" }}>
                                    {user.title}
                                </Typography>

                                <Typography className={classes.pos} color="textSecondary"
                                    style={{ color: "white", fontSize: "3rem" }}
                                >
                                    {user.location}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {user.description}

                                </Typography>

                                <Grid container spacing={3}>
                                    <Grid>
                                        <IconButton
                                            edge="end"
                                            aria-label="comments"
                                        >
                                            <DeleteIcon style={{ marginBottom: "-6rem", marginLeft: "14rem" }}
                                                onClick={() => deleteFromCart(user)}
                                            />
                                        </IconButton>
                                    </Grid>


                                </Grid>
                            </Paper>
                        </Grid>
                        )}
                    </Grid>
                ) : (
                        <div style={{ marginLeft: "35rem", marginTop: "6rem" }}>
                            <NotificationsActiveIcon style={{ fontSize: "28rem", color: "darkgrey" }} />
                            <div style={{ marginLeft: "6rem" }}>
                                <Typography gutterBottom variant="h5" component="h2" style={{ color: "red", fontFamily: "fantasy" }}>
                                    Nothing to show!
                        </Typography>
                                <Typography
                                    style={{ color: "darkslateblue", fontFamily: "fantasy" }}
                                    variant="body2"
                                    color="darkcyan"
                                    component="p">
                                    Nothing added,once you add you'll see here
                        </Typography>
                            </div>
                        </div>


                    )}

            </Grid>
        </div>
    );
}
const mapStateToProps = (state) => ({
    user: state.user
    ,
});

export default connect(mapStateToProps, {

    sendUserInformation,
})(withRouter(FullWidthGrid));
