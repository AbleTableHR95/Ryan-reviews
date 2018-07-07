import React from 'react';
import axios from 'axios';
import Summary from './Summary.jsx';
import StarDistribution from './StarDistribution.jsx';
import LovedFor from './LovedFor.jsx';
import overview from './helperFunctions.jsx';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalReviews: 1381,
      neighborhood: 'SOMA',
      overallRating: 0,
      foodRating: 0,
      serviceRating: 0,
      ambienceRating: 0,
      valueRating: 0,
      noiseLevel: 0,
      recommended: false,
      fiveStarReviews: 0,
      fourStarReviews: 0,
      threeStarReviews: 0,
      twoStarReviews: 0,
      oneStarReviews: 0
    };
    this.displayAllReviews = this.displayAllReviews.bind(this);
  }

  componentDidMount() {
    this.displayAllReviews();
  }

  displayAllReviews(props) {
    axios.get(`/restaurant/${this.props.restaurantId}/reviews`)
      .then((response) => {
        // console.log('THE RESPONSE IS ', (JSON.parse(response.data)));
        const reviews = response.data.rows;
        this.setState({
          totalReviews: reviews.length,
          overallRating: overview.overallRating(reviews),
          foodRating: overview.foodRating(reviews),
          serviceRating: overview.serviceRating(reviews),
          ambienceRating: overview.ambienceRating(reviews),
          valueRating: overview.valueRating(reviews),
          noiseLevel: overview.noiseLevel(overview.noise(reviews)),
          recommended: overview.recommended(reviews),
          fiveStarReviews: overview.fiveStarReviews(reviews),
          fourStarReviews: overview.fourStarReviews(reviews),
          threeStarReviews: overview.threeStarReviews(reviews),
          twoStarReviews: overview.twoStarReviews(reviews),
          oneStarReviews: overview.oneStarReviews(reviews)
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="overview">
        <div>
          <h2><b>What {this.state.totalReviews} People Are Saying</b></h2>
        </div>
        <hr />
        <div><Summary restaurant={this.state} /></div>
        <div><StarDistribution restaurant={this.state} /></div>
        <div><LovedFor /></div>
      </div>
    );
  }
}

export default Overview;
