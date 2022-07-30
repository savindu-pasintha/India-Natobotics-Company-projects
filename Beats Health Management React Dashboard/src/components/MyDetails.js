import React from "react";
import clsx from "clsx";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import axios from "axios";
import LeftsideMenu from "./LeftsideMenu";
import "react-toastify/dist/ReactToastify.css";
import { ToastError, ToastSuccess } from "../service/toast/Toast";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import { createStyles, Theme } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import CloudUpload from "@material-ui/icons/CloudUpload";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import logodb from "../img/Beats-health-logo.png";
import PropTypes from "prop-types";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Widget from "./doublebox";
import ImageUploader from "react-images-upload";
import Select from 'react-select';

import MaterialTable from "material-table";
import { useState } from "react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeUpdate from './StripeUpdate';
import StateManager from "react-select";

import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MUIselect from "@material-ui/core/Select";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from "@material-ui/core/MenuItem";
import TextField from '@mui/material/TextField';

const tableIcons = {
  Add: forwardRef((props, ref) => <>
    {/*<AddBox  {...props} ref={ref} style={{ color: "red" }} />*/}
    <Button
      variant="contained"
      className="btn-primary addstaff"
      style={{ margin: 0, padding: 0 }}
    >
      <h style={{ fontSize: "14px", color: "white" }}>Add Staff</h>
    </Button>
  </>),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


const drawerWidth = 240;
const stripePromise = loadStripe('pk_test_51Ij5ayC2V2ajAK3d3juQBP9WJa8iBbj28QCpVyvCFfK2GNYNVWZY3ykXnBtW63PZcr1MTfQApRXgArNU3jSpI6ac004zNPrvoA');

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    textAlign: 'left',
    borderBottom: '1px dotted pink',
    padding: 20,
  }),
}



const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  customWidth: { fontSize: "1px" },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
    /**minWidth:120 */
    minWidth: 120,
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
    },
    input: {},

    paper: {
      padding: theme.spacing(0),
      color: theme.palette.text.secondary,
    },
  })
)(InputBase);

