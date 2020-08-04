import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ClearAllSharpIcon from '@material-ui/icons/ClearAllSharp';
import AddIcCallIcon from '@material-ui/icons/AddIcCall';

import {Grid} from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
    addtoCart,
    fetchDashboardData,
    productList,
    sendUserInformation
} from "../containers/actions/userActions";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),

    },
}));
function UserBox(props) {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState("paper");

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    function handleClose() {
        setOpen(false);
    };

    function handleClick(e) {
        e.preventDefault();
        let dict = {};
        dict['start'] = e.target.start.value;
        dict['description'] = e.target.description.value;
        dict['location'] = e.target.location.value;
        dict['seller'] = props.detail.title;
        dict['title'] = e.target.title.value;
        let userdetail = props.user.add_details;
        userdetail.push(dict)

        props.sendUserInformation(userdetail)
        // whatever you typed into the input
        setOpen(false);

    }
    const classes = useStyles();
    return (
        <Grid style={{ margin: "auto", width: "90%" }}>

            <Button
                variant="contained"
                style={{
                    color: "#FFFFFF",
                    backgroundColor: "black",
                    borderRadius: "5px",
                    width: "100%",
                }}
                onClick={handleClickOpen("paper")}>
                Add & Book
          </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title">
                <DialogTitle>ADD & BOOK</DialogTitle>
                <FormControl className={classes.margin}>
                    <form onSubmit={handleClick}>
                        <Grid>
                            <Grid >
                                <InputLabel style={{ marginLeft: "4rem" }}>Name</InputLabel>
                                <Input
                                    style={{ width: "30rem", marginLeft: "4rem" }}
                                    name="title"
                                    startAdornment={
                                        <InputAdornment position="start"

                                        >
                                        </InputAdornment>
                                    }
                                />
                            </Grid>
                            <Grid style={{ marginTop: "2rem" }}>
                                <AccessTimeIcon style={{ marginRight: "2rem", marginTop: "1rem" }} />
                                <TextField
                                    id="datetime-local"
                                    label="Time Slot"
                                    name="start"

                                    type="datetime-local"
                                    defaultValue="2017-05-24T10:30"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />


                            </Grid>
                            <Grid>
                                < AddIcCallIcon style={{ marginTop: "3rem" }} />
                                <TextField
                                    className={classes.margin}
                                    style={{
                                        marginTop: "2rem",
                                        marginLeft: "2rem",
                                        width: "30rem"
                                    }}
                                    id="input-with-icon-textfield"
                                    name="location"
                                    label="Contact No"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid>
                                <ClearAllSharpIcon style={{ marginTop: "3rem" }} />
                                <TextField
                                    className={classes.margin}
                                    style={{
                                        marginTop: "2rem",
                                        marginLeft: "2rem",
                                        width: "30rem"
                                    }}
                                    id="input-with-icon-textfield"
                                    name="description"
                                    label="Add Description(Optional)"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <DialogActions >
                            <Button onClick={handleClose} color="primary">
                                Cancel
          </Button>
                            <Button type="submit" variant="contained" color="primary">Save</Button>

                        </DialogActions>
                    </form>
                </FormControl>
            </Dialog>
        </Grid>
    );
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, {
    addtoCart,
    fetchDashboardData,
    productList,
    sendUserInformation,
})(withRouter(UserBox));
