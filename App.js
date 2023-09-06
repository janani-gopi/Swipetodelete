import { useState,} from "react";
import {styles} from "./Styles"
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Pressable,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import {
  GestureDetector,
  GestureHandlerRootView,
  Gesture,
} from "react-native-gesture-handler";

//Device width and the threshold value
const deviceWidth = Dimensions.get("window").width;
const threshold = deviceWidth * 0.4;

//tasks array
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

export default function App() {
  //state to restore the deleted tasks
  const [restore, setRestore] = useState(false);

  //FlatlistItem
  const FlatListItem = ({ item }) => {
    const dragX = useSharedValue(0);
    const height = useSharedValue(65);
    const opacity = useSharedValue(1);

    const pan = Gesture.Pan()
      .onChange((e) => {
        dragX.value = e.translationX;
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
    //animation to swipe  
    const animatedStyles = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: dragX.value }],
        height: height.value,
        opacity: opacity.value,
        marginTop: opacity.value === 1 ? 17 : 0,
      };
    });
    //restoring the task again
    const animatedStyles1 = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: withTiming(0) }],
      };
    });

    return (
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[
            styles.task,
            animatedStyles,
            restore ? animatedStyles1 : null,
          ]}
        >
          <Text style={{ marginTop: 4, padding: 5 }}>
            {item.id} . {item.title}
          </Text>
        </Animated.View>
      </GestureDetector>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.header}>TASKS</Text>
      <Text style={styles.header}>Swipe left to delete</Text>
      <View style={styles.taskcontainer}>
        <FlatList
          style={{ height: 570, width: "100%" }}
          data={tasks}
          renderItem={({ item }) => <FlatListItem item={item} />}
          keyExtractor={(item) => item.id}
          extraData={restore}
        />
      </View>
      <Animated.View style={[styles.undocontainer, { height: 60 }]}>
        <Text style={styles.undotext}>You want to undo the deleted task </Text>
        <Pressable>
          <Text
            style={styles.undobutton}
            onPress={() => {
              setRestore((prev) => !prev);
            }}
          >
            Undo
          </Text>
        </Pressable>
      </Animated.View>
    </GestureHandlerRootView>
  );
}

