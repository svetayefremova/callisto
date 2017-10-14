import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { facebookAuth } from '../actions';

class AuthScreen extends Component {
  componentDidMount() {
    this.props.facebookAuth();
    this.onAuthComplete(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props) {
    if (props.token) {
      this.props.navigation.navigate('main');
    }
  }

  render() {
    return(
      <View />
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    token: auth.token
  };
};

export default connect(mapStateToProps, { facebookAuth })(AuthScreen);