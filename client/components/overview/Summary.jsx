import React from 'react';
import StarRatings from 'react-star-ratings';

const Summary = props => (
  <div className="summary">
    <div><b>Overall ratings and reviews</b></div>
    <div>Reviews can only be made by people who have eaten at this restaurant</div>
    <div className="starRating">
      <StarRatings
        rating={Number(props.restaurant.overallRating)}
        starRatedColor="red"
        numberOfStars={5}
        starDimension="20px"
        starSpacing="1px"
      /> {props.restaurant.overallRating} based on recent ratings
    </div>
    <div className="overallRating">
      <div id="subRating">
        <p id="subrating"><span id="categoryRating">{props.restaurant.foodRating}</span></p>
        <p>Food</p>
      </div>
      <div id="subRating">
        <p id="subrating"><span id="categoryRating">{props.restaurant.serviceRating}</span></p>
        <p>Service</p>
      </div>
      <div id="subRating">
        <p id="subrating"><span id="categoryRating">{props.restaurant.ambienceRating}</span></p>
        <p>Ambience</p>
      </div>
      <div id="lastSubRating">
        <p id="subrating"><span id="categoryRating">{props.restaurant.valueRating}</span></p>
        <p>Value</p>
      </div>
    </div>
    <div id="summarydescription">
      <div id="noise"><i className="fas fa-volume-up" height="30" /></div>
      <span id="summarydescriptiontext"><b>Noise:</b> {props.restaurant.noiseLevel}</span>
    </div>
    <div id="summarydescription">
      <div id="recommended"><i className="far fa-thumbs-up" height="30" /></div>
      <span id="summarydescriptiontext"><b>{props.restaurant.recommended} % of people</b> would recommend it to a friend</span>
    </div>
  </div>
);

export default Summary;
