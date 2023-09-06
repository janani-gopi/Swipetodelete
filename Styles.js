//styles
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      padding: 5,
      marginTop: 20,
      height: "100%",
    },
    header: {
      fontSize: 20,
      padding: 25,
    },
    taskcontainer: {
      width: "100%",
      display: "flex",
    },
  
    undocontainer: {
      width: "95%",
      backgroundColor: "#EFB495",
      elevation: 5,
      display: "flex",
      flexDirection: "row",
      borderRadius:25
    },
    undotext: {
      fontSize: 15,
      marginTop: 20,
      marginLeft: 30,
    },
    undobutton: {
      marginTop: 20,
      textDecorationLine: "underline",
      textDecorationColor: "blue",
      color: "blue",
    },
    task: {
      marginRight: "auto",
      fontSize: 15,
      width: "100%",
      paddingHorizontal: 40,
      borderRadius: 25,
      elevation: 8,
      backgroundColor: "#EFB495",
      alignContent: "center",
      justifyContent: "center",
      flex: 1,
      marginRight: "auto",
      marginLeft: "auto",
    },
  });
  