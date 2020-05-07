import React, { useReducer, useEffect } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import logo from "../assets/travel.png";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import theme from "../theme";
import "../App.css";
const AlertComponent = (props) => {
  const initialState = {
    msg: "",
    snackBarMsg: "",
    contactServer: false,
    alertStatus: [],
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  useEffect(() => {
    resetAlerts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const resetAlerts = async () => {
    try {
      //Call the snackbar with the loading message
      props.showSnackBar("Resetting Alerts...");
      let response = await fetch(
        "http://localhost:4000/graphql/?query={setupalerts}"
      );
      let json = await response.json();
      setState({
        alertStatus: json.data.setupalerts
          .replace(/([.])\s*(?=[A-Z])/g, "$1|")
          .split("|"),
      });
      //Call the snackbar with the completion message
      props.showSnackBar("Alerts collection setup completed.");
    } catch (error) {
      console.log(error);
      //Call the snackbar with an error
      props.showSnackBar(error.message);
    }
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Card>
        <CardContent>
          <Typography color="secondary" className="titleHead">
            World Wide Travel Alerts
          </Typography>
          <img src={logo} alt="travel logo" className="center" />
          <Table>
            <TableBody className="centerDiv">
              {state.alertStatus.map((n, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      <h4 className="tableText">{`${n}`}</h4>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </MuiThemeProvider>
  );
};
export default AlertComponent;
