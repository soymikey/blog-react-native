/* eslint-disable handle-callback-err */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { Fragment } from "react";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput
} from "react-native";

import { Input, Button, ButtonGroup } from "react-native-elements";

import Icon from "react-native-vector-icons/FontAwesome";
import axios from "../../utils/axios";
import alert from "../../utils/alert";
class PublishArticleScreen extends React.Component {
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
    categoryIndex: 1,
    categoryList: [],
    tagIndex: 1,
    tagList: [],
    Loading: false // 发布的loading
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
      this.setState({ categoryList: formatedData });
    });
  }
  fetchTags() {
    axios.get("/tags/getList").then(res => {
      const formatedData = res.data.map(tag => {
        return tag.name;
      });
      this.setState({ tagList: formatedData });
    });
  }

  updateCategoryIndex(categoryIndex) {
    this.setState({ categoryIndex });
  }
  updateTagIndex(tagIndex) {
    this.setState({ tagIndex });
  }
  handlerPublish() {
    const {
      title,
      content,
      categoryList,
      categoryIndex,
      tagList,
      tagIndex
    } = this.state;
    const params = {
      categories: [categoryList[categoryIndex]],
      content,
      tags: [tagList[tagIndex]],
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
  render() {
    const {
      categoryIndex,
      categoryList,
      tagIndex,
      tagList,
      Loading
    } = this.state;
    return (
      <ScrollView>
        <Input
          leftIcon={<Text style={{ fontSize: 20 }}>文章标题：</Text>}
          placeholder=""
          onChangeText={title => this.setState({ title })}
        />
        <View>
          <Text
            style={{
              fontSize: 15,
              marginLeft: 20,
              marginTop: 10,
              marginBottom: 10
            }}
          >
            分类:
          </Text>
          <ButtonGroup
            selectedIndex={categoryIndex}
            buttons={categoryList}
            onPress={categoryIndex => this.updateCategoryIndex(categoryIndex)}
            containerStyle={{
              height: 30
            }}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 15,
              marginLeft: 20,
              marginTop: 10,
              marginBottom: 10
            }}
          >
            标签:
          </Text>
          <ButtonGroup
            selectedIndex={tagIndex}
            buttons={tagList}
            onPress={tagIndex => this.updateTagIndex(tagIndex)}
            containerStyle={{
              height: 50
            }}
          />
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
          title="发布"
          containerStyle={{ margin: 10, marginTop: 10 }}
          onPress={() => this.handlerPublish()}
          loading={Loading}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});

export default PublishArticleScreen;
