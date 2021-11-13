import React, { Component, useEffect } from 'react';
import { Text, View, StyleSheet, Platform, Animated, ScrollView, Image,TouchableOpacity, Dimensions} from 'react-native';

import { VictoryPie, VictoryBar , VictoryChart, VictoryGroup, VictoryAxis, VictoryLegend, VictoryTheme} from "victory-native";


class PieGraph extends Component {
    

    constructor() {

      super();
      this.scrollYAnimatedValue = new Animated.Value(0);
    }

    render() {
        return(
            <View style={styles.card}>

                    <View style={styles.headContainer}>
                        <Text style={styles.boldText}>สารอาหารที่ได้รับต่อวัน</Text>
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.pieHead}>200 กิโลแคลอรี่</Text>
                        <Text style={styles.piefade}>10% ของแคลอรี่ที่ควรได้รับต่อวัน</Text>

                        <View style={styles.pieChartContainer}>
                            <View style={styles.pieChart}>
                                <VictoryPie
                                data={[
                                    { y: 20, label: "20%" },
                                    { y: 10, label: "10%" },
                                    { y: 100, label: "100%" }
                                ]}
                                width={180}
                                height={180}
                                colorScale={['#ce5a57', '#78a5a3', '#444c5c']}
                                innerRadius={80}
                                labelRadius={({innerRadius}) => (180 * 0.24 + innerRadius)/2.5}
                                style={{
                                    labels: {fill: "#fff", fontSize: 16},
                                }}
                                />  

                                
                            </View> 
                            <View style={styles.pieInfo}>

                                <View style={styles.info}>
                                    <Text style={styles.infoText}>20%</Text>
                                    <Text style={styles.infoText2}>คาร์โบไฮเดรต</Text>
                                </View>

                                <View style={styles.info}>
                                    <Text style={styles.infoText}>36%</Text>
                                    <Text style={styles.infoText2}>โปรตีน</Text>                       
                                </View>

                                <View style={styles.info}>                           
                                    <Text style={styles.infoText}>20%</Text>
                                    <Text style={styles.infoText2}>ไขมัน</Text>
                                </View>

                            </View>

                        </View>                           

                    </View>

                </View>
        )
    }
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
        barChartContainer:{
          alignItems: "center",
          paddingLeft: 0
        },
    }
)
export default PieGraph;