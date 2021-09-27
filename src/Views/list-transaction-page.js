import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Modal,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { filterAndSortList, getDataTransaction } from "../Store/action";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import FlatlistTransaction from "../component/flatlist-transaction";

const itemSort = [
  {
    id: 1,
    value: "urutkan",
    title: "Urutkan",
  },
  {
    id: 2,
    value: "nameASC",
    title: "Nama A-Z",
  },
  {
    id: 3,
    value: "nameDESC",
    title: "Nama Z-A",
  },
  {
    id: 4,
    value: "timeASC",
    title: "Tanggal Terbaru",
  },
  {
    id: 5,
    value: "timeDESC",
    title: "Tanggal Terlama",
  },
];

function ListTransactionPage({ navigation }) {
  const dispatch = useDispatch();
  const listFilteredSorted = useSelector((state) => state.listFilteredSorted);
  const [loading, setLoading] = useState(false);
  const [urutkan, setUrutkan] = useState({
    id: 1,
    value: "urutkan",
    title: "Urutkan",
  });

  const [timeOutId, setTimeOutId] = useState(null);
  const [textSearch, setTextSearch] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      setTextSearch("");
      await dispatch(getDataTransaction());
      dispatch(filterAndSortList("", urutkan.value));
      setLoading(false);
    }
    getData();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.boxSearch}>
        <AntDesign
          name="search1"
          size={wp(6)}
          color="#bcbbbb"
          style={{ marginRight: wp(2) }}
        />
        <TextInput
          style={{ width: wp(60), height: wp(7.5), fontSize: wp(5) }}
          placeholder="Cari nama, bank, nominal"
          value={textSearch}
          placeholderTextColor="#a1a1a1"
          onChangeText={(text) => {
            setLoading(true);
            clearTimeout(timeOutId);
            setTextSearch(text);
            setTimeOutId(
              setTimeout(() => {
                dispatch(filterAndSortList(text, urutkan.value));
                setLoading(false);
              }, 1500)
            );
          }}
        />
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: wp(20),
            height: wp(7.5),
          }}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ color: "#f76649" }}>{urutkan.title}</Text>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="#f76649" />
        </TouchableOpacity>
        <Modal
          animationType="fade"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          transparent={true}
        >
          <Pressable
            style={{
              width: wp(100),
              height: hp(100),
              backgroundColor: "#7f7f7fb3",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
            onPress={() => setModalVisible(false)}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f2f2f2",
                width: wp(75),
                height: wp(75),
                paddingVertical: wp(5),
              }}
            >
              <FlatList
                data={itemSort}
                keyExtractor={(item) => item.id}
                style={{ width: wp(70) }}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      style={{
                        width: wp(70),
                        height: wp(10),
                        marginTop: wp(2),
                        justifyContent: "flex-start",
                        alignItems: "center",
                        flexDirection: "row",
                        paddingHorizontal: wp(2),
                      }}
                      onPress={() => {
                        setUrutkan(item);
                        setLoading(true);
                        clearTimeout(timeOutId);
                        setTimeOutId(
                          setTimeout(() => {
                            dispatch(filterAndSortList(textSearch, item.value));
                            setLoading(false);
                          }, 1500)
                        );
                        setModalVisible(false);
                      }}
                    >
                      <View
                        style={{
                          width: wp(7.5),
                          height: wp(7.5),
                          borderRadius: 50,
                          borderWidth: 3,
                          justifyContent: "center",
                          alignItems: "center",
                          borderColor: "#f76649",
                        }}
                      >
                        {urutkan.value === item.value ? (
                          <View
                            style={{
                              width: wp(5),
                              height: wp(5),
                              borderRadius: 10,
                              backgroundColor: "#f76649",
                            }}
                          />
                        ) : null}
                      </View>
                      <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </Pressable>
        </Modal>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#FFBD00" />
      ) : (
        <FlatlistTransaction
          data={listFilteredSorted}
          navigation={navigation}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: hp(5),
    backgroundColor: "#f5f9f8",
  },
  boxSearch: {
    // borderWidth: 1,
    width: wp(95),
    height: wp(15),
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: wp(4),
    marginBottom: hp(2),
    backgroundColor: "#ffffff",
  },
});

export default ListTransactionPage;
