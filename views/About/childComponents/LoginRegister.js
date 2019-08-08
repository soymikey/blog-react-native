/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  AsyncStorage
} from "react-native";

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions
} from "react-native/Libraries/NewAppScreen";
import {
  Button,
  ThemeProvider,
  Header,
  ListItem,
  Image,
  Input
} from "react-native-elements";
import Loading from "../../../components/Loading.js";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "../../../utils/axios";
import alert from "../../../utils/alert.js";

const { width, height } = Dimensions.get("window");

class LoginRegisterScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: "登陆",
      headerStyle: {
        backgroundColor: "#2289DC",
        textAlign: "center"
      },
      headerTintColor: "#fff"
    };
  };
  state = {
    account: "",
    password: "",
    loading: false
  };

  handleSubmit() {
    const { account, password } = this.state;
    this.setState({ loading: true });
    axios
      .post("/login", { account, password })
      .then(async res => {
        if (res.code === 200) {
          await AsyncStorage.setItem("token", res.token);
          await AsyncStorage.setItem("username", res.username);
          this.setState({ loading: false });
        }
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log("err", err);
      });
  }

  render() {
    return (
      <ScrollView style={{ padding: 20 }}>
        {/* <View style={{ position: "absolute", top: 10, zIndex: 10 }}>
          <Loading />
        </View> */}

        <Image
          source={require("../avartar.jpg")}
          style={{ width, height: 200, marginTop: 20, marginBottom: 20 }}
        />
        <View style={styles.loginContainerStyle}>
          <Input
            placeholder="   用户名/邮箱"
            errorStyle={{ color: "red" }}
            leftIcon={<Icon name="user" size={24} color="gray" />}
            // errorMessage="ENTER A VALID ERROR HERE"
            onChangeText={text => this.setState({ account: text })}
            value={this.state.account}
          />

          <Input
            placeholder="   密码"
            errorStyle={{ color: "red" }}
            leftIcon={<Icon name="lock" size={24} color="gray" />}
            // errorMessage="ENTER A VALID ERROR HERE"
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
            containerStyle={{ marginTop: 10 }}
          />
        </View>
        <Button
          title="登陆"
          loading={this.state.loading}
          containerStyle={{ marginTop: 50 }}
          onPress={() => {
            this.handleSubmit();
          }}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  loginContainerStyle: {
    // marginTop: 20
  }
});

export default LoginRegisterScreen;
