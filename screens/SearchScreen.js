import React, { useRef, useState } from "react";
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, CheckBox } from "react-native";
import { useSelector } from 'react-redux';
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import RecipeList from "../components/Recipe/RecipeList";
import FilterIngredient from "../components/FilterIngredient";



const SearchScreen = ({ navigation, route }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [titleBar, setTitleBar] = useState("กรอกด้วยตัวเอง");
  const [showFilter, setShowFilter] = useState(true)
  const recipes = useSelector(state => state.recipes.recipes)




  // ---------------- funtion filter จากชื่อ
  const searchHandler = (text) => {
    if (text !== "") {
      const newMenuList = recipes.filter((recipe) => {
        const itemData = recipe.name
          ? recipe.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setSearchResult(newMenuList)
      setSearchWord()
      setTitleBar("ผลการค้นหา")
      setShowFilter(false)
      // console.log(newMenuList)
    } else {
      setTitleBar("กรองด้วยตัวเอง")
      setSearchWord(text);
      setSearchResult([]);
      setShowFilter(true)
      // setFilter( < FilterIngredient />)
    }
  }

  return (
    <View style={styles.container}>
      {/* Search */}
      <View style={{ alignItems: "center", marginTop: 15, }}>
        <View style={styles.searchBorder}>
          <AntDesign name="search1" size={28} style={{ paddingTop: 6, paddingLeft: 10, paddingRight: 10, color: "#adacac" }}
          />
          <TextInput
            style={styles.searchBox}
            placeholder="ค้นหาจากชื่อเมนู..."
            onChangeText={(text) => searchHandler(text)}
            value={searchWord}
          >

          </TextInput>
          <Entypo name="cross" size={24} color="black" size={28} style={{ paddingTop: 6, color: "#adacac" }}
            onPress={(text) => searchHandler('')} />
        </View>
      </View>
      <View style={styles.headBox} >
        <Text style={styles.headText}>{titleBar} </Text>

      </View>

      {/* -------------------- FilterIngredient ---------------------------- */}
      {showFilter ? < FilterIngredient
        navigation={navigation} /> : null}

      {/* -------------------- List ผลการพิมพ์หา ---------------------------- */}
      <View style={styles.container}>
        <RecipeList
          style={{ width: "100%", height: "100%" }}
          listData={searchResult}
          navigation={navigation}
        />

      </View>

    </View>
  )

}


const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#fff",
    // maxHeight: '100%'
    // alignItems: "center",
    // justifyContent: "center",
  },
  headBox: {
    backgroundColor: "#e4efe3",
    //ตอนเอาลง tab เอา marginTop ออกด้วยนะ
    marginTop: 15,
    alignItems: "flex-start",
    padding: 8
  },
  headText: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 10
  },
  // css ของหน้าผลการค้นหา
  food: {
    height: 100,
    flex: 1,
    marginLeft: 10,
    borderRadius: 15
  },
  foodBox: {
    flexDirection: 'column',
    flex: 2,
  },
  foodName: {
    fontSize: 22,
    fontWeight: "bold",
    flex: 2,
    marginLeft: 10,
    marginTop: 10,
    flexWrap: "wrap",
  },
  foodCal: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    flex: 1,
  },
  foodTime: {
    flex: 1,
    marginLeft: 10,
  },
  timeText: {
    fontSize: 18,
    marginTop: -25,
    marginLeft: 30,
  },
  line: {
    height: 2,
    backgroundColor: "#adacac",
    marginTop: 20
  },

  // css ของหน้าค้นหาด้วยตัวเอง
  sensitiveText: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#547f53",
    alignSelf: "center",
    padding: 20
  },
  btnContainer: {
    width: "40%",
    elevation: 8,
    backgroundColor: "#8ec18d",
    borderRadius: 10,
    paddingVertical: 10,
    // paddingHorizontal: 20,
  },
  btnText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
  searchBox: {
    width: "75%",
    height: 40,
    // flex: 1,
    // borderColor: '#adacac',
    // borderWidth: 2,
    // borderRadius: 10,
    fontSize: 18,
  },
  searchBorder: {
    flexDirection: "row",
    width: "90%",
    height: 45,
    borderColor: '#8ec18d',
    borderWidth: 2,
    borderRadius: 10,
  },




});

export default SearchScreen;

{/* <Text style={{fontFamily: 'normal'}}>  normal </Text>
            <Text style={{fontFamily: 'notoserif'}}>  notoserif </Text>
            <Text style={{fontFamily: 'sans-serif'}}>  sans-serif </Text>
            <Text style={{fontFamily: 'sans-serif-light'}}>  sans-serif-light </Text>
            <Text style={{fontFamily: 'sans-serif-thin'}}>  sans-serif-thin </Text>
            <Text style={{fontFamily: 'sans-serif-condensed'}}>  sans-serif-condensed </Text>
            <Text style={{fontFamily: 'sans-serif-medium'}}>  sans-serif-medium </Text>
            <Text style={{fontFamily: 'serif'}}>  serif </Text>
            <Text style={{fontFamily: 'Roboto'}}>  Roboto </Text>
            <Text style={{fontFamily: 'monospace'}}>  monospace </Text>       */}