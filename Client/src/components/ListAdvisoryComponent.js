import React, { useReducer, useEffect } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import logo from "../assets/travel.png";
import {
  Card,
  CardContent,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import theme from "../theme";
import "../App.css";

const ListAdvisoryComponent = (props) => {
  const initialState = {
    snackbarMsg: "",
    traveller: "",
    advisoryListType: "Travellers",
    selectedAutocompleteOption: "",
    autocompleteOptions: [],
    travellers: [],
    regions: [],
    subregions: [],
    alertInformation: [],
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchTravellers();
    setState({
      autocompleteOptions: state.travellers,
      advisoryListType: "Traveller",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTravellers = async () => {
    try {
      //If the travellers have not been fetched previously
      if (state.travellers.length === 0) {
        let response = await fetch(
          "http://localhost:4000/graphql/?query={travellers}"
        );
        var json = await response.json();
        setState({
          travellers: json.data.travellers,
        });
      }
      let numTravellers = json
        ? json.data.travellers.length
        : state.travellers.length;
      //call the snackbar
      props.showSnackBar(`Found ${numTravellers} travellers`);
      //set autocomplete options
      setState({
        autocompleteOptions: json ? json.data.travellers : state.travellers,
      });
    } catch (error) {
      console.log(error);
      //call the snackbar with the error
      props.showSnackBar(error.message);
    }
  };

  const fetchRegions = async () => {
    try {
      //If the regions have not been fetched previously
      if (state.regions.length === 0) {
        let response = await fetch(
          "http://localhost:4000/graphql/?query={regions}"
        );
        var json = await response.json();
        setState({
          regions: json.data.regions,
        });
      }
      let numRegions = json ? json.data.regions.length : state.regions.length;
      //call the snackbar
      props.showSnackBar(`Found ${numRegions} regions`);
      //set autocomplete options
      setState({
        autocompleteOptions: json ? json.data.regions : state.regions,
      });
    } catch (error) {
      console.log(error);
      //call the snackbar with the error
      props.showSnackBar(error.message);
    }
  };

  const fetchSubRegions = async () => {
    try {
      //If the subregions have not been fetched previously
      if (state.subregions.length === 0) {
        let response = await fetch(
          "http://localhost:4000/graphql?query={subregions}"
        );
        var json = await response.json();
        setState({
          subregions: json.data.subregions,
        });
      }
      let numSubRegions = json
        ? json.data.subregions.length
        : state.subregions.length;
      //call the snackbar
      props.showSnackBar(`Found ${numSubRegions} subregions`);
      //set autocomplete options
      setState({
        autocompleteOptions: json ? json.data.subregions : state.subregions,
      });
    } catch (error) {
      console.log(error);
      //call the snackbar with the error
      props.showSnackBar(error.message);
    }
  };

  const alertsByTraveller = async (travellerName) => {
    try {
      var query = `query alertsfortraveller($travellerName: String) {
        alertsfortraveller(travellerName: $travellerName){name, text, date}
          }`;
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          query,
          variables: { travellerName },
        }),
      });
      let json = await response.json();
      setState({
        alertInformation: json.data.alertsfortraveller,
      });
      //call the snackbar
      props.showSnackBar(
        `Found ${json.data.alertsfortraveller.length} alerts for ${travellerName}`
      );
    } catch (error) {
      console.log(error);
      //call the snackbar with the error
      props.showSnackBar(error.message);
    }
  };

  const alertsByRegion = async (region) => {
    try {
      var query = `query alertsforregion($region: String) {
            alertsforregion(region: $region){name, text, date}
            }`;
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          query,
          variables: { region },
        }),
      });
      let json = await response.json();
      setState({
        alertInformation: json.data.alertsforregion,
      });
      //call the snackbar
      props.showSnackBar(
        `Found ${json.data.alertsforregion.length} alerts for ${region}`
      );
    } catch (error) {
      console.log(error);
      //call the snackbar with the error
      props.showSnackBar(error.message);
    }
  };

  const alertsBySubregion = async (subregion) => {
    try {
      var query = `query alertsforsubregion($subregion: String) {
            alertsforsubregion(subregion: $subregion){name, text, date}
            }`;
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          query,
          variables: { subregion },
        }),
      });
      let json = await response.json();
      setState({
        alertInformation: json.data.alertsforsubregion,
      });
      //call the snackbar
      props.showSnackBar(
        `Found ${json.data.alertsforsubregion.length} alerts for ${subregion}`
      );
    } catch (error) {
      console.log(error);
      //call the snackbar with the error
      props.showSnackBar(error.message);
    }
  };
  const onChangeAutocomplete = (e, selectedOption) => {
    if (selectedOption) {
      setState({
        selectedAutocompleteOption: selectedOption,
      });
      switch (state.advisoryListType) {
        case "Traveller":
          alertsByTraveller(selectedOption);
          break;
        case "Region":
          alertsByRegion(selectedOption);
          break;
        case "Sub-Regions":
          alertsBySubregion(selectedOption);
          break;
        default:
          alertsByTraveller(selectedOption);
          break;
      }
    } else {
      setState({
        selectedAutocompleteOption: "",
      });
    }
  };

  const handleChangeAdvisoryType = (e, selectedOption) => {
    if (selectedOption) {
      setState({
        advisoryListType: selectedOption,
        alertInformation: [],
        selectedAutocompleteOption: "",
      });
      switch (selectedOption) {
        case "Traveller":
          fetchTravellers();
          break;
        case "Region":
          fetchRegions();
          break;
        case "Sub-Regions":
          fetchSubRegions();
          break;
        default:
          break;
      }
    }
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Card>
        <CardContent>
          <img src={logo} alt="travel logo" className="center" />
          <Typography color="secondary" className="titleHead">
            World Wide Travel Alerts
          </Typography>
          <Typography color="primary" className="titleSecondary">
            List Advisories by:
          </Typography>
          <div className="centerDiv">
            <RadioGroup
              aria-label="List advisories by"
              name="advisory type"
              value={state.advisoryListType}
              onChange={handleChangeAdvisoryType}
              style={{ flexDirection: "row" }}
            >
              <FormControlLabel
                value="Traveller"
                control={<Radio color="secondary" />}
                label="Traveller"
              />
              <FormControlLabel
                value="Region"
                control={<Radio color="secondary" />}
                label="Region"
              />
              <FormControlLabel
                value="Sub-Regions"
                control={<Radio color="secondary" />}
                label="Sub-Regions"
              />
            </RadioGroup>

            <Autocomplete
              id={state.advisoryListType}
              value={state.selectedAutocompleteOption}
              options={state.autocompleteOptions}
              getOptionLabel={(option) => option}
              style={{ width: 300, margin: 15 }}
              onChange={onChangeAutocomplete}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={state.advisoryListType}
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          {state.alertInformation.length > 0 && (
            <Table aria-label="alert data" style={{ margin: 10 }}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <div className="tableHeader">Country</div>
                  </TableCell>
                  <TableCell>
                    <div className="tableHeader">Alert Information</div>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.alertInformation.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      <h4 className="tableText">{row.name}</h4>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <h4 className="tableText">{row.text}</h4>
                      <br />
                      <h4 className="tableText">{row.date}</h4>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </MuiThemeProvider>
  );
};

export default ListAdvisoryComponent;
