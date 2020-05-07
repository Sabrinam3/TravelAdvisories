import React, { useReducer } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import Reorder from "@material-ui/icons/Reorder";
import { Snackbar } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import Home from "./components/Home";
import AlertComponent from "./components/AlertComponent";
import AddAdvisory from "./components/AddAdvisoryComponent";
import ListAdvisory from "./components/ListAdvisoryComponent";
import {
  Toolbar,
  AppBar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from "@material-ui/core";

const App = () => {
  const initialState = {
    showSnackbar: false,
    anchorEl: null,
    snackbarMsg: "",
  };

  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  const handleClose = () => {
    setState({ anchorEl: null });
  };
  const handleClick = (event) => {
    setState({ anchorEl: event.currentTarget });
  };
  const snackbarClose = () => {
    setState({ showSnackbar: false });
  };
  const showSnackBar = (msgFromChild) => {
    setState({ showSnackbar: true, snackbarMsg: msgFromChild });
  };
  return (
    <MuiThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Travel Advisories
          </Typography>
          <IconButton
            onClick={handleClick}
            color="inherit"
            style={{ marginLeft: "auto", paddingRight: "1vh" }}
          >
            <Reorder />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={state.anchorEl}
            open={Boolean(state.anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={Link} to="/home" onClick={handleClose}>
              Home
            </MenuItem>
            <MenuItem component={Link} to="/resetalerts" onClick={handleClose}>
              Reset Alerts
            </MenuItem>
            <MenuItem component={Link} to="/addadvisory" onClick={handleClose}>
              Add Advisory
            </MenuItem>
            <MenuItem component={Link} to="/listadvisory" onClick={handleClose}>
              List Advisories
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Snackbar
        open={state.showSnackbar}
        message={state.snackbarMsg}
        autoHideDuration={4000}
        onClose={snackbarClose}
      />
      <div>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route
          path="/resetalerts"
          render={() => <AlertComponent showSnackBar={showSnackBar} />}
        />
        <Route
          path="/addadvisory"
          render={() => <AddAdvisory showSnackBar={showSnackBar} />}
        />
        <Route
          path="/listadvisory"
          render={() => <ListAdvisory showSnackBar={showSnackBar} />}
        />
        <Route path="/home" component={Home} />
      </div>
    </MuiThemeProvider>
  );
};
export default App;
