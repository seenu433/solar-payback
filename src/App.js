import React, { useState }  from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import Button from '@material-ui/core/Button';

import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import ErrorIcon from "@material-ui/icons/Error";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
    marginTop: theme.spacing(2)
  },
  control: {
    marginTop: theme.spacing(2)
  },
  formMargin: {
    width: 400,
    marginTop: theme.spacing(3)
  },
  button: {
    marginTop: theme.spacing(3)
  }
}));

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0
    },
    "&:before": {
      display: "none"
    },
    "&$expanded": {
      margin: "auto"
    }
  },
  expanded: {}
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56
    }
  },
  content: {
    "&$expanded": {
      margin: "12px 0"
    }
  },
  expanded: {}
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiAccordionDetails);

const theme = createTheme();

function App() {
  const [data, setData] = useState('11');

  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();

  const [values, setValues] = React.useState({
    capitalLessIncentives: 15000,
    capitalInterestRatePercent: 3,
    avgMonthlyBill: 150,
    monthlyUtilityCharges: 30,
    annualRateIncreasePercent_consumption: 3,
    annualRateIncreasePercent_utility: 3
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: Number(event.target.value) });
  };

  const handleSliderChange = (prop) => (event, newValue) => {
    setValues({ ...values, [prop]: Number(newValue) });
  };

  function handleClick() {

    if(values.capitalLessIncentives > 50000 || values.capitalLessIncentives < 5000){
      values.capitalLessIncentives = 5000;
    }

    if(values.avgMonthlyBill > 1000 || values.avgMonthlyBill < 100){
      values.avgMonthlyBill = 100;
    }

    if(values.monthlyUtilityCharges > 100){
      values.monthlyUtilityCharges = 0;
    }

    if(values.capitalInterestRatePercent > 10){
      values.capitalInterestRatePercent = 0;
    }

    if(values.annualRateIncreasePercent_consumption > 10){
      values.annualRateIncreasePercent_consumption = 0;
    }

    if(values.annualRateIncreasePercent_utility > 10){
      values.annualRateIncreasePercent_utility = 0;
    }

    console.log(values);

    // Send data to the backend via POST
    fetch('/api/calculate', {  // Enter your IP address here

      method: 'POST', 
      mode: 'cors', 
      body: JSON.stringify(values) // body data type must match "Content-Type" header

    }).then(response =>{
      console.log(response);
      return response.json();
    }).then(text =>{
      setData(text);
      console.log(text);
    })   
  }

  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="#">
          Solar payback
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const [expanded, setExpanded] = React.useState("panel1");

  const handleAccordianChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container maxWidth="lg">
      <main>
        <Paper
          sx={{
            position: "relative",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
          }}
        >
          <Grid container>
            <Grid item>
              <Box
                sx={{
                  position: "relative",
                  p: { xs: 3 },
                  pr: { md: 0 },
                  background:
                    "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  color: "white"
                }}
              >
                <Typography
                  component="h1"
                  variant="h3"
                  color="inherit"
                  gutterBottom
                >
                  Will my solar pay for itself?
                </Typography>
                <Typography variant="h5" color="inherit" paragraph>
                  The objective of this effort is to understand the economic
                  aspects of going residential solar and the time it may take
                  before my investment start paying for itself.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Grid
          container
          spacing={5}
          sx={{ mt: 3 }}
          className={classes.control}
        >
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              Residential Solar
            </Typography>
            <Divider />
            <Typography gutterBottom>
              There could be many advantages of going solar, from
              environmental to economics. The web lists some of them:
              <ul>
                <li>
                  Solar reduces (and sometimes eliminates) electric bills
                </li>
                <li>Solar Panels improve the value of your home</li>
                <li>Going Solar reduces your carbon emissions</li>
                <li>You can earn money back on your solar investment</li>
              </ul>
              Though we largely agree with the green aspects and the
              advantages to the future generation, not everything from the
              economics side is true. Few things to keep in mind are:
              <ul>
                <li>Not every utility buys the excess energy produced</li>
                <li>
                  There will often be a monthly net metering charge to connect
                  to the grid
                </li>
                <li>
                  You are making an upfront investment which might yield a
                  return if invested
                </li>
                <li>
                  There would be maintenance involved when installed on the
                  roof. ex. roof upgrades
                </li>
                <li>
                  Community solar projects are available without installations
                  and upfront cost.
                </li>
              </ul>
              Use this calculator to estimate how long it will take to
              break-even on your investment
            </Typography>
            <div>
              <Accordion
                square
                expanded={expanded === "panel1"}
                onChange={handleAccordianChange("panel1")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography>Capital (without Incentives)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Enter the total cost of the system by discounting any
                    federal, state, local, employer or provider incentives.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                square
                expanded={expanded === "panel2"}
                onChange={handleAccordianChange("panel2")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography>Interest Rate on Capital</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Any capital should be accounted for growth. Depending on
                    your potential you can gain interest on your capital or
                    apply other strategies to grow it.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                square
                expanded={expanded === "panel3"}
                onChange={handleAccordianChange("panel3")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3d-content"
                  id="panel3d-header"
                >
                  <Typography>Average Monthly Bill</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    This is your average monthly energy bill or the portion of
                    the energy bill you are covering with solar.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                square
                expanded={expanded === "panel4"}
                onChange={handleAccordianChange("panel4")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4d-content"
                  id="panel4d-header"
                >
                  <Typography>Monthly Utility Charges</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Any other monthly charges that you may incur on your
                    installation. For ex. Net metering charges etc.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                square
                expanded={expanded === "panel5"}
                onChange={handleAccordianChange("panel5")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel5d-content"
                  id="panel5d-header"
                >
                  <Typography>
                    Annual Rate Increase Percent on Consumption
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Energy prices change every year and it should be accounted
                    into your break-even calculation. It can be any value from
                    0 to 10.
                  </Typography>
                  <Link
                    href="https://www.solarreviews.com/blog/average-electricity-cost-increase-per-year#:~:text=According%20to%20the%20U.S.%20Energy%20Information%20Administration%20%28EIA%29%2C,recent%20year%20for%20which%20annual%20data%20is%20available%29."
                    onClick={preventDefault}
                  >
                    Refer
                  </Link>
                </AccordionDetails>
              </Accordion>
              <Accordion
                square
                expanded={expanded === "panel6"}
                onChange={handleAccordianChange("panel6")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel6d-content"
                  id="panel6d-header"
                >
                  <Typography>
                    Annual Rate Increase Percent on Utility Charges
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    With everything rising, you can assume that the utility
                    charges may go up at the same rate as the electricity
                    charges. It can be any value from 0 to 10.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper background="red" elevation={0} sx={{ p: 2 }}>
              <Box sx={{
                  position: "relative",
                  p: { xs: 3 },
                  pr: { md: 0 },
                  background:
                    "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)",
                  color: "white"
                }}>
              <Typography variant="h6" gutterBottom>
                <ErrorIcon /> Disclaimer
              </Typography>
              <Typography>
                The below calculation is a perspective and there may be many
                other factors which impacts the payback period.
              </Typography>
              </Box>
            </Paper>
            <Typography
              variant="h6"
              className={classes.control}
              gutterBottom
              sx={{ mt: 3 }}
            >
              Calculator
            </Typography>
            <form className={classes.root} validate autoComplete="off">
              <div>
                <Typography
                  id="capital-label"
                  variant="button"
                  display="block"
                  className={classes.formMargin}
                  gutterBottom
                >
                  Capital (Without Incentives)
                </Typography>
                <TextField
                  id="standard-number"
                  type="number"
                  value={values.capitalLessIncentives}
                  onChange={handleChange("capitalLessIncentives")}
                  inputProps={{
                    step: 1,
                    min: 5000,
                    max: 50000,
                    type: "number",
                    "aria-labelledby": "capital-label"
                  }}
                />
                <Typography
                  id="capital-interest-label"
                  variant="button"
                  display="block"
                  className={classes.formMargin}
                  gutterBottom
                >
                  Interest Rate on Capital
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    <Slider
                      value={values.capitalInterestRatePercent}
                      onChange={handleSliderChange(
                        "capitalInterestRatePercent"
                      )}
                      aria-labelledby="capital-interest-label"
                      step={1}
                      min={0}
                      max={10}
                    />
                  </Grid>
                  <Grid item>
                    <Input
                      className={classes.input}
                      value={values.capitalInterestRatePercent}
                      margin="dense"
                      onChange={handleChange("capitalInterestRatePercent")}
                      inputProps={{
                        step: 1,
                        min: 0,
                        max: 10,
                        type: "number",
                        "aria-labelledby": "capital-interest-label"
                      }}
                    />
                  </Grid>
                </Grid>
                <Typography
                  id="avg-monthly-bill-label"
                  variant="button"
                  display="block"
                  className={classes.formMargin}
                  gutterBottom
                >
                  Average Monthly Bill
                </Typography>
                <TextField
                  id="standard-number"
                  type="number"
                  value={values.avgMonthlyBill}
                  onChange={handleChange("avgMonthlyBill")}
                  inputProps={{
                    step: 1,
                    min: 100,
                    max: 1000,
                    type: "number",
                    "aria-labelledby": "avg-monthly-bill-label"
                  }}
                />
                <Typography
                  id="monthly-util-bill-label"
                  variant="button"
                  display="block"
                  className={classes.formMargin}
                  gutterBottom
                >
                  Monthly Utility Charges
                </Typography>
                <TextField
                  id="standard-number"
                  type="number"
                  value={values.monthlyUtilityCharges}
                  onChange={handleChange("monthlyUtilityCharges")}
                  inputProps={{
                    step: 1,
                    min: 0,
                    max: 1000,
                    type: "number",
                    "aria-labelledby": "monthly-util-bill-label"
                  }}
                />
                <Typography
                  id="rate-increase-label"
                  variant="button"
                  display="block"
                  className={classes.formMargin}
                  gutterBottom
                >
                  Annual Rate Increase Percent on Consumption
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    <Slider
                      value={values.annualRateIncreasePercent_consumption}
                      onChange={handleSliderChange(
                        "annualRateIncreasePercent_consumption"
                      )}
                      aria-labelledby="rate-increase-label"
                      step={1}
                      min={0}
                      max={10}
                    />
                  </Grid>
                  <Grid item>
                    <Input
                      className={classes.input}
                      value={values.annualRateIncreasePercent_consumption}
                      margin="dense"
                      onChange={handleChange(
                        "annualRateIncreasePercent_consumption"
                      )}
                      inputProps={{
                        step: 1,
                        min: 0,
                        max: 10,
                        type: "number",
                        "aria-labelledby": "rate-increase-label"
                      }}
                    />
                  </Grid>
                </Grid>
                <Typography
                  id="rate-increase-util-label"
                  variant="button"
                  display="block"
                  className={classes.formMargin}
                  gutterBottom
                >
                  Annual Rate Increase Percent on Utility Charges
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    <Slider
                      value={values.annualRateIncreasePercent_utility}
                      onChange={handleSliderChange(
                        "annualRateIncreasePercent_utility"
                      )}
                      aria-labelledby="rate-increase-util-label"
                      step={1}
                      min={0}
                      max={10}
                    />
                  </Grid>
                  <Grid item>
                    <Input
                      className={classes.input}
                      value={values.annualRateIncreasePercent_utility}
                      margin="dense"
                      onChange={handleChange(
                        "annualRateIncreasePercent_utility"
                      )}
                      inputProps={{
                        step: 1,
                        min: 0,
                        max: 10,
                        type: "number",
                        "aria-labelledby": "rate-increase-util-label"
                      }}
                    />
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={handleClick}
                  startIcon={<EqualizerIcon />}
                >
                  Calculate
                </Button>
                <Typography
                  variant="h5"
                  className={classes.formMargin}
                  gutterBottom
                > 
                  <AccessAlarmIcon color="secondary"/> It takes around {data} years for your investment to payback
                </Typography>
              </div>
            </form>
          </Grid>
        </Grid>
      </main>
    </Container>
    <Box component="footer" sx={{ bgcolor: "background.paper", py: 6 }}>
      <Container maxWidth="lg">
        <Copyright />
      </Container>
    </Box>
  </ThemeProvider>
  );
}

export default App;
