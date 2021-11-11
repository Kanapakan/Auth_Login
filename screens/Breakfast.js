import React, { useRef } from "react";
import {Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 


const Breakfast = ({navigation, route}) => {

  return (

// รายการที่เลือก
    <View style={styles.container}>
        <View style={styles.headBox} >
            <Text style={styles.headText}>รายการที่เลือก</Text>
        </View>

       
        {/* 1 รายการอาหาร */}
        {/* onPress={() => { navigation.navigate("MenuDetail")}} */}
        <TouchableOpacity onPress={() => { navigation.navigate("MenuDetail")}} >
            <View style={{flexDirection: 'row', marginTop: 20}}>
                <Image style={styles.food} source={require("../assets/yum.png")}/>

                <View style={styles.foodBox}>
                    <Text style={styles.foodName}>ยำวุ้นเส้น</Text>
                    <View style={styles.foodTime}>
                        <MaterialIcons name="access-time" size={26} color="black"/>
                        <Text style={styles.timeText}>10 นาที</Text>
                    </View>

                </View>
                <Text style={styles.foodCal}>120 Kcal.</Text>
            
            </View>
            <View style={styles.line} />

        </TouchableOpacity>      
      
    </View>

// ผลการค้นหา    

    // <View style={styles.container}>
    //     <View style={styles.headBox} >
    //         <Text style={styles.headText}>ผลการค้นหา</Text>
    //     </View>

       
    //     {/* 1 รายการอาหาร code เหมือนกับช้างบน*/}
    //     <View>
    //         <View style={{flexDirection: 'row', marginTop: 20}}>
    //             <Image style={styles.food} source={require("../assets/yum.png")}/>

    //             <View style={styles.foodBox}>
    //                 <Text style={styles.foodName}>ยำวุ้นเส้น</Text>
    //                 <View style={styles.foodTime}>
    //                     <MaterialIcons name="access-time" size={26} color="black"/>
    //                     <Text style={styles.timeText}>10 นาที</Text>
    //                 </View>

    //             </View>
    //             <Text style={styles.foodCal}>120 Kcal.</Text>
            
    //         </View>
    //         <View style={styles.line} />

    //     </View>      
      
    // </View>

// รายการโปรดของคุณ
    // <View style={styles.container}>
    //     <View style={styles.headBox} >
    //         <Text style={styles.headText}>รายการโปรดของคุณ</Text>
    //     </View>

       
    //     {/* 1 รายการอาหาร code เหมือนกับช้างบน*/}
    //     <View>
    //         <View style={{flexDirection: 'row', marginTop: 20}}>
    //             <Image style={styles.food} source={require("../assets/yum.png")}/>

    //             <View style={styles.foodBox}>
    //                 <Text style={styles.foodName}>ยำวุ้นเส้น</Text>
    //                 <View style={styles.foodTime}>
    //                     <MaterialIcons name="access-time" size={26} color="black"/>
    //                     <Text style={styles.timeText}>10 นาที</Text>
    //                 </View>

    //             </View>
    //             <Text style={styles.foodCal}>120 Kcal.</Text>
            
    //         </View>
    //         <View style={styles.line} />

    //     </View>      
      
    // </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  headBox:{
    backgroundColor: "#e3e3e3",
    //ตอนเอาลง tab เอา marginTop ออกด้วยนะ
    alignItems: "flex-start",
    padding: 8
  },
  headText:{
    fontSize:23,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 10
  },
  food:{
    height: 100,
    flex: 1,
    marginLeft: 10,
    borderRadius: 15
  },
  foodBox:{
    flexDirection: 'column',
    flex: 2,
  },
  foodName:{
    fontSize: 22,
    fontWeight: "bold",
    flex: 2,
    marginLeft: 10,
    marginTop: 10,
    flexWrap: "wrap",
  },
  foodCal:{
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    flex: 1,
  },
  foodTime:{
    flex: 1,
    marginLeft: 10,
    // marginTop: -180,
  },
  timeText:{
    fontSize: 18,
    marginTop: -25,
    marginLeft: 30,
  },
  line:{
      height: 2,
      backgroundColor: "#adacac",
      marginTop: 20
  }

});

export default Breakfast;

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