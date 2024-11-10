import {Component} from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Login from './components/Login'
import BookANewTrip from './components/BookANewTrip'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import MyTrips from './components/MyTrips'
import NotFound from './components/NotFound'
import './App.css'
import BookingContext from './context/BookingContext'

// {
//   name: 'rahul',
//   startLocation: 'salem',
//   endLocation: 'dubai',
//   startDate: '2024-10-10',
//   endDate: '2024-10-25',
//   guestsDetails: {
//     adults: 2,
//     children: 1,
//     infants: 0,
//   },
//   travelAssistance: 'Flight',
// },

// Replace your code here
class App extends Component {
  state = {
    name: '',
    startLocation: '',
    endLocation: '',
    startDate: '',
    endDate: '',
    guestsDetails: {
      adults: 1,
      children: 0,
      infants: 0,
    },
    travelAssistance: '',
    bookingInProgress: true,
    activeFormId: 'YOUR_DETAILS',
    myTripsList: [],
  }

  setName = name => this.setState({name})

  setStartLocation = startLocation => this.setState({startLocation})

  setEndLocation = endLocation => this.setState({endLocation})

  setStartDate = startDate => this.setState({startDate})

  setEndDate = endDate => this.setState({endDate})

  setGuestsDetails = guestsDetails => this.setState({guestsDetails})

  setTravelAssistence = travelAssistance => this.setState({travelAssistance})

  addTrip = bookingDetails =>
    this.setState(prevState => ({
      myTripsList: [...prevState.myTripsList, bookingDetails],
    }))

  removeTrip = tripId =>
    this.setState(prevState => ({
      myTripsList: prevState.myTripsList.filter(item => item.tripId !== tripId),
    }))

  resetBooking = () =>
    this.setState(prevState => ({
      name: '',
      startLocation: '',
      endLocation: '',
      startDate: '',
      endDate: '',
      guestsDetails: {
        adults: 1,
        children: 0,
        infants: 0,
      },
      travelAssistance: '',
      bookingInProgress: true,
      activeFormId: 'YOUR_DETAILS',
      myTripsList: prevState.myTripsList,
    }))

  setActiveFormId = activeFormId => this.setState({activeFormId})

  setBookingInPreogress = status => this.setState({bookingInProgress: status})

  render() {
    console.log(this.state)
    const {
      name,
      startLocation,
      endLocation,
      startDate,
      endDate,
      guestsDetails,
      travelAssistance,
      bookingInProgress,
      activeFormId,
      myTripsList,
    } = this.state
    return (
      <BookingContext.Provider
        value={{
          name,
          startLocation,
          endLocation,
          startDate,
          endDate,
          guestsDetails,
          travelAssistance,
          bookingInProgress,
          activeFormId,
          myTripsList,
          setActiveFormId: this.setActiveFormId,
          setBookingInPreogress: this.setBookingInPreogress,
          setName: this.setName,
          setStartLocation: this.setStartLocation,
          setEndLocation: this.setEndLocation,
          setStartDate: this.setStartDate,
          setEndDate: this.setEndDate,
          setGuestsDetails: this.setGuestsDetails,
          setTravelAssistence: this.setTravelAssistence,
          resetBooking: this.resetBooking,
          addTrip: this.addTrip,
          removeTrip: this.removeTrip,
        }}
      >
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/book-a-new-trip" element={<ProtectedRoute element={<BookANewTrip />} />} />
          <Route path="/my-trips" element={<ProtectedRoute element={<MyTrips />} />} />
          <Route path="/bad-path" element={<ProtectedRoute element={<NotFound />} />} />
          <Route path="*" element={<Navigate to="/bad-path" />} />
        </Routes>
      </BookingContext.Provider>
    )
  }
}

export default App

/* 
          <ProtectedRoute
            path="/book-a-new-trip"
            exact
            component={BookANewTrip}
          />
          <ProtectedRoute path="/my-trips" exact component={MyTrips} />
          <Route exact path="/bad-path" component={NotFound} />
          <Redirect to="/bad-path" /> */