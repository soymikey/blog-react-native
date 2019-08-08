/* eslint-disable handle-callback-err */
/* eslint-disable react-native/no-inline-styles */
import React from "react";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { SearchBar, Button } from "react-native-elements";
import axios from "../../utils/axios";

import ArticleList from "../../components/ArticleList";

class SearchScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    search: "",
    loading: false,
    list: []
  };
  componentDidMount() {
    this.fetchList(1, "Event Loop");
  }
  fetchList({ page, keyword }) {
    this.setState({ loading: true });
    axios
      .get("/article/getList", {
        params: { page, pageSize: 10, title: keyword }
      })
      .then(res => {
        const list = res.data;
        // 处理 read more 的内容
        list.forEach(item => {
          // let index = item.content.indexOf("<!--more-->");
          // item.description = translateMarkdown(item.content.slice(0, index));
        });
        this.setState({ list, total: res.count, loading: false }, () => {
          console.log("搜索结果", this.state.list);
        });
      })
      .catch(err => this.setState({ loading: false }));
  }

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search, list, loading } = this.state;
    return (
      <View>
        <View>
          <SearchBar
            containerStyle={{
              backgroundColor: "#FFF",
              borderBottomColor: "#FFF"
            }}
            inputContainerStyle={{ backgroundColor: "#FFF" }}
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={search}
          />
        </View>

        {search.length ? (
          <View style={styles.historyContainer}>
            <View style={styles.titleStyle}>
              <Text>History</Text>
              <Text>clear</Text>
            </View>
            <View style={styles.historyStyle}>
              <Text style={styles.textStyle}>
                <Icon name="clock-o" size={15} color="#BBBBBB" />
                &nbsp;&nbsp; html
              </Text>
            </View>
            <View style={styles.historyStyle}>
              <Text style={styles.textStyle}>
                <Icon name="clock-o" size={15} color="#BBBBBB" />{" "}
                &nbsp;&nbsp;css
              </Text>
            </View>
          </View>
        ) : (
          <ScrollView>
            <ArticleList
              articlesList={list}
              navigation={this.props.navigation}
              title="搜索结果"
            />
          </ScrollView>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  historyContainer: {
    paddingLeft: 15,
    paddingRight: 15
  },
  titleStyle: {
    height: 30,
    lineHeight: 30,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  historyStyle: {
    height: 40,

    borderBottomWidth: 1,
    borderBottomColor: "#BBBBBB"
  },
  textStyle: {
    lineHeight: 40,
    fontSize: 15
  }
});

export default SearchScreen;
