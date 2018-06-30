import React from 'react';
import StarRatings from 'react-star-ratings';
import reviewFunctions from './reviewHelperFunctions.jsx';

class ReviewListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewBody: this.props.review.body.slice(0, 300),
      reviewBodyLength: this.props.review.body.length,
    };

    this.toggleFullReview = this.toggleFullReview.bind(this);
  }

  toggleFullReview() {
    this.setState({
      reviewBody: this.props.review.body,
    });
  }

  render() {
    return (
      <div className="reviewListEntry">
        <div className="dinerInfo">
          <div className="profilePhoto"><i className="far fa-user-circle fa-lg" /></div>
          <div><span>OpenTable Diner <b>{this.props.review.username}</b></span></div>
          <div id="starrating">
            <StarRatings
              rating={Number(this.props.review.overall_rating)}
              starRatedColor="red"
              numberOfStars={5}
              starDimension="20px"
              starSpacing="1px"
            />
          </div>
          <div>
            {this.props.review.overall_rating}.0 Dined on {reviewFunctions.formatDate(new Date(this.props.review.date))}
          </div>
          <div id="reviewbody">
            <div>{this.state.reviewBody}</div>
            <button onClick={this.toggleFullReview} className="reviewlistbutton">+ Read More</button>
            <button id="reviewlistbutton"><i className="far fa-flag" /><span className="reviewlistbutton">Report</span></button>
            <button id="reviewlistbutton"><i className="far fa-arrow-alt-circle-up" /><span className="reviewlistbutton">Helpful</span></button>
          </div>
          <hr />
        </div>
      </div>
    );
  }
}

export default ReviewListEntry;
