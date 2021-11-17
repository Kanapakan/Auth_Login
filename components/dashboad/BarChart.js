import React, { Component, useEffect } from 'react';
import { Text, View, StyleSheet, Platform, Animated, ScrollView, Image,TouchableOpacity, Dimensions} from 'react-native';
import { useSelector } from 'react-redux';
import { VictoryPie, VictoryBar , VictoryChart, VictoryGroup, VictoryAxis, VictoryLegend, VictoryTheme} from "victory-native";
import moment from "moment";

const BarChart = (props) =>{
  const date_create = moment().format("DD/MM")
  const date_day = moment().format("DD")
  const eatKcal = (useSelector((state) => state.recipes.sumEatKcals))

        return(
            <View style={styles.card}>

            <View style={styles.headContainer}>
                <Text style={styles.boldText}>ปริมาณแคลอรี่ที่ได้รับต่อวัน</Text>
            </View>

            <View style={styles.infoContainer}>
                
                <View style={styles.BarChartContainer}>
                    <VictoryChart
                     width={380}
                     height={250}
                     theme={VictoryTheme.material} >



                        <VictoryGroup offset={20}>

                        <VictoryBar
                            data={
                                [
                                    { x: "5/10", y: 1050 },
                                    { x: "6/10",  y: 550 },
                                    { x: "7/10",  y: 1750 },
                                    { x: "8/10",  y: 750 },
                                    { x: "9/10",  y: 1050 },
                                    { x: date_day, y: 550 },
                                    { x: date_create, y: eatKcal },

                                ]}
                                labels={(data) => ( data.datum.y )}

                            style={{
                                labels:{
                                     fontSize: 11
                                },
                                data: {
                                    fill: "#9bcc8f"
                                    }
                                }}
                        />

                        <VictoryLegend
                            x={Dimensions.get('screen').width/2-50}
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
      item:{
        backgroundColor: "#9bcc8f",
          width: "100%",
          flexDirection: "row",
          // padding: 2,
          paddingTop: 50,
          paddingBottom: 5,
          justifyContent: "center"
    },
      item2:{
          backgroundColor: "#9bcc8f",
          // justifyContent: "center",
          width: "100%",
          flexDirection: "row",
          padding: 2,
          // paddingTop: 40,
          paddingBottom: 15,
          justifyContent: "center"
      },
      left:{
          flex: 1,
          paddingLeft: 5
      },
      middle:{
          flex: 1,
      },
      right:{
          flex: 1,
      },
      hearderText:{
          fontSize: 25,
          fontWeight: "bold",
          color: "#fff",
          alignSelf: 'center'
      },
      hearderText2:{
          fontSize: 15,
          fontWeight: "bold",
          color: "#fff",
          alignSelf: 'center'
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
          marginLeft: 10,
          marginTop: 10,
          marginBottom: 5
        },
        piefade:{
          fontSize: 16,
          color: "#adacaf",
          marginLeft: 10,
          marginBottom: 10
        },
        pieChartContainer:{
          flexDirection: "row",
          alignItems: "center"
        },
        pieChart:{
            flex: 1,
        },
        pieInfo:{
            
            flex: 1,
            marginLeft: 10,
        },
        info:{
          flexDirection: "row",
        },
        infoText:{
          flex: 0.3,
          fontSize: 16,
          padding: 5
        },
        infoText2:{
            flex: 1,
            fontSize: 16,
            fontWeight: "bold",
            padding: 5
        },
        BarChartContainer:{
          alignItems: "center",
          paddingLeft: 15,
          // paddingLeft: 0
        },
    }
)
export default BarChart;