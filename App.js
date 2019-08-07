import React from "react";
// import "./style/index.js";
import { Button, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation";

import HomeScreen from "./views/Home/Home.js";
import ArticleScreen from "./views/Article/Article.js";
import AboutScreen from "./views/About/About.js";
import SearchScreen from "./views/Search/Search.js";
import CategoryScreen from "./views/Category/Category.js";

const HomeStack = createStackNavigator({
  // About: { screen: AboutScreen },

  Home: { screen: HomeScreen },
  Search: { screen: SearchScreen },

  Article: { screen: ArticleScreen }
});
const ArticleStack = createStackNavigator({
  Article: { screen: ArticleScreen }
});
const SearchStack = createStackNavigator({
  Search: { screen: SearchScreen },
  Article: { screen: ArticleScreen }
});
const CategoryStack = createStackNavigator({
  Category: { screen: CategoryScreen }
});
const AboutStack = createStackNavigator({
  About: { screen: AboutScreen }
});

const MainTabs = createBottomTabNavigator(
  {
    首页: { screen: HomeStack },
    分类: { screen: CategoryStack },
    我的: { screen: AboutStack }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "首页") {
          iconName = "home";
        } else if (routeName === "分类") {
          iconName = "file-text";
        } else if (routeName === "我的") {
          iconName = "user";
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "#2289DC",
      inactiveTintColor: "gray"
    }
  }
);
const MainDrawer = createDrawerNavigator(
  {
    MainTabs: MainTabs,
    Article: ArticleStack,
    Search: SearchStack
  },
  {
    hideStatusBar: false,
    drawerBackgroundColor: "rgba(255,255,255,.9)",
    overlayColor: "#EFEFEF",
    contentOptions: {
      activeTintColor: "#fff",
      activeBackgroundColor: "#2289DC"
    }
  }
);
const AppModalStack = createStackNavigator(
  {
    App: MainDrawer
    // Promotion1: {
    //   screen: ArticleStack
    // }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(AppModalStack);

// const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
