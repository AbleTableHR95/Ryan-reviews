import React from 'react';
import Overview from './overview/Overview.jsx';
import ReviewsList from './reviews/ReviewsList.jsx';

const App = (props) => (
  <div>
    <div><Overview restaurantId={props.match.params.restaurantId}/></div>
    <div><ReviewsList restaurantId={props.match.params.restaurantId}/></div>
  </div>
);

export default App;
