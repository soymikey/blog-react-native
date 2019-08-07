import React, { Fragment } from "react";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
class MyCustomRightComponent extends React.Component {
  state = { itemList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] };

  render() {
    return (
      <View>
        <Icon
          name="search"
          size={20}
          color="#fff"
          onPress={() => this.props.navigation.navigate("Search")}
        />
      </View>
    );
  }
}

export default MyCustomRightComponent;
