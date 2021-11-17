import React, { Component, useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, Platform, Animated, ScrollView, Image,TouchableOpacity, Dimensions} from 'react-native';
import { set } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { VictoryPie, VictoryBar , VictoryChart, VictoryGroup, VictoryAxis, VictoryLegend, VictoryTheme} from "victory-native";


const PieGraph =(props) =>{

      const scrollYAnimatedValue = useRef(new Animated.Value(0)).current;
      const eatKcal = (useSelector((state) => state.recipes.sumEatKcals))
      // const userData = (useSelector((state) => state.user.userDetail))
      // const userHistory = Object.values((useSelector((state) => state.user.userHistory)))
      // const userday = Object.keys(useSelector((state) => state.user.userHistory))
      // const[userHis, setUserHis] = useState([]);
      const sumNutient = (props.listData.carbs+props.listData.fats+props.listData.proteins)
      let percentEat;
      let fats;
      let proteins;
      let carbs;
      if(sumNutient == 0){
        percentEat = 0;
        fats = props.listData.fats
        proteins = 0
        carbs = 0
      } else {
        percentEat = parseFloat((props.listData.eatKcals/props.dataUser.TDEE)*100).toFixed(1)
        fats = (parseFloat(props.listData.fats/sumNutient)*100).toFixed(1)
        proteins = (parseFloat(props.listData.proteins/sumNutient)*100).toFixed(1)
        carbs = (parseFloat(props.listData.carbs/sumNutient)*100).toFixed(1)
      }
     
      // console.log("Hi", props.listData)


        return(
            <View style={styles.card}>

                    <View style={styles.headContainer}>
                        <Text style={styles.boldText}>สารอาหารที่ได้รับต่อวัน</Text>
                      {/* <Text>{props.listData.day}</Text> */}
                      {/* <Text>{userday}</Text> */}
                    </View>
                    
                    <View style={styles.infoContainer}>
                        <Text style={styles.pieHead}>{props.listData.eatKcals} กิโลแคลอรี่</Text>
                        <Text style={styles.piefade}>{percentEat}% ของแคลอรี่ที่ควรได้รับต่อวัน</Text>

                        <View style={styles.pieChartContainer}>
                            <View style={styles.pieChart}>
                                <VictoryPie
                                data={ sumNutient ? [
                                    { y: fats, label: fats + "%" },
                                    { y: proteins, label: proteins + "%"},
                                    { y: carbs, label: carbs +"%" }
                                ] : [{ y: 1, label: 0 + "%" }]
                                  }
                                width={185}
                                height={170}
                                colorScale={['#ce5a57', '#78a5a3', '#444c5c']}
                                innerRadius={80}
                                labelRadius={({innerRadius}) => (190 * 0.15 + innerRadius)/2.65}
                                style={{
                                    labels: {fill: "#fff", fontSize: 15},
                                }}
                                />  

                                
                            </View> 
                            <View style={styles.pieInfo}>

                                <View style={styles.info}>
                                    <Text style={styles.infoText}>{carbs}%</Text>
                                    <Text style={styles.infoText2}>คาร์โบไฮเดรต</Text>
                                </View>

                                <View style={styles.info}>
                                    <Text style={styles.infoText}>{proteins}%</Text>
                                    <Text style={styles.infoText2}>โปรตีน</Text>                       
                                </View>

                                <View style={styles.info}>                           
                                    <Text style={styles.infoText}>{fats}%</Text>
                                    <Text style={styles.infoText2}>ไขมัน</Text>
                                </View>

                            </View>

                        </View>                           

                    </View>

                </View>
        )
    }


const styles = StyleSheet.create(
    {
      container: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "white",
        paddingTop: 30,
        // paddingBottom: 40,
  
      },
      animatedHeaderContainer: {
        position: 'absolute',
        top: (Platform.OS == 'ios') ? 20 : 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
      },
      item:{
        backgroundColor: "#9bcc8f",
          width: "100%",
          flexDirection: "row",
          // padding: 2,
          paddingTop: 50,
          paddingBottom: 5,
          justifyContent: "center"
    },
      left:{
          flex: 1,
          paddingLeft: 5
      },
      right:{
          flex: 1,
      },
      Card:{
          backgroundColor:"white",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          borderColor: "#9bcc8f",
          borderWidth: 2,
          borderRadius: 10,
          margin: 20,
          backgroundColor: "#9bcc8f" ,
          
        },
        square:{
          width: 120,
          height: 80,
          borderColor: "#9bcc8f",
          backgroundColor: "#fff",
          borderWidth: 3,
          borderRadius: 10,
          // marginTop: 20,
          justifyContent: "center",
      },
        typeFood:{
          fontSize: 16,
          fontWeight: "bold",
          alignSelf: "center",
          color: "#6b6969",
          margin: 3
        },
        foodImage:{
          height: "40%",
          width: "45%",
          alignSelf: "center",
        },
        card:{
            flexDirection: "column",
            borderRadius: 10,
            borderWidth: 3,
            borderColor: "#e4efe3",
            margin: 20
        },
        headContainer:{
            flex: 1,
            padding: 15,
            backgroundColor: "#e4efe3",
        },
        boldText:{
            fontSize: 22,
            fontWeight: "bold",
            alignSelf: "center" 
        },
        infoContainer:{
          flex: 1,
          backgroundColor: "white"
          // padding: 15,
        },
        pieHead:{
          fontSize: 20,
          fontWeight: "bold",
          marginLeft: 15,
          marginTop: 10,
          marginBottom: 5
        },
        piefade:{
          fontSize: 16,
          color: "gray",
          marginLeft: 15,
          marginBottom: 10
        },
        pieChartContainer:{
          flexDirection: "row",
          alignItems: "center"
        },
        pieChart:{
            flex: 1,
            paddingBottom: 10
        },
        pieInfo:{ 
            flex: 1,
            marginLeft: 10,
        },
        info:{
          flexDirection: "row",
        },
        infoText:{
          flex: 0.4,
          fontSize: 16,
          padding: 7
        },
        infoText2:{
            flex: 1,
            fontSize: 16,
            fontWeight: "bold",
            padding: 5
        },

    }
)
export default PieGraph;