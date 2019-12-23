import React from 'react';
import {withFirebase} from '../firebase';

const INITIAL_STATE = {
  date: new Date(),
  cost: 0,
  error: null
};

const EventsList = ({events}) => (
  <ul>
    {events.map((e,i) => <li key={i}>e</li>)}
  </ul>
);


class EventsPageBase extends React.Component {
  constructor(props) {
    super(props);
    const events = [];
    this.props.firebase.getEvents().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        events.push(JSON.stringify(doc.data()));
      });
    });
    this.state = { ...INITIAL_STATE, events };
  };

  onSubmit = event => {
    event.preventDefault();
    const { cost, date } = this.state;
    this.props.firebase.addEvent(cost,date).then(res => {
      console.log(res);
      this.setState({ ...INITIAL_STATE });
    })
    .catch(error => {
      this.setState({ error });
    });
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [target.name]: value
    });
  };

  render() {
    const {
      date,
      cost,
      error,
      events
    } = this.state;


    return (
      <div>
        <EventsList events={events}/>
      <form onSubmit={this.onSubmit}>
        <input
          name="date"
          value={date}
          onChange={this.handleChange}
          type="date"
        />
        <input
          name="cost"
          value={cost}
          onChange={this.handleChange}
          type="number"
          min={0}
        />
        <button type="submit">Submit</button>
        {error && <p>{error.message}</p>}
      </form>
      </div>
    );
  }



}

export default withFirebase(EventsPageBase);