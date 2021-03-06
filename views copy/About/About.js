/* eslint-disable react-native/no-inline-styles */
import React, { Fragment } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  // Button,
  TouchableNativeFeedback,
  Alert,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";

import { ListItem, Avatar } from "react-native-elements";
import Loading from "../../components/Loading";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "../../utils/axios";

class AboutScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: "我的",
      headerStyle: {
        backgroundColor: "#2289DC",
        textAlign: "center"
      },

      headerTintColor: "#fff",
      headerLeft: (
        <TouchableOpacity>
          <Icon style={{ marginLeft: 20 }} name="user" color="#fff" size={20} />
        </TouchableOpacity>
      )
    };
  };
  state = {
    list: [
      {
        name: "Login",
        icon: "user-circle"
      },
      {
        name: "Register",
        icon: "user-circle"
      },
      {
        name: "Github",
        icon: "github"
      },
      {
        name: "Vlog",
        icon: "video-camera"
      },
      {
        name: "Wechat",
        icon: "wechat"
      },
      {
        name: "Email",
        icon: "mail-forward"
      },
      {
        name: "Stack Overflow",
        icon: "stack-overflow"
      },
      {
        name: "Twitter",
        icon: "twitter"
      },
      {
        name: "Weibo",
        icon: "weibo"
      },
      {
        name: "Linkedin",
        icon: "linkedin-square"
      },
      {
        name: "Telegram",
        icon: "telegram"
      },
      {
        name: "Instagram",
        icon: "instagram"
      }
    ]
  };
  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      subtitle={item.subtitle}
      leftAvatar={{ source: { uri: item.avatar_url } }}
    />
  );
  render() {
    return (
      <View style={styles.backgroundColor}>
        <ScrollView>
          <ImageBackground
            source={require("./avartar.jpg")}
            // style={{ width: "100%", height: "100%" }}
            style={styles.bannerStyle}
          />
          <View style={styles.bannerTopLayerStyle}>
            <Avatar
              containerStyle={{ marginLeft: 20 }}
              rounded
              size="large"
              source={require("./avartar.jpg")}
            />
            <View style={styles.textContainerStyle}>
              <Text style={styles.englishUsernameStyle}>Soymikey</Text>
              <Text style={styles.chineseusernameStyle}>米高</Text>
            </View>
          </View>

          <View style={styles.articleSummaryContainerStyle}>
            <View style={styles.flexItemStyle}>
              <Text style={styles.numberStyle}>120</Text>
              <Text style={styles.titleStyle}>Article</Text>
            </View>
            <View style={styles.flexItemStyle}>
              <Text style={styles.numberStyle}>29</Text>
              <Text style={styles.titleStyle}>Tag</Text>
            </View>
            <View style={styles.flexItemStyle}>
              <Text style={styles.numberStyle}>1192</Text>
              <Text style={styles.titleStyle}>Comment</Text>
            </View>
            <View style={[styles.flexItemStyle, styles.flexItemLastStyle]}>
              <Text style={styles.numberStyle}>427</Text>
              <Text style={styles.titleStyle}>Today Views</Text>
            </View>
          </View>
          {this.state.list.map((l, i) => (
            <ListItem
              key={i}
              title={l.name}
              leftIcon={<Icon name={l.icon} size={20} color="gray" />}
              rightIcon={<Icon name="chevron-right" size={20} color="gray" />}
              onPress={() => this.props.navigation.navigate("LoginRegister")}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundColor: {
    backgroundColor: "#EFEFEF",
    height: "100%"
  },
  bannerStyle: {
    opacity: 0.5,
    height: 120,
    flexDirection: "row",
    alignItems: "center"
  },
  bannerTopLayerStyle: {
    position: "absolute",
    height: 120,
    flexDirection: "row",
    alignItems: "center"
  },
  // avartarStyle: {
  //   marginLeft: 40
  // },
  textContainerStyle: {
    marginLeft: 20
  },
  englishUsernameStyle: {
    fontSize: 25,
    marginTop: 0,
    color: "black"
  },
  chineseusernameStyle: {
    fontSize: 20,
    marginTop: 5
  },
  articleSummaryContainerStyle: {
    padding: 10,
    flexDirection: "row",
    borderBottomColor: "#EFEFEF",
    borderBottomWidth: 1,
    marginBottom: 20,
    backgroundColor: "#FFF"
  },
  flexItemStyle: {
    borderRightColor: "#BBBBBB",
    borderRightWidth: 1,
    flex: 1
  },
  flexItemLastStyle: {
    borderRightWidth: 0
  },
  numberStyle: {
    textAlign: "center",

    fontSize: 20
  },
  titleStyle: {
    textAlign: "center",
    fontSize: 15
  }
});

export default AboutScreen;
