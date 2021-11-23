import React, { Component, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Platform, Animated, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { VictoryPie, VictoryBar, VictoryChart, VictoryGroup, VictoryAxis, VictoryLegend, VictoryTheme } from "victory-native";
import moment from "moment";
import { Ionicons } from '@expo/vector-icons';
import { firebase } from '../../database/firebaseDb'
const dbrealTime = firebase.app().database('https://fir-react-example-1e215-default-rtdb.asia-southeast1.firebasedatabase.app/');
import { auth } from '../../database/Auth';

const BarChart = (props) => {
  const date_create = moment().format("DD/MM")
  const date_day = moment().format("DD")
  const datePick = (useSelector((state) => state.user.datePick))
  const eatKcal = (useSelector((state) => state.recipes.sumEatKcals))
  const [backweek, setBackweek] = useState(0);
  const dateAllHis = props.listData
  const [mon, setMon] = useState(0)
  const [tue, settue] = useState(0)
  const [wed, setwed] = useState(0)
  const [thu, setthu] = useState(0)
  const [fri, setfri] = useState(0)
  const [sat, setSat] = useState(0)
  const [sun, setsun] = useState(0)
  const back =   parseInt(date_day) - parseInt(datePick)
  const userTDEE = props.userTDEE
  const userEatKcal= props.userKcal

const checkCalDate = (thatDate) => {
      let data = 0
      const index = Object.keys(dateAllHis).findIndex(date => date == thatDate)
      // console.log(index)
      if(index >= 0){
        const datekey = Object.values(dateAllHis)[index].dateKey
        // console.log("kkkkkkkkkkk", (Object.values(dateAllHis))[index])
        dbrealTime.ref("user_History/Recipe_of_day/" + datekey).on('value', snapshot => {
  
        data = (snapshot.val()).sumCal
        console.log("dataaaa", data)
        // return data
      })
  
      } else [
        data = 0
      ]
      return data
      }
  useEffect(() => {
    
  
    // (checkCalDate("21-11-2021"))
    // console.log(datePick, back)
    setMon(checkCalDate(moment().subtract((backweek + 6 +back), 'days').format('DD-MM-YYYY')))
    settue(checkCalDate(moment().subtract((backweek + 5 +back), 'days').format('DD-MM-YYYY')))
    setwed(checkCalDate(moment().subtract((backweek + 4 +back), 'days').format('DD-MM-YYYY')))
    setthu(checkCalDate(moment().subtract((backweek + 3 +back), 'days').format('DD-MM-YYYY')))
    setfri(checkCalDate(moment().subtract((backweek + 2 +back), 'days').format('DD-MM-YYYY')))
    setSat(checkCalDate(moment().subtract((backweek + 1 +back), 'days').format('DD-MM-YYYY')))
    setsun(checkCalDate(moment().subtract((backweek +back), 'days').format('DD-MM-YYYY')))
  }, [userEatKcal, backweek ]);



  const backWeek = () => {

    setBackweek(backweek + 7)
  }

  const foreWeek = () => {
    setBackweek(backweek - 7)
  }
  // console.log(((dateAllHis)))
  
  
  return (
    <View style={styles.card}>

      <View style={styles.headContainer}>
        <View style={styles.textContainer}>
          <Ionicons style={{ paddingRight: 13, paddingTop: 5 }} name="chevron-back" size={24} color="black" onPress={backWeek} />
          <Text style={styles.boldText}>ปริมาณแคลอรี่ที่ได้รับต่อวัน</Text>
          <Ionicons style={{ paddingLeft: 13, paddingTop: 5 }} name="chevron-forward-outline" size={24} color="black" onPress={foreWeek} />
        </View>

      </View>

      <View style={styles.infoContainer}>

        <View style={styles.BarChartContainer}>
          <VictoryChart
            width={380}
            height={250}
            theme={VictoryTheme.material} 
            maxDomain={{ y: userTDEE }}
            
            >



            <VictoryGroup offset={15}>

              <VictoryBar 
              animate={{
                onLoad: {duration: 1000},
                duration: 500,
                easing: "bounce",

              }}
                data={
                  [
                    { x: moment().subtract(backweek + 6 +back, 'days').format('DD/MM'), y: mon},
                    { x: moment().subtract(backweek + 5 +back, 'days').format('DD/MM'), y: tue },
                    { x: moment().subtract(backweek + 4 +back, 'days').format('DD/MM'), y: thu },
                    { x: moment().subtract(backweek + 3 +back, 'days').format('DD/MM'), y: wed },
                    { x: moment().subtract(backweek + 2 +back, 'days').format('DD/MM'), y: fri },
                    { x: moment().subtract(backweek + 1 +back , 'days').format('DD/MM'), y: sat },
                    { x: moment().subtract(backweek +back, 'days').format('DD/MM'), y: sun }
                  ]}
                // labels={(data) => (data.datum.y)
                // }

                style={{
                  labels: {
                    fontSize: 11
                  },
                  data: {
                    fill: "#9bcc8f"
                  }
                }}
              />

              <VictoryLegend
                x={Dimensions.get('screen').width / 2 - 50}
                data={[
                  {
                    name: 'date',
                    symbol: {
                      fill: "#9bcc8f"
                    }
                  }
                ]}
              />
            </VictoryGroup>
          </VictoryChart>
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
      paddingBottom: 40,

    },
    animatedHeaderContainer: {
      position: 'absolute',
      top: (Platform.OS == 'ios') ? 20 : 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center'
    },
    item: {
      backgroundColor: "#9bcc8f",
      width: "100%",
      flexDirection: "row",
      // padding: 2,
      paddingTop: 50,
      paddingBottom: 5,
      justifyContent: "center"
    },
    item2: {
      backgroundColor: "#9bcc8f",
      // justifyContent: "center",
      width: "100%",
      flexDirection: "row",
      padding: 2,
      // paddingTop: 40,
      paddingBottom: 15,
      justifyContent: "center"
    },
    left: {
      flex: 1,
      paddingLeft: 5
    },
    middle: {
      flex: 1,
    },
    right: {
      flex: 1,
    },
    hearderText: {
      fontSize: 25,
      fontWeight: "bold",
      color: "#fff",
      alignSelf: 'center'
    },
    hearderText2: {
      fontSize: 15,
      fontWeight: "bold",
      color: "#fff",
      alignSelf: 'center'
    },
    Card: {
      backgroundColor: "white",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      borderColor: "#9bcc8f",
      borderWidth: 2,
      borderRadius: 10,
      margin: 20,
      backgroundColor: "#9bcc8f",

    },
    square: {
      width: 120,
      height: 80,
      borderColor: "#9bcc8f",
      backgroundColor: "#fff",
      borderWidth: 3,
      borderRadius: 10,
      // marginTop: 20,
      justifyContent: "center",
    },
    typeFood: {
      fontSize: 16,
      fontWeight: "bold",
      alignSelf: "center",
      color: "#6b6969",
      margin: 3
    },
    foodImage: {
      height: "40%",
      width: "45%",
      alignSelf: "center",
    },
    card: {
      flexDirection: "column",
      borderRadius: 10,
      borderWidth: 3,
      borderColor: "#e4efe3",
      margin: 20
    },
    headContainer: {
      flex: 1,
      padding: 15,
      backgroundColor: "#e4efe3",

    },
    textContainer: {
      flexDirection: "row",
      alignSelf: "center",
    },
    boldText: {
      fontSize: 22,
      fontWeight: "bold",
      alignSelf: "center"
    },
    infoContainer: {
      flex: 1,
      backgroundColor: "white"
      // padding: 15,
    },
    pieHead: {
      fontSize: 20,
      fontWeight: "bold",
      marginLeft: 10,
      marginTop: 10,
      marginBottom: 5
    },
    piefade: {
      fontSize: 16,
      color: "#adacaf",
      marginLeft: 10,
      marginBottom: 10
    },
    pieChartContainer: {
      flexDirection: "row",
      alignItems: "center"
    },
    pieChart: {
      flex: 1,
    },
    pieInfo: {

      flex: 1,
      marginLeft: 10,
    },
    info: {
      flexDirection: "row",
    },
    infoText: {
      flex: 0.3,
      fontSize: 16,
      padding: 5
    },
    infoText2: {
      flex: 1,
      fontSize: 16,
      fontWeight: "bold",
      padding: 5
    },
    BarChartContainer: {
      alignItems: "center",
      paddingLeft: 15,
      // paddingLeft: 0
    },
  }
)
export default BarChart;