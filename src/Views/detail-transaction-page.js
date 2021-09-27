import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { rupiahFormat, toLocaleDate } from "../Functions/utility";

function DetailTransactionPage({ navigation, route }) {
  const { params } = route;
  const date = params.item.created_at.split(" ");

  return (
    <View style={[styles.container]}>
      <View
        style={{
          //
          backgroundColor: "#ffffff",
          width: wp(95),
          height: wp(20),
          marginTop: 2,
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "row",
          paddingHorizontal: wp(2.5),
        }}
      >
        <Text
          style={{ fontWeight: "bold", marginRight: 10, fontSize: wp(3.75) }}
        >
          ID TRANSAKSI: #<Text>{params.item.id}</Text>
        </Text>
        <MaterialIcons name="content-copy" size={24} color="#d6745a" />
      </View>
      <View
        style={{
          //
          backgroundColor: "#ffffff",
          width: wp(95),
          height: wp(20),
          marginTop: 2,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          paddingHorizontal: wp(2.5),
        }}
      >
        <Text style={{ fontSize: wp(3.75), fontWeight: "bold" }}>
          DETAIL TRANSAKSI
        </Text>
        <TouchableOpacity
          style={{
            height: wp(7.5),
            width: wp(15),
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("List")}
        >
          <Text style={{ color: "#ff622c" }}>Tutup</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          //
          backgroundColor: "#ffffff",
          width: wp(95),
          height: wp(75),
          marginTop: 5,
          paddingHorizontal: wp(2.5),
          paddingVertical: wp(5),
        }}
      >
        <View>
          <Text
            style={{
              fontSize: wp(4.5),
              fontWeight: "bold",
              textAlignVertical: "center",
              textTransform: "uppercase",
            }}
          >
            {params.item.sender_bank}{" "}
            <AntDesign
              name="arrowright"
              size={wp(4)}
              color="black"
              style={{ textAlignVertical: "center" }}
            />{" "}
            {params.item.beneficiary_bank}
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ height: wp(15), width: wp(45) }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: wp(4),
                textTransform: "uppercase",
              }}
            >
              {params.item.beneficiary_name}
            </Text>
            <Text>{params.item.account_number}</Text>
          </View>
          <View style={{ height: wp(15), width: wp(45) }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: wp(4),
                textTransform: "uppercase",
              }}
            >
              Nominal
            </Text>
            <Text>{rupiahFormat(params.item.amount)}</Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ height: wp(15), width: wp(45) }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: wp(4),
                textTransform: "uppercase",
              }}
            >
              Berita Tranfer
            </Text>
            <Text>{params.item.remark}</Text>
          </View>
          <View style={{ height: wp(15), width: wp(45) }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: wp(4),
                textTransform: "uppercase",
              }}
            >
              Kode Unik
            </Text>
            <Text>{params.item.unique_code}</Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ height: wp(15), width: wp(45) }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: wp(4),
                textTransform: "uppercase",
              }}
            >
              waktu dibuat
            </Text>
            <Text>{toLocaleDate(new Date(date[0]))}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: hp(5),
    backgroundColor: "#f5f9f8",
  },
});

export default DetailTransactionPage;
