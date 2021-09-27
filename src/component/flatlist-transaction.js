import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { rupiahFormat, toLocaleDate } from "../Functions/utility";

function FlatlistTransaction({ data, navigation }) {
  //   console.log(navigation);
  return data.length === 0 ? (
    <Text style={{ fontWeight: "bold", fontSize: wp(6), color: "#7f7f7f" }}>
      No result
    </Text>
  ) : (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        let date = item.created_at.split(" ");
        // console.log(date);
        return (
          <TouchableOpacity
            style={styles.boxList}
            onPress={() => navigation.navigate("Detail", { item })}
          >
            <View
              style={[
                item.status === "SUCCESS"
                  ? styles.lineSuccess
                  : styles.linePending,
                {
                  // borderWidth: 1,
                  height: wp(22.5),
                  width: wp(2),
                  borderTopLeftRadius: 15,
                  borderBottomLeftRadius: 15,
                },
              ]}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: wp(93),
                paddingHorizontal: wp(5),
                paddingVertical: hp(1.5),
              }}
            >
              <View
                style={{ justifyContent: "center", alignItems: "flex-start" }}
              >
                <Text
                  style={{
                    fontSize: wp(4.5),
                    fontWeight: "bold",
                    textAlignVertical: "center",
                    textTransform: "uppercase",
                  }}
                >
                  {item.sender_bank}{" "}
                  <AntDesign
                    name="arrowright"
                    size={wp(4)}
                    color="black"
                    style={{ textAlignVertical: "center" }}
                  />{" "}
                  {item.beneficiary_bank}
                </Text>
                <Text
                  style={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    paddingVertical: wp(0.5),
                  }}
                >
                  {item.beneficiary_name}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>
                    {rupiahFormat(item.amount)}
                  </Text>
                  <Entypo name="dot-single" size={hp(3)} color="black" />
                  <Text style={{ fontWeight: "bold" }}>
                    {toLocaleDate(new Date(date[0]))}
                  </Text>
                </View>
              </View>
              <View
                style={
                  item.status === "SUCCESS"
                    ? styles.boxSuccess
                    : styles.boxPending
                }
              >
                <Text
                  style={
                    item.status === "SUCCESS"
                      ? styles.textSuccess
                      : styles.textPending
                  }
                >
                  {item.status === "SUCCESS" ? "Berhasil" : "Pengecekan"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  boxList: {
    height: wp(22.5),
    width: wp(95),
    flexDirection: "row",
    marginVertical: wp(1),
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  lineSuccess: {
    backgroundColor: "#55b683",
  },
  linePending: {
    backgroundColor: "#f49473",
  },
  boxSuccess: {
    justifyContent: "center",
    height: wp(8),
    width: wp(25),
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 5,
    backgroundColor: "#5ab484",
  },
  boxPending: {
    justifyContent: "center",
    borderWidth: 2,
    height: wp(8),
    width: wp(25),
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 5,
    borderColor: "#e88875",
  },
  textSuccess: {
    fontWeight: "bold",
    color: "#ffffff",
  },
  textPending: {
    fontWeight: "bold",
    color: "#010101",
  },
});

export default FlatlistTransaction;
