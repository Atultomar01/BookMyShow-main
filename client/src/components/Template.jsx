import axios from "../axiosConfig";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import LastBookingDetails from "./LastBookingDetails";
import { movies, seats, slots } from "./data.js";
import SelectContainer from "./SelectContainer";
import BackdropLoader from "../components/BackdropLoader";
import SetSeatSelector from "./SetSeatSelector";
import useLocalStorage from "./UseLocalStorage";
import app_config from '../common'

function containesNegtiveVal(seats) {
  let hasNegativeValue = false;

  for (const seat in seats) {
  
    //check if the number is negative
    if (seats.hasOwnProperty(seat) && seats[seat] < 0) {
      hasNegativeValue = true;
      break;
    }
  
}

  return hasNegativeValue;
}

const initialState = {
  movie: "",
  timeSlots: "",
  seats: {
    a1: 0,
    a2: 0,
    a3: 0,
    a4: 0,
    d1: 0,
    d2: 0,
  },
 
  showSuccessAlert: false,
}


export default function Template() {
  //state
  const [state, setState] = useLocalStorage('state',initialState);


  //other state for last booking
  const [lastBooking, setlastBooking] = useState({
    movie: "",
    timeSlots: "",
    dataPresent: false,
    iSfinishLoading: false, // state for last booking message
    seats: {
      a1: 0,
      a2: 0,
      a3: 0,
      a4: 0,
      d1: 0,
      d2: 0,
    },
    error: null,
    isLoading: false,
  });


  useEffect(() => {

console.log(app_config)

    //get api data
    setlastBooking({ iSfinishLoading: false });
    axios
      .get(app_config.get_bookings)
      .then((res) => {
        console.log(res);
        if (typeof res.data.message === "string") {
          setlastBooking({
            ...lastBooking,
            error: res.data.message,
            iSfinishLoading: true,
            dataPresent: false,
          });
        } else if (res.data.data) {
          let { movie, slot, seats } = res.data.data;

          setlastBooking({
            ...lastBooking,
            movie: movie,
            timeSlots: slot,
            dataPresent: true,
            iSfinishLoading: true,
            seats: {
              a1: seats.A1 ? seats.A1 : 0,
              a2: seats.A2 ? seats.A2 : 0,
              a3: seats.A3 ? seats.A3 : 0,
              a4: seats.A4 ? seats.A4 : 0,
              d1: seats.D1 ? seats.D1 : 0,
              d2: seats.D2 ? seats.D2 : 0,
            },
            error: null,
          });

         //// setState(initialState);
        } else {
          setlastBooking({
            ...lastBooking,
            dataPresent: false,
            iSfinishLoading: true,
          });
        }
      })
      .catch((error) => {
        setlastBooking({
          ...lastBooking,
          dataPresent: false,
          iSfinishLoading: true,
        });

        console.log(error);
      });
  }, []);



  // set state of movie selector in a function
  const movieSelectHandler = (item) => {
    //update state
    setState((preState) => ({
      ...preState,
      movie: item,
    }));
  };

  // set state of time Slot in a function
  const timeSlotSelectHandler = (item) => {
    //update state
    setState((preState) => ({
      ...preState, //copy
      timeSlots: item,
    }));
  };


  const seatSelectHandler = (e) => {
    const newValue = parseInt(e.target.value, 10);
  

    if (newValue < 0) {
      newValue = 0;
    }
  
    // Update the state
    setState({
      ...state,
      seats: {
        ...state.seats,
        [e.target.name]: newValue,
      },
    });
  };

  const submitBooking = (e) => {
  const { movie, timeSlots, seats } = state;


  // Validation
  const notSelectedAnySeat = Object.values(seats).every((field) => field === 0);

  if (movie === "") {
    console.log(movie, 'hjdeewjudjwdujw');
    enqueueSnackbar("Please Select a movie", {variant:'error'});
    return;
  } else if (timeSlots === "") {
    enqueueSnackbar("Please Select a time slot", {variant:'error'});
    return;
  } else if (notSelectedAnySeat) {
    enqueueSnackbar("Please Select Atleast one seat", {variant:'error'});
    return;
  } else if (containesNegtiveVal(seats)) {
    enqueueSnackbar("Invalid Seat Entered, Please re-Submit", {variant:'error'});
    return;
  }

  setlastBooking({
    ...lastBooking,

    isLoading: true,

  });
    
    //post request
    axios
      .post(app_config.post_bookings, {
        movie: state.movie,
        slot: state.timeSlots,
        seats: {
          A1: Number(state.seats.a1),
          A2: Number(state.seats.a2),
          A3: Number(state.seats.a3),
          A4: Number(state.seats.a4),
          D1: Number(state.seats.d1),
          D2: Number(state.seats.d2),
        },
      })

      .then((res) => {
        if (res.status === 200) {
          setlastBooking({
            ...lastBooking,
            movie: state.movie,
            timeSlots: state.timeSlots,
            dataPresent: true,
            iSfinishLoading: true,
            isLoading: false,
            seats: {
              a1: state.seats.a1,
              a2: state.seats.a2,
              a3: state.seats.a3,
              a4: state.seats.a4,
              d1: state.seats.d1,
              d2: state.seats.d2,
            },
          });
          setState({
            ...state,
            movie: "",
            timeSlots: "",
            dataPresent: false,
           
            iSfinishLoading: false,
            seats: {
              a1: 0,
              a2: 0,
              a3: 0,
              a4: 0,
              d1: 0,
              d2: 0,
            },
            showSuccessAlert: false,
          });
        }
        enqueueSnackbar("Booking successful!" ,{variant:'success'});
        


        
      })
      .catch((error) => {
        setlastBooking({
          ...lastBooking,
          isLoading: false,
        });
        console.log(error);

      });
  };

  return (
   <Container>
   <SnackbarProvider />
   <BackdropLoader show={lastBooking.isLoading} />

{state.showSuccessAlert && (
  <Alert
    variant="success"
    onClick={() => setState({ ...state,showSuccessAlert: false })}
  >
    Booking successful!
  </Alert>
)}

{/* main heading*/}
    <Row>
      <Col className="p-3" >
        <h5 style={{  color: "brown" ,
  borderRadius: "4px", textTransform: "uppercase", textAlign: "center", textDecoration: "underline",  fontFamily: "sans-serif", fontSize:20, fontWeight: 600

  }}><spna style={{background:"white", padding:"10px 20px", borderRadius:20}}>Book my Show </spna></h5>
      </Col>
    </Row>
    <Row >
      <Col md={8} lg={8} sm={8} xs={12}>
      <SelectContainer
            mainheading="Select Movie"
            items={movies}
            selectedValue={state.movie}
            onclick={movieSelectHandler}
            display="block"
          />

       <SelectContainer
            mainheading="Select Time Slot"
            items={slots}
            selectedValue={state.timeSlots}
            onclick={timeSlotSelectHandler}
            display="block"
          />

          {/* seat container */}
          <SetSeatSelector
            mainheading="Select Seats"
            type="number"
            items={seats}
            seats={state.seats}
            selectedValue={state.seats}
            onchange={seatSelectHandler}
            display="inline"
            submitBooking={submitBooking}
          />
      </Col>

      <Col md={4} lg={4} sm={4} xs={12} className="text-center">
      <LastBookingDetails
            movieName={lastBooking.movie}
            timing={lastBooking.timeSlots}
            seat={lastBooking.seats}
            lastBookingPresent={lastBooking.dataPresent}
            finishLoading={lastBooking.iSfinishLoading}
            errorMsg={lastBooking && lastBooking?.error}
          />
      </Col>
    </Row>



  </Container>

  )
}
