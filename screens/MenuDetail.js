import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, Platform, Animated, ScrollView, Image,TouchableOpacity, } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 

import {Picker} from '@react-native-picker/picker';

const HEADER_MIN_HEIGHT = 100;
const HEADER_MAX_HEIGHT = 300;

class MenuDetail extends Component {

  constructor() {
    super();

    this.scrollYAnimatedValue = new Animated.Value(0);
  }


  render() {

    const headerHeight = this.scrollYAnimatedValue.interpolate(
      {
        inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp'
      });

    const headerBackgroundColor = this.scrollYAnimatedValue.interpolate(
      {
        inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
        outputRange: ['#000', '#000'],
        extrapolate: 'clamp'
      });

    return (
      <View style={styles.container} >
        <ScrollView
          contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }], {useNativeDriver: false}
          )}>
          
                <View style={[styles.foodCard]}>

                    {/* carbohydrate card */}
                    <View style={styles.square}> 
                        <Text style={styles.typeFood}>คาร์โบไฮเดรต</Text>
                        <Image style={styles.typeImage} source={require("../assets/carbohydrate-removebg.png")}/>
                        <Text style={styles.gram}>10g</Text>
                    </View>

                    {/* carbohydrate card */}
                    <View style={styles.square}> 
                        <Text style={styles.typeFood}>โปรตีน</Text>
                        <Image style={styles.typeImage} source={require("../assets/protein-removebg.png")}/>
                        <Text style={styles.gram}>10g</Text>
                    </View>

                    {/* fat card */}
                    <View style={styles.square}> 
                        <Text style={styles.typeFood}>ไขมัน</Text>
                        <Image style={styles.typeImage} source={require("../assets/fat-removebg.png")}/>
                        <Text style={styles.gram}>2g</Text>
                    </View>
                
                </View>
                

                <Text style={styles.header}>วัตถุดิบ</Text>
                {/* ตัวอย่างที่ลองใส่มา code เหมือนกัน เปลี่ยนแค่ชื่อกับปริมาณที่ใส่ */}

                {/* มายองเนส */}
                <View style={styles.ingredianBox}>

                    <View style={[styles.detailIngredian, {flex: 1}]}>
                        <Octicons name="primitive-dot" size={24} color="#6b6969"/>
                        <Text style={styles.ingredianName}>มายองเนส</Text>
                    </View>

                    <View style={[styles.amountBox, {flex: 1}]}>
                        <Text style={styles.amount}>1/2 ช้อนโต๊ะ</Text>
                    </View>                  

                </View>

                {/* น้ำตาล */}
                <View style={styles.ingredianBox}>

                    <View style={[styles.detailIngredian, {flex: 1}]}>
                        <Octicons name="primitive-dot" size={24} color="#6b6969"/>
                        <Text style={styles.ingredianName}>น้ำตาล</Text>
                    </View>

                    <View style={[styles.amountBox, {flex: 1}]}>
                        <Text style={styles.amount}>1/4 ช้อนโต๊ะ</Text>
                    </View>                  

                </View>


                <Text style={styles.header}>วิธีทำ</Text>
                {/* ตัวอย่างที่ลองใส่มา code เหมือนกัน เปลี่ยนแค่ข้อมูล*/} 
                {/* step 1 */}
                <View style={styles.stepBox}>
                    <Text style={styles.step}>1.</Text>
                    <Text style={styles.stepDetail}>ใส่ปลาทูน่ากระป๋องลงในชามสำหรับผสม</Text>
                </View>

                {/* step 2 */}
                <View style={styles.stepBox}>
                    <Text style={styles.step}>2.</Text>
                    <Text style={styles.stepDetail}>ปรุงรสด้วยแคร์ช้อยส์สูตรดั้งเดิม น้ำปลา น้ำมะนาว พริกป่นตามชอบ คลุกเคล้าให้เข้ากันดี</Text>
                </View>             
                
                
                <View style={styles.line} />

                <View style={styles.bottom}>
                    <Text style={styles.foodCalBottom}>120 Kcal.</Text>   
                    <View style={styles.pickerBorder}>
                        <Picker 
                        // selectedValue={selectedValue}
                        style={styles.pickerdropdown}
                         // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                  
                        >
                        {/* อย่าลืม disable  และจัดให้ตรงกลาง*/}
                            <Picker.Item label="กรุณาเลือก" value="" />
                            <Picker.Item label="อาหารเช้า" value="breakfast" />
                            <Picker.Item label="อาหารกลางวัน" value="lunch" />
                            <Picker.Item label="อาหารเย็น" value="dinner" />
                        </Picker >
                    </View>              

                </View>

            <View style={{alignItems: "center" , marginTop: 20, marginBottom: 20}}>
            <TouchableOpacity 
                // onPress={} 
                style={styles.btnContainer}>
                <Text style={styles.btnText}>บันทึกลงตารางอาหาร</Text>
            </TouchableOpacity>
        </View>

        </ScrollView>

        <Animated.View style={[styles.animatedHeaderContainer, { height: headerHeight}]}>
            <View style={[styles.item1, {flex:2}]}>
                <Image style={styles.foodImage} source={require("../assets/yum.png")}/>
            </View>

            <View style={styles.item2}>
                <View style={{flexDirection: 'row'}}>

                <View style={[styles.left ,{flex:2}]}>

                    <Text style={styles.foodName}>ยำวุ้นเส้น</Text>

                    <View style={styles.foodTime}>
                        <MaterialIcons name="access-time" size={26} color="black"/>
                        <Text style={styles.timeText}>10 นาที</Text>
                    </View>

                </View> 

                <View style={[styles.right ,{flex:1}]}>

                    {/* ไอคอนตอนกด fav สีดำ */}
                    <Ionicons name="bookmark" size={40} color="black" style={styles.favIcon}/>
                    {/* ไอคอนตอนยังไม่กด fav สีขาว */}
                    {/* <Ionicons name="bookmark-outline" size={40} color="black" style={styles.favIcon}/> */}

                    <Text style={styles.foodCal}>120 Kcal.</Text>                   
                </View> 

                </View>
            </View>

        </Animated.View>

      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      justifyContent: "center",
      flexDirection: "column"

    },
    animatedHeaderContainer: {
      position: 'absolute',
      top: (Platform.OS == 'ios') ? 20 : 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center'
    },
    headerText: {
      color: 'white',
      fontSize: 22
    },
    item: {
      backgroundColor: '#ff9e80',
      margin: 8,
      height: 45,
      justifyContent: 'center',
      alignItems: 'center'
    },
    item2:{
        backgroundColor: "#e4efe3",
        // justifyContent: "center",
        width: "100%"
    },
    itemText: {
      color: 'black',
      fontSize: 16
    },
    item1:{
        backgroundColor:"#fff" ,
        height: 150,
        width: "100%",
        
      },
      foodImage: {
        height: "100%",
        width: "100%"
    },
      foodName:{
        fontSize:35,
        fontWeight: "bold",
        color: "#547f53",
        flexWrap: "wrap",
        marginLeft: 20,
        marginTop: 10,
      },
      foodTime:{
        marginLeft: 20,
        marginTop: 10,
      },
      timeText:{
        fontSize: 18,
        marginTop: -25,
        marginLeft: 30,
        marginBottom: 10
      },
      foodCal:{
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20
      },
      left:{
          backgroundColor: "#e4efe3",
      },
      right:{
        backgroundColor: "#e4efe3",
      },
      favIcon:{
        alignSelf: "flex-end",
        marginTop: -6,
        marginRight: 10
      },
      square:{
        width: 110,
        height: 120,
        borderColor: "#b7cbb6",
        borderWidth: 4,
        borderRadius: 10,
        margin: 10,
        marginTop: 20,
        justifyContent: "center",
    },
      typeFood:{
        fontSize: 14,
        fontWeight: "bold",
        alignSelf: "center",
        color: "#6b6969",
        margin: 5
      },
      typeImage:{
        height: "40%",
        width: "60%",
        alignSelf: "center",
      },
      gram:{
        fontSize: 19,
        alignSelf: "center",
        color: "#6b6969",
        margin: 5
      },
      foodCard:{
        backgroundColor:"white",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      },
      ingredianBox:{
        flexDirection: "row",
        margin: 5,
      },
      header:{
        fontSize: 22,
        fontWeight: "bold",
        color: "black",
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 10
      },
      detailIngredian:{
        marginLeft: 40
      },
      amountBox:{
        justifyContent: "center"
      },
      ingredianName:{
        fontSize: 18,
        color: "#6b6969",
        marginTop: -26,
        marginLeft: 20,
        flexWrap: "wrap"
      },
      amount:{
        fontSize: 18,
        color: "#6b6969",
      },
      stepBox:{
        flexDirection: "row",
        marginLeft: 40,
        marginRight: 30
      },   
      step:{
        flex: 0.07,
        fontSize: 18,
        color: "#6b6969",
        marginTop: 5
      },
      stepDetail:{
        flex: 1,
        fontSize: 18,
        color: "#6b6969",
        marginTop: 5,
        flexWrap: "wrap",
      },
      line:{
        height: 2,
        backgroundColor: "#adacac",
        marginTop: 20
      },
      bottom:{
        flexDirection: "row",
      },
      foodCalBottom:{
        flex: 1,
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
        marginLeft: 40,
        // backgroundColor: "green"
      },
      pickerBorder:{
        flex: 1,
        width: "80%",
        height: 40,
        borderColor: '#8ec18d',
        borderWidth: 2,
        borderRadius: 10,
        marginTop: 20,
        marginRight: 40,
      },
      btnContainer: {
        width: "60%",
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
      pickerdropdown:{
        fontFamily: 'serif',
        fontSize: 18,
        // paddingHorizontal: 10,
        // paddingVertical: 10,
        // borderWidth: 2,
        // borderColor: '#8ec18d',
        color: "#adacac",
        // fontWeight: "bold",
        // borderRadius: 8,
        marginTop: -5,
        // padding: 4,
        // borderStyle: "hidden",
        textAlign: "center"
      }
    
  });
  export default MenuDetail;