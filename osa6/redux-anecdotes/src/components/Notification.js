import React from "react";
import { connect } from "react-redux";

const Notification = ({ notification }) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1
  };
  return notification ? <div style={style}>{notification}</div> : null;
};

const mapStateToProps = state => {
  // joskus on hyödyllistä tulostaa mapStateToProps:ista...
  return {
    notification: state.notifications
  };
};

export default connect(
  mapStateToProps,
  null
)(Notification);
