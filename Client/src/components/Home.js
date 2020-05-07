import React from "react";
import logo from "../assets/travel.png";
import { MuiThemeProvider } from "@material-ui/core/styles";
import "../App.css";
import { Card, CardContent, Typography } from "@material-ui/core";
import theme from "../theme";

const Home = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Card>
        <CardContent>
          <Typography color="secondary" className="titleHead">
            World Wide Travel Alerts
          </Typography>
          <img src={logo} alt="travel logo" className="center" />
          <Typography
            color="primary"
            style={{
              textAlign: "right",
              padding: "3vh",
              fontSize: 14,
            }}
          >
            &copy;Travel Advisories - 2020
          </Typography>
        </CardContent>
      </Card>
    </MuiThemeProvider>
  );
};
export default Home;
