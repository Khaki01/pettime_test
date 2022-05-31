import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';



export function AllShopsList({route, navigation}) {
  const { item } =route.params;
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.innerContainer}>
        {/* Header */}
        <View style={styles.headerWrapper}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.headerLeft}>
              <Ionicons name="chevron-back-outline" size={32} color="black"/>
            </View>
          </TouchableOpacity>
          <View style={styles.headerMiddle}>
            <Text style={styles.title}>{item.name}</Text>
          </View>
          <View style={styles.headerRight}>
            <Ionicons name="share-social-outline" size={32} color="black"/>
          </View>
        </View>
        {/* Main Body */}
        <View style={styles.bodyWrapper}>
          <View style={styles.ImageWrapper}>
            <Image source={item.largeImg}/>
          </View>
          <View style={styles.detailsWrapper}>
            <Text>The Details are here: </Text>
            <Text> {item.hours} </Text>
            <Text>{item.address}</Text>
          </View>
        </View>
        <View style={styles.footerWrapper}>
          <View style={styles.callIconWrapper}>
            <Ionicons name="call-outline" size={18} color="white" />
          </View>
          <View style={styles.contactWrapper}>
            <Text>예약하기</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "space-between",
  },
  innerContainer: {
    flex: 1,
  },
  headerWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  headerLeft: {

  },
  headerMiddle: {

  },
  headerRight: {

  },
  bodyWrapper: {
    flex: 12,
  },
  title: {
    fontFamily: "sans-serif-condensed",
    fontSize: 17,
  },
  ImageWrapper: {
    paddingTop: 20,
  },
  detailsWrapper: {
    paddingTop: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerWrapper: {
    flex: 1,
    flexDirection: "row",
    paddingBottom: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center"
  },
  callIconWrapper: {
    // width: 10,
    borderRadius: 8,
    backgroundColor: "#4485FD",
    padding: 12,
    // borderColor: "green",
    color: "green"
  },
  contactWrapper: {
    borderRadius: 8,
    backgroundColor: "#00CC6A",
    paddingHorizontal: 100,
    paddingVertical: 12,
    alignItems: "center",
    // borderColor: "green",
  }
})