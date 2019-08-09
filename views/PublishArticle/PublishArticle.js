/* eslint-disable handle-callback-err */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";

import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Picker,
  AsyncStorage
} from "react-native";

import { Input, Button } from "react-native-elements";

import Icon from "react-native-vector-icons/FontAwesome";
import axios from "../../utils/axios";
import alert from "../../utils/alert";
class PublishArticleScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: "发布",
      headerStyle: {
        backgroundColor: "#2289DC",
        textAlign: "center"
      },

      headerTintColor: "#fff",
      headerLeft: (
        <TouchableOpacity onPress={() => params.handleOpenModal()}>
          <Icon
            style={{ marginLeft: 20 }}
            name="file-text"
            color="#fff"
            size={20}
          />
        </TouchableOpacity>
      )
    };
  };
  state = {
    title: "",
    content: " ",
    selectedCategory: "",
    categoryList: [],
    selectedTag: "",
    tagList: [],
    Loading: false, // 发布的loading
    isLogin: null
  };
  componentDidMount() {
    this.fetchCategories();
    this.fetchTags();
  }

  fetchCategories() {
    axios.get("/categories/getList").then(res => {
      const formatedData = res.data.map(category => {
        return category.name;
      });
      this.setState({
        categoryList: formatedData,
        selectedCategory: formatedData[0]
      });
    });
  }
  fetchTags() {
    axios.get("/tags/getList").then(res => {
      const formatedData = res.data.map(tag => {
        return tag.name;
      });
      this.setState({ tagList: formatedData, selectedTag: formatedData[0] });
    });
  }

  async handlerPublish() {
    const { title, content, selectedCategory, selectedTag } = this.state;
    const params = {
      categories: [selectedCategory],
      content,
      tags: [selectedTag],
      title
    };
    this.setState({ Loading: true });
    axios
      .post("/article/create", params)
      .then(res => {
        alert("", res.message);
        this.setState({
          Loading: false,
          title: "",
          containerStyle: "",
          categoryIndex: 0,
          tagIndex: 0
        });
      })
      .catch(err => {
        alert("请求错误", "登录信息过期或未授权，请重新登录！");
        this.setState({ Loading: false });
      });
  }
  async isLogin() {
    const hasLogin = await AsyncStorage.getItem("username");

    if (hasLogin !== null) {
      this.setState({ isLogin: true });
      return;
    }
    this.setState({ isLogin: false });
    return;
  }
  render() {
    const {
      selectedCategory,
      categoryList,
      tagList,
      Loading,
      selectedTag
    } = this.state;
    this.isLogin();
    return (
      <ScrollView>
        <Input
          leftIcon={<Text style={{ fontSize: 20 }}>文章标题：</Text>}
          placeholder=""
          onChangeText={title => this.setState({ title })}
        />
        <View
          style={{
            margin: 10,
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "space-between"
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 20,
                marginRight: 10
              }}
            >
              分类:
            </Text>

            <Picker
              pickerStyleType={{}}
              selectedValue={selectedCategory}
              style={{ height: 50, width: 100 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ selectedCategory: itemValue })
              }
            >
              {categoryList.map((category, index) => {
                return (
                  <Picker.Item label={category} value={category} key={index} />
                );
              })}
            </Picker>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 20,
                marginRight: 10
              }}
            >
              标签:
            </Text>

            <Picker
              pickerStyleType={{}}
              selectedValue={selectedTag}
              style={{ height: 50, width: 100 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ selectedTag: itemValue })
              }
            >
              {tagList.map((tag, index) => {
                return <Picker.Item label={tag} value={tag} key={index} />;
              })}
            </Picker>
          </View>
        </View>

        <Input
          label={<Text style={{ marginTop: 10, fontSize: 20 }}>文章内容</Text>}
          multiline={true}
          numberOfLines={10}
          onChangeText={content => this.setState({ content })}
          value={this.state.content}
          editable={true}
          maxLength={180}
          inputContainerStyle={{
            backgroundColor: this.state.text,
            borderColor: "gray",
            borderWidth: 1,
            marginTop: 10
          }}
        />
        <Button
          title={this.state.isLogin ? "发布" : "您还未登陆"}
          disabled={!this.state.isLogin}
          containerStyle={{ margin: 10, marginTop: 30 }}
          onPress={() => this.handlerPublish()}
          loading={Loading}
        />
      </ScrollView>
    );
  }
}

export default PublishArticleScreen;
