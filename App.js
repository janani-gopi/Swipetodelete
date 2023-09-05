import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  GestureDetector,
  GestureHandlerRootView,
  Gesture,
} from "react-native-gesture-handler";

const tasks = [
  {
    title: "Prepare for the meeting",
    id: 1,
  },
  {
    title: "Fill up the daily task sheet",
    id: 2,
  },
  {
    title: "water the plants",
    id: 3,
  },
  {
    title: "Don't forget the laundry",
    id: 4,
  },
];
const deviceWidth = Dimensions.get("window").width;

const threshold = deviceWidth * 0.4;
console.log(deviceWidth * 0.1);

const FlatListItem = ({ item }) => {
  const dragX = useSharedValue(0);
  const height = useSharedValue(65);
  const opacity = useSharedValue(1);

  const pan = Gesture.Pan()
    .onChange((e) => {
      dragX.value = e.translationX;
      console.log(e.absoluteX);
    })
    .onEnd((e) => {
      if (threshold < e.absoluteX) {
        dragX.value = withSpring(0);
      } else {
        dragX.value = withTiming(-deviceWidth);
        height.value = withTiming(0);
        opacity.value = withTiming(0);
      }
    });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: dragX.value }],
      height: height.value,
      opacity: opacity.value,
      marginTop:opacity.value === 1 ? 20 : 0
    };
  });
  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.task, animatedStyles]}>
        <Text style={{ marginTop: 4, padding: 5 }}>
          {item.id} . {item.title}
        </Text>
      </Animated.View>
    </GestureDetector>
  );
};

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.header}>TASKS</Text>
      <Text style={styles.header}>Swipe left to delete</Text>
      <View style={styles.taskcontainer}>
        <FlatList
          style={{ height: 600, width: "100%" }}
          data={tasks}
          renderItem={({ item }) => <FlatListItem item={item} />}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 5,
    marginTop: 20,
  },
  header: {
    fontSize: 20,
    padding: 25,
  },
  taskcontainer: {
    width: "100%",
    display: "flex",
  },
  task: {
    marginRight: "auto",
    fontSize: 15,
    width: "100%",
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 5,
    backgroundColor: "#e5e5e5",
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
    marginRight: "auto",
    marginLeft: "auto",
  },
});
