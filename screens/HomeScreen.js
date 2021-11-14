import React, { useRef, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Platform, Animated, ScrollView, Image,TouchableOpacity, Dimensions} from 'react-native';
import { VictoryPie, VictoryBar , VictoryChart, VictoryGroup, VictoryAxis, VictoryLegend, VictoryTheme} from "victory-native";
import  db from '../database/firebaseDb'
import { auth } from '../database/Auth';
import moment from "moment";
import { useSelector } from 'react-redux';
// import { toggleUsers } from "../store/actions/UserAction";
import PieGraph from '../components/dashboad/PieGraph';
import BarChart from '../components/dashboad/BarChart';




const Home = ({navigation, route}, props) => {
    const [userArr, setUserArr]= useState([]);

    const scrollYAnimatedValue =  useRef(new Animated.Value(0)).current;
    const date_create = moment().format("DD/MM/YYYY")
    const HEADER_MIN_HEIGHT = 100;
    const HEADER_MAX_HEIGHT = 100
    const eatKcal = (useSelector((state) => state.recipes.sumEatKcals))
    
    const firestoreRef = db.collection('userDetail');

    useEffect(() => {
      const unsubscribe = firestoreRef.onSnapshot(getuser);
          return () => {
              unsubscribe();
              
          }
    }, []);
  
    //Get user detail from collection
    const getuser = () => {
         firestoreRef
        .get()
        .then(querySnapshot  => {
          querySnapshot.forEach(documentSnapshot => {

            if(auth.currentUser?.uid === documentSnapshot.data().userId){
                
              const userArr2 = [];
              userArr2.push(documentSnapshot.data())
              // setState({userArr: userArr2[0]})
              setUserArr(userArr2[0])
              // console.log(userArr)
            }
          });
      })
  }


    

    // const { navigation } = this.props;
    const headerHeight = scrollYAnimatedValue.interpolate(
      {
        inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp'
      });

    const headerBackgroundColor = scrollYAnimatedValue.interpolate(
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
            [{ nativeEvent: { contentOffset: { y: scrollYAnimatedValue } } }], {useNativeDriver: false}
          )}>
          
                <View style={[styles.Card]}>
                    
                    {/* กดไปหน้า มื้ออาหาร */}
                        <TouchableOpacity style={styles.square} onPress={() => { navigation.navigate("ThreeTimeMeals", { mealTime: "breakfast", mealTimeThai: "มื้อเช้า" }) }}> 
                            <Image style={styles.foodImage} source={require("../assets/egg.png")} />
                            <Text style={styles.typeFood}>มื้อเช้า</Text>
                            
    
                        </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.square} onPress={() => { navigation.navigate("ThreeTimeMeals", { mealTime: "lunch", mealTimeThai: "มื้อกลางวัน" }) }}> 
                        <Image style={styles.foodImage} source={require("../assets/sanwich.png")}/>
                        <Text style={styles.typeFood}>มื้อกลางวัน</Text>
                       
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.square} onPress={() => { navigation.navigate("ThreeTimeMeals", { mealTime: "dinner", mealTimeThai: "มื้อเย็น" }) }}> 
                        <Image style={styles.foodImage} source={require("../assets/pasta.png")}/>
                        <Text style={styles.typeFood}>มื้อเย็น</Text>
                        
                    </TouchableOpacity>
                
                </View>

                <PieGraph />
                <BarChart />
                {/* <View style={styles.card}>

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

                </View> */}

                {/* <View style={styles.card}>

                    <View style={styles.headContainer}>
                        <Text style={styles.boldText}>ปริมาณแคลอรี่ที่ได้รับต่อวัน</Text>
                    </View>

                    <View style={styles.infoContainer}>
                        
                        <View style={styles.barChartContainer}>
                            <VictoryChart
                             width={350}
                             height={250}
                             theme={VictoryTheme.material} >
   

     
                                <VictoryGroup offset={30}>

                                <VictoryBar
                                    data={
                                        [
                                            { x: "5/10", y: 1050 },
                                            { x: "6/10",  y: 550 },
                                            { x: "7/10",  y: 1750 },
                                            { x: "8/10",  y: 750 },
                                            { x: "9/10",  y: 1050 },
                                            { x: "10/10", y: 550 },
                                            { x: "11/10", y: 550 },

                                        ]}
                                        labels={(data) => ( data.datum.y )}
  
                                    style={{
                                        labels:{
                                             fontSize: 12
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
                </View> */}
        </ScrollView>

{/* ------------------- cal Bar ----------------------------------------- */}
        <Animated.View style={[styles.animatedHeaderContainer, { height: headerHeight}]}>
           
           <View style={styles.item}>
                  <Text style={styles.hearderText2}>{date_create}</Text>
                </View>
            <View style={styles.item2}>
                {/* แอดค่า cal แล้ว */}
                <View style={styles.left}>
                    <Text style={styles.hearderText}>{userArr.TDEE}</Text>
                    <Text style={styles.hearderText2}>แคลอรี่ที่ควรได้รับ</Text>
                </View>

                <View style={{flex: 0.1}}>
                    <Text style={styles.hearderText}>-</Text>
                </View>

                <View style={styles.middle}>
                    <Text style={styles.hearderText}>{eatKcal}</Text>
                    <Text style={styles.hearderText2}>แคลอรี่อาหาร</Text>
                </View>

                <View style={{flex: 0.1}}>
                    <Text style={styles.hearderText}>=</Text>
                </View>

                <View style={styles.right}>
                    <Text style={styles.hearderText}>{userArr.TDEE - eatKcal}</Text>
                    <Text style={styles.hearderText2}>แคลอรี่คงเหลือ</Text>
                </View>
            
            </View>

        </Animated.View>

      </View>
    );
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
      


    
  });
  export default Home;