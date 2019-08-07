import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Animated,
  SafeAreaView,
  TouchableWithoutFeedback
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

class Model extends React.Component {
  state = {
    modalVisible: false
  };
  updateMaskVisible(visible, callback) {
    Animated.timing(this.maskOpacity, {
      toValue: visible ? this.propOpacity : 0,
      duration: 88
    }).start(callback);
  }
  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          hardwareAccelerated={true}
          visible={this.modalVisible}
          onShow={() => this.updateMaskVisible(true)}
        >
          <Animated.View
            style={[styles.background, { opacity: this.maskOpacity }]}
          />
          <SafeAreaView style={styles.full}>
            <View
              style={[
                styles.full,
                styles.container
                //   { marginTop: topHeaderHeight }
              ]}
            >
              <View style={styles.header}>
                <TouchableWithoutFeedback
                  accessibilityLabel="关闭弹窗"
                  // onPress={props.onClose}
                >
                  <Icon
                    style={{ marginLeft: 20 }}
                    name="bars"
                    color="#fff"
                    size={20}
                  />
                </TouchableWithoutFeedback>
                <Text style={styles.title}>hello world</Text>
                {true && (
                  <View style={styles.extra}>
                    <Text>hello world1</Text>
                  </View>
                )}
              </View>
              <View style={styles.full}>
                <Text>hello world1 child</Text>
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  full: {
    flex: 1
  },
  container: {
    // backgroundColor: colors.cardBackground
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
    // backgroundColor: colors.inverse
  },
  header: {
    // ...mixins.rowCenter,
    justifyContent: "space-between"
    // height: sizes.gap * 2,
    // paddingHorizontal: 2,
    // borderColor: colors.border,
    // borderBottomWidth: sizes.borderWidth
  },
  title: {},
  extra: {}
});

export default Model;