export default function MiniDrawer() {
  const classes = useStyles();
  const { id } = useParams();
  const [open] = React.useState(false);

  const [value, setValue] = React.useState(0);
  const [providerName, setProviderName] = React.useState("");
  const [add1, setAdd1] = React.useState("");
  const [add2, setAdd2] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [zip, setZip] = React.useState("");




  const [currentPass, setCurrentPass] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const [typeOfPractice, setTypeofPractice] = React.useState("");
  const [typeOfService, setTypeofService] = React.useState("");
  const [pictures, setProfilePicture] = React.useState({ image: "", url: "" });
  const [addressLine1, setAddressLine1] = React.useState("");
  const [addressLine2, setAddressLine2] = React.useState("");
  const [cityName, setCityName] = React.useState("");
  const [stateName, setStateName] = React.useState("");
  const [countryName, setCountryName] = React.useState("");
  const [zipCode, setZipCode] = React.useState("");
  const [taxonomyDesc, setTaxonomyDesc] = React.useState("");
  const [taxonomyCode, setTaxonomyCode] = React.useState("");
  const [taxonomyGroup, setTaxonomyGroup] = React.useState("");
  const [taxonomyState, setTaxonomyState] = React.useState("");
  const [taxonomyLicense, setTaxonomyLicense] = React.useState("");
  const [contactNumber, setContactNumber] = React.useState("");
  const uploadInputRef = React.useRef(null);
  const [isDateChecked, setisDateChecked] = React.useState(false);
  const [isOnDateServiceChecked, setOnDateServiceChecked] =
    React.useState(false);
  const [noOfDays, setNumbOfDays] = React.useState(0);
  const [npiDetails, setNpiDetails] = React.useState("");

  const [nameError, setNameError] = React.useState({
    error: false,
    label: "",
    helperText: "",
    validateInput: false,
  });

  //for specialty ui drop down
  const [specialtiesListV, setSpecialtiesListV] = React.useState([]);


  React.useEffect(() => {
    fetchServiceType();
    fetchProfilePicture();
    fetchSpecialtiesList();
  }, []);

  /****function to fetch Provider Profile Picture****/
  const fetchProfilePicture = async () => {
    let fileUrl = "";
    const attData = JSON.parse(localStorage.getItem("attributes"));
    try {
      fileUrl = attData.find((x) => x.name === "url").value;
    } catch (error) {
      console.log("url missing in profile");
    }
    if (fileUrl === "" || fileUrl === undefined || fileUrl === null) {
      return false;
    }
    let profilePictureConfig = {
      method: "post",
      url: process.env.REACT_APP_BEATS_FETCH_PROFILE_PICTURE,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("idToken"),
      },
      data: {
        key: fileUrl,
      },
    };

    let specialtiesConfig = {
      method: "get",
      url: process.env.REACT_APP_BEATS_GET_SPECIALTIES_API,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("idToken"),
      }
    };

    try {
      let profileData = await axios(profilePictureConfig);
      if (profileData !== undefined) {
        setProfilePicture({ image: "", url: profileData.data });
      }
    } catch (e) {
      console.log("failed to fetch Provider Image");
    }
  };

  const fetchServiceType = async () => {
    let serviceConfig = {
      method: "get",
      url: process.env.REACT_APP_BEATS_LIST_SERVICE_TYPE_API,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("idToken"),
      },
    };

    let providerConfig = {
      method: "post",
      url: process.env.REACT_APP_BEATS_FETCH_PROVIDER_DETAILS,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("idToken"),
      },
    };

    const attData = JSON.parse(sessionStorage.getItem("attributes"));

    setLoading(true);
    const typeofPracticeAttr = attData.find(
      (x) => x.name === "custom:TypeOfPractice"
    ).value;
    let typeofServiceAttr = "30";

    try {
      typeofServiceAttr = attData.find(
        (x) => x.name === "custom:TypeOfService"
      ).value;
    } catch (error) {
      console.log("Default service id missing in profile");
    }

    try {
      let service = await axios(serviceConfig);
      let serviceType = "";
      for (var j = 0; j < service.data.length; j++) {
        if (service.data[j].service_type_Id === parseInt(typeofServiceAttr)) {
          serviceType = service.data[j].service_name;
          break;
        }
      }
      setTypeofService(serviceType);
      setTypeofPractice(typeofPracticeAttr);

      let provider = await axios(providerConfig);
      console.log("Provider call data: ", provider);

      setAddressLine1(provider.data[0].address_line1);
      setAddressLine2(provider.data[0].address_line2);
      setCityName(provider.data[0].city);
      setStateName(provider.data[0].state);
      setCountryName(provider.data[0].country);
      setZipCode(provider.data[0].zip);
      setTaxonomyDesc(provider.data[0].primary_taxonomy_desc);
      setTaxonomyCode(provider.data[0].primary_taxonomy_code);
      setTaxonomyGroup(provider.data[0].primary_taxonomy_group);
      setTaxonomyLicense(provider.data[0].primary_taxonomy_license);
      setTaxonomyState(provider.data[0].primary_taxonomy_state);
      setContactNumber(provider.data[0].contact_number);

      setisDateChecked(provider.data[0].onDateService);
      setOnDateServiceChecked(provider.data[0].daysBeforeDateOfService);
      setNumbOfDays(provider.data[0].daysbefore);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    ////debugger;
  };

  const showLoadMask = (status) => {
    setLoading(status);
  };
  const updatePass = () => {
    // ////debugger;
    const attData = JSON.parse(sessionStorage.getItem("attributes"));
    const nameOfHospital = attData.find(
      (x) => x.name === "custom:Organization"
    ).value;
    const npi = attData.find((x) => x.name === "custom:NPI").value;
    const typeOfPractice = attData.find(
      (x) => x.name === "custom:TypeOfPractice"
    ).value;
    const typeOfService = attData.find(
      (x) => x.name === "custom:TypeOfService"
    ).value;
    // if (currentPass === "") {
    //   ToastError("Current Password is required");
    //   return false;
    // }
    // if (newPassword === "") {
    //   ToastError("New Password is required");
    //   return false;
    // }
    // if (confirmPass === "") {
    //   ToastError("Confirm Password is required");
    //   return false;
    // }

    if (providerName === "") {
      ToastError("Name of Provider/Practice is required");
      return false;
    }

    // if (newPassword !== confirmPass) {
    //   ToastError("New Password and Confirm Password are not Matching");
    //   return false;
    // }

    let data = JSON.stringify({

      address1: add1,
      address2: add2,
      city: city,
      state: state,
      postalCode: zip,
      password: currentPass,
      newPassword: newPassword,
      Organization: providerName,
      NPI: parseInt(npi),
      TypeOfPractice: typeOfPractice,
    });
    // let data = JSON.stringify({
    //   password: currentPass,
    //   newPassword: newPassword,
    //   Organization: nameOfHospital,
    //   NPI: parseInt(npi),
    //   TypeOfPractice: typeOfPractice,
    // });
    console.log(data);
    let config = {
      method: "post",
      url: process.env.REACT_APP_BEATS_USER_UPDATE_API,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("idToken"),
        "is-update": "update",
      },
      data: data,
    };
    showLoadMask(true);
    axios(config)
      .then(function (response) {
        ////debugger;
        showLoadMask(false);
        ToastSuccess("Successfully Updated.");
      })
      .catch(function (error) {
        ////debugger;
        showLoadMask(false);
        ToastError("Update Failed!");
        console.log(error);
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const updateNpiData = (data) => {
    setNpiDetails(data);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const onDrop = (event) => {
    let obj = event.target.files[0];
    obj["image"] = obj;
    obj["url"] = URL.createObjectURL(obj);
    setProfilePicture(obj);
  };

  const openFileUploader = () => {
    uploadInputRef.current.click();
  };

  const uploadProfile = async () => {
    let pictureObj = pictures;
    const attributeData = JSON.parse(localStorage.getItem("attributes"));
    let providerId = attributeData.find((x) => x.name === "sub").value;
    if (pictureObj["image"] === "") {
      ToastError("Please select image file to upload");
      return false;
    }
    var data = new FormData();
    let filename = pictureObj["image"].name;
    data.append("file", pictureObj["image"]);
    const result = await toBase64(pictureObj["image"]).catch((e) => Error(e));
    if (result instanceof Error) {
      console.log("Error: ", result.message);
      return;
    }

    let convertedFile = result.split(",")[1];
    data.append("file", convertedFile);
    let fileData = {
      fileData: convertedFile,
    };

    let config = {
      method: "post",
      url: process.env.REACT_APP_BEATS_PROFILE_UPLOAD,
      headers: {
        "Content-Type": "application/json",
        providerid: providerId,
        filename: filename,
        "type-of-file": pictureObj["image"].type,
        Authorization: "Bearer " + sessionStorage.getItem("idToken"),
      },
      data: fileData,
    };

    setLoading(true);
    axios(config)
      .then(function (response) {
        ////debugger;
        setLoading(false);
        ToastSuccess("Profile picture is updated successfully");
        let filename = pictures["image"].name;
        setProfilePicture({ ...pictures, image: "" });
        let newArray = attributeData.filter((val) => val.name !== "url");
        let providerId = attributeData.find((val) => val.name === "sub").value;
        newArray.push({ name: "url", value: providerId + "/" + filename });
        localStorage.setItem("attributes", JSON.stringify(newArray));
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
        ToastError(error.response.data.error);
        setProfilePicture({ url: "", image: "" });
      });
  };

  const saveUserConfig = () => {
    const daysbeforeservice = isDateChecked ? 1 : 0;
    const dateservice = isOnDateServiceChecked ? 1 : 0;
    const noDays = daysbeforeservice ? noOfDays : 0;
    if (!daysbeforeservice) {
      setNumbOfDays(0);
    }
    let data = JSON.stringify({
      onDateService: dateservice,
      daysBeforeDateOfService: daysbeforeservice,
      daysbefore: noDays,
    });
    let config = {
      method: "post",
      url: process.env.REACT_APP_BEATS_UPDATE_PROVIDER_PROFILE,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("idToken"),
      },
      data: data,
    };
    setLoading(true);
    axios(config)
      .then(function (response) {
        setLoading(false);
        ToastSuccess("Configuration details saved successfully");
      })
      .catch(function (error) {
        setLoading(false);
        ToastError("Couldn't save configuration information");
        console.log(error);
      });
  };

  const saveNpiDetails = () => {
    if (npiDetails === "") {
      saveUserConfig();
      return;
    }

    let npidata = JSON.stringify({
      attr: npiDetails,
    });
    let config = {
      method: "post",
      url: process.env.REACT_APP_BEATS_SAVE_PAYER_API,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("idToken"),
      },
      data: npidata,
    };
    setLoading(true);
    axios(config)
      .then(function (response) {
        setLoading(false);
        saveUserConfig();
      })
      .catch(function (error) {
        setLoading(false);
        ToastError("Couldn't save configuration information");
        console.log(error);
      });
  };

  const data = JSON.parse(localStorage.getItem("attributes"));
  const nameOfHospital = data.find(
    (x) => x.name === "custom:Organization"
  ).value;
  const npi = data.find((x) => x.name === "custom:NPI").value;
  const email = data.find((x) => x.name === "email").value;
  const contact = "";
  const typeOfPracticeVal =
    typeOfPractice === "H"
      ? "Institution/Organization"
      : typeOfPractice === "AT"
        ? "Individual"
        : "";
  const typeOfServiceVal = typeOfService ? typeOfService : "";

  const appointmentHourReminderOptions = [{ value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },
  { value: '10', label: '10' },
  { value: '11', label: '11' },
  { value: '12', label: '12' },
  ];

  const secondReminder = [{ value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },
  ];

  function formatPhoneNumber(value) {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 6) return phoneNumber;
    return `${phoneNumber.slice(0, 5)}-${phoneNumber.slice(5, 10)}`;
  }
  
  const [columns, setColumns] = useState([
    {
      title: 'Title', 
      field: 'title',
      lookup: {'Dr.':'Dr.', 'Prof.':'Prof.', 'Mr.':'Mr.', 'Ms.':'Ms.', 'Mrs.':'Mrs.'}
    },
    // { title: 'Name of Clinician/Staff', field: 'name' },
    {
      title: "First Name",
      field: "firstName",
      editComponent: props => (
      <TextField
        type="text"
        variant="standard"
        error={!props.value ? true : (props.value.length < 2) } //this works
        helperText={!props.value ? "Required" : (props.value.length < 2 ? 'Required' : " ")}
        value={props.value ? props.value : ""}
        onChange={e => {
          if (nameError.validateInput) {
              setNameError({
                ...nameError,
                validateInput: false
              });
          }
          props.onChange(e.target.value);
        }}
      />
      )
    },
    {
      title: "Last Name",
      field: "lastName",
      editComponent: props => (
      <TextField
        type="text"
        variant="standard"
        error={!props.value ? true : (props.value.length < 2)}
        helperText={!props.value ? "Required" : (props.value.length < 2 ? 'Required' : ' ')}
        value={props.value ? props.value : ""}
        onChange={e => {
          if (nameError.validateInput) {
              setNameError({
                ...nameError,
                validateInput: false
              });
          }
          props.onChange(e.target.value);
        }}
      />
      )
    },
    { 
      title: 'Gender', 
      field: 'gender',
      lookup: {"M": "Male", "F": "Female"}
    },

    {
      title: 'License No./NPI',
      field: "mciNo",
      editComponent: props => (
      <TextField
        type="text"
        variant="standard"
        error={!props.value ? true : (props.value.length < 2)}
        helperText={!props.value ? "Required" : (props.value.length < 2 ? 'Required' : ' ')}
        value={props.value ? props.value : ""}
        onChange={e => {
          if (nameError.validateInput) {
              setNameError({
                ...nameError,
                validateInput: false
              });
          }
          props.onChange(e.target.value);
        }}
      />
      )
    },
    {
      title: 'Email',
      field: "email",
      editComponent: props => (
      <TextField
        type="text"
        variant="standard"
        error={!props.value ? true : ( !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(props.value) ) }
        helperText={!props.value ? "Required" : ( !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(props.value) ? "Invalid email" : " ") }
        value={props.value ? props.value : ""}
        onChange={e => {
          if (nameError.validateInput) {
              setNameError({
                ...nameError,
                validateInput: false
              });
          }
          props.onChange(e.target.value);
        }}
      />
      )
    },
    {
      title: 'Cell Number',
      field: "contactNumber",
      editComponent: props => (
      <TextField
        type="tel"
        variant="standard"
        error={!props.value ? true : ( !/^\D*(\d\D*){10}$/.test(props.value) ) }
        helperText={!props.value ? "Required" : ( !/^\D*(\d\D*){10}$/.test(props.value) ? "10 digits" : " ") }
        value={props.value ? props.value : ""}
        onChange={e => {
          if (nameError.validateInput) {
              setNameError({
                ...nameError,
                validateInput: false
              });
          }
          props.onChange(e.target.value);
        }}
      />
      )
    },
    {
      title: 'Specialty',
      field: "specialities",
      editComponent: props => (
      <TextField
        type="text"
        variant="standard"
        error={!props.value ? true : (props.value.length < 3)}
        helperText={!props.value ? "Required" : (props.value.length < 3 ? 'Required' : ' ')}
        value={props.value ? props.value : ""}
        onChange={e => {
          if (nameError.validateInput) {
              setNameError({
                ...nameError,
                validateInput: false
              });
          }
          props.onChange(e.target.value);
        }}
      />
      )
    },
    {
      title: 'Practicing Since',
      field: "practisingMedSince",
      editComponent: props => (
      <TextField
        type="text"
        variant="standard"
        error={!props.value ? true : ( !/^\D*(\d\D*){4}$/.test(props.value) ) }
        helperText={!props.value ? "Required" : ( !/^\D*(\d\D*){4}$/.test(props.value) ? "YYYY year" : " ") }
        value={props.value ? props.value : ""}
        onChange={e => {
          if (nameError.validateInput) {
              setNameError({
                ...nameError,
                validateInput: false
              });
          }
          props.onChange(e.target.value);
        }}
      />
      )
    },

]);

  const [staffData, setStaffData] = useState([
    { title: 'Dr.', firstName: 'Mehmet', middleName: 'Zoya', lastName: 'Baran', gender: 'male', mciNo: 11222929222, email: "BaranMehmet@gmail.com", contactNumber: "637-726-7222", practisingMedSince: 2012, specialities: "Dental" },
    { title: 'Mr.', firstName: 'Zerya', middleName: '', lastName: 'Betul', gender: 'female', mciNo: 11229992922, email: "ZeryaBetul@gmail.com", contactNumber: "757-552-6232", practisingMedSince: 1978, specialities: "Cardiology" },
  ]);

  const addStaffData = (staffData) => {

    let config = {
      method: "post",
      url: "https://4feobrcpq3.execute-api.us-east-2.amazonaws.com/Physician/addPhysician",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("idToken"),
      },
      data: staffData,
    };
    setLoading(true);
    axios(config)
      .then(function (response) {
        console.log(response);
        ToastSuccess("Added Staff Member");
        setStaffData(oldData => [...oldData, staffData]);
        setLoading(false);
        // saveUserConfig();
      })
      .catch(function (error) {
        setLoading(false);
        ToastError("Couldn't save configuration information");
        console.log(error);
      });
  };


  const updateStaffData = () => {

    let data = staffData[staffData.length - 1];

    let config = {
      method: "post",
      url: "https://4feobrcpq3.execute-api.us-east-2.amazonaws.com/Physician/updatePhysician",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("idToken"),
      },
      data: data,
    };
    setLoading(true);
    axios(config)
      .then(function (response) {
        console.log(response);
        ToastSuccess("Added Staff Member");
        setLoading(false);
        // saveUserConfig();
      })
      .catch(function (error) {
        setLoading(false);
        ToastError("Couldn't save configuration information");
        console.log(error);
      });
  };

  const deleteStaffData = () => {

    let data = { physicianId: 1 };

    let config = {
      method: "post",
      url: "https://4feobrcpq3.execute-api.us-east-2.amazonaws.com/Physician/deletePhysician",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("idToken"),
      },
      data: data,
    };
    setLoading(true);
    axios(config)
      .then(function (response) {
        console.log(response);
        ToastSuccess("Deleted staff member");
        setLoading(false);
        // saveUserConfig();
      })
      .catch(function (error) {
        setLoading(false);
        ToastError("Couldn't delete staff member");
        console.log(error);
      });
  };


  const fetchStaffData = async () => {

    let staffDataConfig = {
      method: "post",
      url: "https://4feobrcpq3.execute-api.us-east-2.amazonaws.com/Physician/getPhysicians",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("idToken"),
      },
    };
    try {
      let data = await axios(staffDataConfig);
      if (data !== undefined) {
        setStaffData({ data });
        console.log(data);
        ToastSuccess("Fetch Success");
      }
    } catch (e) {
      console.log("failed to fetch  staff data");
    }
  };

  //for specialty ui drop down
  //const [specialtiesListV, setSpecialtiesListV] = React.useState([]);
  const [spectl, setSpectl] = React.useState("");
  const fetchSpecialtiesList = async () => {
    let specialtiesConfigure = {
      method: "get",
      url: process.env.REACT_APP_BEATS_GET_SPECIALTIES_API,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("idToken"),
      },
    };
    //var dt = await axios(specialtiesConfigure);
    //console.log("dt", dt.data);
    try {
      let specialties = await axios(specialtiesConfigure);
      //console.log("datauu", specialties.data);

      let specialtiesData = [];
      let specialtiesList = [];
      let tempSpecialtiesList = [];
      for (var i = 0; i < specialties.data.length; i++) {
        if (tempSpecialtiesList.indexOf(specialties.data[i].specialty_name) > -1) {
          continue;
        }
        else {
          let specialtyObj = {
            value: specialties.data[i].specialty_name,
            label: specialties.data[i].specialty_name,
          };
          specialtiesList.push(specialtyObj);
          tempSpecialtiesList.push(specialties.data[i].specialty_name);
        }
        let obj = {
          value: specialties.data[i].specialty_name,
          label: specialties.data[i].specialty_name,

          visit_reason: specialties.data[i].visit_reason,
          specialty_name: specialties.data[i].specialty_name,
        };
        specialtiesData.push(obj);
      }
      setSpecialtiesListV(specialtiesData);
    } catch (error) {
      // setSpecialtiesListV([{ value: "Data Not load", label: "Error ! Data Not load 848" }]);
      console.log("my profile specialty data not load", error);
    }
  }
  const getSpeciality = specialtiesListV.map((val) => <MenuItem value={val.value} > {val.label} </MenuItem>)

  return (
    <div className={classes.root}>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <CssBaseline />
      <ToastContainer />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <img src={logodb} className="dblogo" alt="Beats Logo" />
          {/*  <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton> */}
        </div>
        <LeftsideMenu />

        {/*    <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <main id="maindiv" className={classes.content}>
        <div>
          <Grid className="disblock">
            <div className="maintab">
              <AppBar position="static">
                {process.env.REACT_APP_REGION == 'US' &&
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                  >
                    <Tab label="Healthcare Provider Details"  {...a11yProps(0)} />
                    <Tab label="Staff Details" {...a11yProps(1)} />
                    <Tab label="My Subscriptions" {...a11yProps(2)} />
                  </Tabs>
                }
                {process.env.REACT_APP_REGION == 'INDIA' &&
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                  >
                    <Tab label="My Profile"  {...a11yProps(0)} />
                    <Tab label="Staff Details" {...a11yProps(1)} />
                    <Tab label="My Subscriptions" {...a11yProps(2)} />
                  </Tabs>
                }

              </AppBar>
              <TabPanel value={value} index={0}>
                <Grid item xs={12} sm={12}>
                  <Paper className="pad20  bx-shadow dbbox">
                    <Box className="toprightuploadicon  bx-shadow">
                      <CloudUpload onClick={uploadProfile}></CloudUpload>
                    </Box>
                    <Box className="toprighticon  bx-shadow">
                      <input
                        type="file"
                        ref={uploadInputRef}
                        style={{ display: "none" }}
                        onChange={(event) => {
                          onDrop(event);
                        }}
                      />
                      <EditIcon onClick={openFileUploader}></EditIcon>
                    </Box>{" "}
                    <p className="title1 mb20">My Profile</p>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={8} md={9}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <p className="bodycopyg1">
                              {" "}
                              {process.env.REACT_APP_REGION == 'INDIA' ? "Name of the Hospital/Clinic/Lab" : "Name of the Provider / Practice"}
                            </p>
                            {/* <p className="copytitle1">{nameOfHospital}</p> */}
                            <BootstrapInput
                              className="primary-input mb20 width100p"

                            //  placeholder="Name of the provider/practice"
                              onChange={(e) => {
                                setProviderName(e.target.value);
                              }}
                            />
                          </Grid>
                          {/* <Grid item xs={12} sm={6}>
                            <p className="bodycopyg1">
                              National Provider Identifier (NPI)
                            </p>
                            <p className="copytitle1">{npi}</p>
                          </Grid> */}
                          <Grid item xs={12} sm={6}>
                            <p className="bodycopyg1">
                              {process.env.REACT_APP_REGION == 'INDIA' ? "License / Registration No" : "Type of Service"}
                            </p>
                            <p className="copytitle1">{typeOfServiceVal}</p>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <p className="bodycopyg1">
                              {" "}
                              Registered email address
                            </p>
                            <p className="copytitle1">{email}</p>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <p className="bodycopyg1">
                              {" "}
                              Registered contact number
                            </p>
                            <p className="copytitle1">{contactNumber}</p>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            {/*<p className="bodycopyg1">
                              {process.env.REACT_APP_REGION == 'INDIA' ? "Specialty" : "Type of Practice"}
                        </p>
                        className="bodycopyg1" className={useStyles.formControl}
                        */}
                            <FormControl variant="outlined" label="outlined" style={{ width: "100%", height: "50px", color: "red", margin: "0px" }} >
                              <InputLabel id="myprofile-speciality-label">
                                {process.env.REACT_APP_REGION == 'INDIA' ? "Specialty" : "Type of Practice"}
                              </InputLabel>
                              <MUIselect
                                labelId="myprofile-speciality-label"
                                id="myprofileSpecialty"
                                value={spectl}
                                onChange={(e) => {
                                  setSpectl(e.target.value);
                                }}
                               
                                fullWidth
                                label="Speciality"

                              >
                                {getSpeciality}
                              </MUIselect>
                            </FormControl>

                            <p className="copytitle1">{typeOfPracticeVal}{""}</p>
                          </Grid>
                          {/*  <Grid item xs={12} sm={6}>
                            <p className="bodycopyg1"> 
                            {process.env.REACT_APP_REGION == 'INDIA' ? "License / Registration No" : "Type of Service"}
                            </p>
                            <p className="copytitle1">{typeOfServiceVal}</p>
                          </Grid> */}
                          {process.env.REACT_APP_REGION == 'INDIA' &&
                            <Grid item xs={12} sm={6}>
                              <p></p>
                            </Grid>
                          }

                          {process.env.REACT_APP_REGION == 'US' &&
                            <Grid item xs={12} sm={6}>
                              <p className="bodycopyg1"> Taxonomy Details</p>
                              <p className="copytitle2">Desc: {taxonomyDesc}</p>
                              <p className="copytitle2">Code: {taxonomyCode}</p>
                              <p className="copytitle2">
                                Group: {taxonomyGroup} { }
                              </p>
                              <p className="copytitle2">
                                Licence: {taxonomyLicense}
                              </p>
                              <p className="copytitle2">State: {taxonomyState}</p>
                            </Grid>
                          }

                          <Grid item xs={12} sm={6}>
                            <p className="bodycopyg1"> Physical address</p>
                            <BootstrapInput
                              className="primary-input mb20 width100p"

                              placeholder="Address Line 1"
                              onChange={(e) => {
                                setAdd1(e.target.value);
                              }}
                            />
                            <BootstrapInput
                              className="primary-input mb20 width100p"

                              placeholder="Address Line 2 "
                              onChange={(e) => {
                                setAdd2(e.target.value);
                              }}
                            />

                            <BootstrapInput
                              className="primary-input mb20 width100p"

                              placeholder="City"
                              onChange={(e) => {
                                setCity(e.target.value);
                              }}
                            />
                            <BootstrapInput
                              className="primary-input mb20 width100p"

                              placeholder="State"
                              onChange={(e) => {
                                setState(e.target.value);
                              }}
                            />

                            <BootstrapInput
                              className="primary-input mb20 width100p"

                              placeholder="Country"

                            />
                            {process.env.REACT_APP_REGION == 'US' &&
                              <BootstrapInput
                                className="primary-input mb20 width100p"
                                placeholder="ZIP Code"
                                onChange={(e) => {
                                  setZip(e.target.value);
                                }}
                              />
                            }
                            {process.env.REACT_APP_REGION == 'INDIA' &&
                              <BootstrapInput
                                className="primary-input mb20 width100p"
                                placeholder="PIN Code"
                                onChange={(e) => {
                                  setZip(e.target.value);
                                }}
                              />
                            }
                            <BootstrapInput
                              className="primary-input mb20 width100p"
                              placeholder="Phone number"
                              onChange={(e) => {
                                setContactNumber(e.target.value);
                              }}
                            />

                            {/* <p className="copytitle2">{addressLine1}</p>
                            <p className="copytitle2">{addressLine2}</p>
                            <p className="copytitle2">
                              {cityName} {}
                            </p>
                            <p className="copytitle2">{stateName}</p>
                            <p className="copytitle2">{countryName}</p>
                            <p className="copytitle2">{zipCode}</p> */}
                          </Grid>

                          <Grid item xs={12} sm={12}>
                            <hr className="redline" />
                          </Grid>
                          <Grid item xs={12} sm={7}>
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={6} md={6}>
                                <p className="bodycopyg1"> Current Password </p>
                              </Grid>
                              <Grid item xs={12} sm={6} md={6}>
                                <BootstrapInput
                                  className="primary-input"
                                  type="password"
                                  onChange={(e) =>
                                    setCurrentPass(e.target.value)
                                  }
                                //id="bootstrap-input"
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={6} md={6}>
                                <p className="bodycopyg1"> New Password </p>
                              </Grid>
                              <Grid item xs={12} sm={6} md={6}>
                                <BootstrapInput
                                  className="primary-input "
                                  placeholder=""
                                  //id="bootstrap-input"
                                  type="password"
                                  onChange={(e) =>
                                    setNewPassword(e.target.value)
                                  }
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={6} md={6}>
                                <p className="bodycopyg1"> Confirm Password </p>
                              </Grid>
                              <Grid item xs={12} sm={6} md={6}>
                                <BootstrapInput
                                  className="primary-input "
                                  placeholder=""
                                  id="bootstrap-input"
                                  type="password"
                                  onChange={(e) =>
                                    setConfirmPass(e.target.value)
                                  }
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={4} md={3}>
                        <Paper className=" bx-shadow" style={{ textAlign: 'center' }}>
                          <img
                            alt="Logo"
                            className="imgresponsive"
                            style={{ borderRadius: '50%', height: '250px', width: '250px' }}
                            src={
                              pictures.url !== "" && pictures.url !== undefined && pictures.url !== null
                                ? pictures.url
                                : "assets/img/dental.jpg"
                            }
                          />
                        </Paper>
                      </Grid>
                    </Grid>
                    <Grid container className="signinbototm mt30">
                      <Grid item xs={12} sm={9} md={9}>
                        <button className="btn-primary" onClick={updatePass}>
                          Save
                        </button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Grid item xs={12} sm={12}>
                  <Paper className="pad12  bx-shadow dbbox">
                    <Grid container spacing={6}>
                      <Grid item xs={20} sm={20} md={20} className=" pad20 staffdetails ">

                        <MaterialTable
                          title="Staff Details (to assign to patients)"
                          style={{ width: 1225 }}
                          columns={columns}
                          data={staffData}
                          icons={tableIcons}

                          options={{
                            sorting: true, search: true,
                            searchFieldAlignment: "right",
                            toolbarButtonAlignment: "left",
                            toolbarButtonStyle: {
                              backgroundColor: '#607d8b',
                              color: '#FFF',
                              ':hover': {
                                color: 'black',
                              },
                            },
                          }}

                          editable={{
                            onRowAdd: newData =>
                              new Promise((resolve, reject) => {
                                setTimeout(() => {
                                  // setStaffData([...staffData, newData]);
                                  addStaffData(newData);

                                  resolve();
                                }, 1000)
                              })
                            ,
                            onRowUpdate: (newData, oldData) =>
                              new Promise((resolve, reject) => {
                                setTimeout(() => {
                                  const dataUpdate = [...staffData];
                                  const index = oldData.tableData.id;
                                  dataUpdate[index] = newData;
                                  setStaffData([...dataUpdate]);

                                  resolve();
                                }, 1000)
                              }),
                            onRowDelete: oldData =>
                              new Promise((resolve, reject) => {
                                setTimeout(() => {
                                  const dataDelete = [...staffData];
                                  const index = oldData.tableData.id;
                                  dataDelete.splice(index, 1);
                                  setStaffData([...dataDelete]);
                                  deleteStaffData();

                                  resolve()
                                }, 1000)
                              }),
                          }}
                        />

                      </Grid>

                      {/* <Grid item xs={4} sm={4} md={2}>
                            <p className="bodycopyg1 mb20 txt-center">
                              Title
                            </p>
                          </Grid>
                          <Grid item xs={4} sm={4} md={2}>
                            <p className="bodycopyg1 mb20 txt-center">
                              Name of Clinician/Staff
                            </p>
                          </Grid>
                          <Grid item xs={4} sm={4} md={2}>
                            <p className="bodycopyg1 mb20 txt-center">
                              Email ID
                            </p>
                          </Grid>
                          <Grid item xs={4} sm={4} md={2}>
                            <p className="bodycopyg1 mb20 txt-center">
                              Cell Number
                            </p>
                          </Grid>
                          <Grid item xs={4} sm={4} md={2}>
                            <p className="bodycopyg1 mb20 txt-center">
                              Specialty
                            </p>
                          </Grid> */}



                      {/* <Grid container spacing={6}> */}



                      {/* <Grid item xs={4} sm={4} md={2}>
                              <BootstrapInput
                                className="primary-input mb20 width100p"
                                placeholder=""
                                value={noOfDays}
                                style={{
                                  display: isDateChecked ? "block" : "none",
                                  marginLeft: 40,
                                  width: 50,
                                }}
                                onChange={(e) => {
                                  setNumbOfDays(
                                    isNaN(e.target.value) || e.target.value === ""
                                      ? 0
                                      : parseInt(e.target.value)
                                  );
                                }}
                              />
                          </Grid> */}

                      {/* </Grid> */}


                      {/*                         
                        <div>
                          {" "}
                          <Widget id={id} setNpiDetail={updateNpiData} loading={(val)=>setLoading(val)}/>{" "}
                        </div> */}
                      {/* </Grid> */}
                      <Grid item xs={12} sm={12}>
                        <hr className="redline" />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} className="pd0">
                        <p style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }}> Notification Preference (for patients)</p>
                      </Grid>
                      <Grid container spacing={3} style={{ marginBottom: 10 }}>
                        <Grid item xs={12} sm={12} md={3} className="pd0">
                          <p className="bodycopyg1" style={{ marginLeft: 25 }} >On the day of appointment, how many hours before appointment time </p>
                          <p className="bodycopyg1" style={{ marginLeft: 25 }}> do you prefer to send SMS reminder to your patients? </p>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} className="pd0">

                          <Select className="selectbox1"
                            onChange={(selectedOption) => {
                              // setPatientDetailsdata("attendingSpecialty", selectedOption.value);
                              console.log(`Option selected:`, selectedOption);
                            }}
                            // styles={customStyles}
                            options={appointmentHourReminderOptions}

                            defaultValue={{ value: '3', label: '3' }}
                          />

                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={3} className="pd0">

                          <p className="bodycopyg1" style={{ marginLeft: 25 }} >In addition to sending SMS reminder on the date of appointment,</p>

                          <p className="bodycopyg1" style={{ marginLeft: 25 }}> do you prefer to send reminder 24hrs before apppointment? </p>
                          {/* <FormControlLabel
                            control={
                              <Checkbox
                                name="checkedB"
                                checked={isDateChecked}
                                onChange={(e) => {
                                  if (!isDateChecked === true) {
                                    setNumbOfDays(0);
                                  }
                                  setisDateChecked(!isDateChecked);
                                }}
                              />
                            }
                            label="Day(s) Before Date of Service"
                          /> */}
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} className="pd0">

                          <Select className="selectbox1"
                            onChange={(selectedOption) => {
                              // setPatientDetailsdata("attendingSpecialty", selectedOption.value);
                              console.log(`Option selected:`, selectedOption);
                            }}
                            // styles={customStyles}
                            options={secondReminder}

                            defaultValue={{ value: 'Yes', label: 'Yes' }}
                          />
                          {/* <BootstrapInput
                            className="primary-input mb20 width100p"
                            placeholder=""
                            value={noOfDays}
                            style={{
                              display: isDateChecked ? "block" : "none",
                            }}
                            onChange={(e) => {
                              setNumbOfDays(
                                isNaN(e.target.value) || e.target.value === ""
                                  ? 0
                                  : parseInt(e.target.value)
                              );
                            }}
                          /> */}
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <div className="mt2em">
                          <Button
                            variant="contained"
                            className="btn-primary"
                            // onClick={saveNpiDetails}
                            onClick={fetchStaffData}
                          >
                            { }
                            Save
                          </Button>
                        </div>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Grid item xs={12} sm={12}>
                  <Paper className="pad12  bx-shadow dbbox">
                    <Grid container spacing={3}>
                      <Grid
                        item
                        xs={12}
                        sm={8}
                        md={8}
                        className=" pad20 bx-shadow"
                      >
                        <p className="title1 mb20">My Subscriptions</p>

                        <FormControl className="txtform500">
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={12} >
                              <Elements stripe={stripePromise}>
                                <StripeUpdate NPI={npi} />
                                {/* HomePage(); */}
                              </Elements>
                            </Grid>
                          </Grid>
                        </FormControl>

                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        className="pad20 bx-shadow"
                      >
                        <Grid container className="orderconfirmation">
                          <Grid item xs={12}>
                            <Grid container className=" txt-left">
                              <Grid item xs={12} sm={12}>
                                <p className="bodycopy"><b>Basic Plan</b></p>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid container className=" txt-left">
                              <Grid item xs={7} sm={7}>
                                <p className="bodycopy">Subtotal Before Tax</p>
                              </Grid>
                              <Grid item xs={3} sm={3}>
                                <p className="bodycopy">$250 </p>
                              </Grid>
                              <Grid item xs={2} sm={2}>
                                <p className="bodycopy"> </p>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid container className=" txt-left">
                              <Grid item xs={7} sm={7}>
                                <p className="bodycopy">Estimated Taxes/Fees</p>
                              </Grid>
                              <Grid item xs={5} sm={5}>
                                <p className="bodycopy"> - </p>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid container className=" txt-left">
                              <Grid item xs={7} sm={7}>
                                <p className="bodycopy primary-copy">
                                  <b>Total (before taxes and fees)</b>
                                </p>
                              </Grid>
                              <Grid item xs={3} sm={3}>
                                <p className="bodycopy primary-copy">
                                  <b> $250.00</b>
                                </p>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <hr className="redline" />

                        <Grid container className="orderconfirmation">
                          <Grid item xs={12}>
                            <Grid container className=" txt-left">
                              <Grid item xs={12} className="mb20">
                                <p className="bodytitle ">
                                  Recurring Monthly Charge &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$250
                                </p>
                                <small>
                                  Transaction fees and applicable taxes to be
                                  included in above charges
                                </small>
                              </Grid>
                              <Grid item xs={7} sm={7}>
                                {/* <p className="bodycopy"> */}
                                {/* Renews on 30 April 2021 */}
                                {/* </p> */}

                              </Grid>
                              <Grid item xs={5} sm={5}>
                                {/* <p className="bodytitle txt-right"> $250 </p> */}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <Grid item xs={12} sm={12}>
                  <Paper className="pad12  bx-shadow dbbox">
                    <Grid container spacing={3}>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        className=" pad20 tabs-height "
                      >
                        <p className="title1 mb20">My Bills</p>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </TabPanel>
            </div>
          </Grid>
        </div>
      </main>
    </div>
  );
}
