import React, { useReducer, useEffect } from "react";
import * as moment from "moment";
import { MuiThemeProvider } from "@material-ui/core/styles";
import logo from "../assets/travel.png";
import {
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import theme from "../theme";
import "../App.css";

const AddAdvisoryComponent = (props) => {
  const initialState = {
    snackbarMsg: "",
    name: "",
    country: "",
    countries: [],
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  //Controls whether the add advisory button is enabled
  const formValid = state.name !== "" && state.country !== "";

  useEffect(() => {
    fetchCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCountries = async () => {
    try {
      let response = await fetch(
        "http://localhost:4000/graphql/?query={countries}"
      );
      let json = await response.json();
      setState({
        countries: json.data.countries,
      });
      //call the snackbar
      props.showSnackBar(`Found ${json.data.countries.length} countries`);
    } catch (error) {
      console.log(error);
      //call the snackbar with the error
      props.showSnackBar(error.message);
    }
  };

  const handleNameInput = (e) => {
    setState({ name: e.target.value });
  };
  const onChangeCountry = (e, selectedOption) => {
    selectedOption
      ? setState({
          country: selectedOption,
        })
      : setState({
          country: "",
        });
  };

  const addAdvisory = async () => {
    var query = `mutation postadvisory($travellerName: String, $country: String, $date: String) {
      postadvisory(travellerName: $travellerName, country: $country, date: $date) {
        id
      }
    }`;
    let travellerName = state.name;
    let country = state.country;
    let date = moment().format("YYYY-MM-DD hh:mm:ss");
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    try {
      let response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          query,
          variables: { travellerName, country, date },
        }),
      });
      //If the result is not null, display the success message on the snackbar
      let json = await response.json();
      if (
        json.data.postadvisory !== null &&
        json.data.postadvisory.id !== null
      ) {
        props.showSnackBar(`Added advisory on ${date}`);
      }
      //Show the snackbar with an error message
      else {
        props.showSnackBar("Problem adding advisory.");
      }
    } catch (error) {
      console.log(error);
      //call the snackbar with the error
      props.showSnackBar(error.message);
    }
    //Clear fields
    setState({
      country: "",
      name: "",
    });
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Card>
        <CardContent>
          <Typography color="secondary" className="titleHead">
            World Wide Travel Alerts
          </Typography>
          <img src={logo} alt="travel logo" className="center" />
          <Typography color="primary" className="titleSecondary">
            Add Advisory
          </Typography>
          <div className="centerDiv">
            <TextField
              onChange={handleNameInput}
              placeholder="Traveller's Name"
              value={state.name}
              style={{ margin: 10 }}
            />

            <Autocomplete
              id="countries"
              value={state.country}
              options={state.countries}
              getOptionLabel={(option) => option}
              style={{ width: 300 }}
              onChange={onChangeCountry}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="countries"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div style={{ textAlign: "center" }}>
            <Button
              disabled={!formValid}
              style={{ margin: 15, border: "solid" }}
              onClick={addAdvisory}
            >
              Add Advisory
            </Button>
          </div>
        </CardContent>
      </Card>
    </MuiThemeProvider>
  );
};

export default AddAdvisoryComponent;
