import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions, ImageBackground } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';


export const StoreMini = ({StoreName, StoreId, StoreHours, StoreAddress, StoreRating, StoreImg, StoreImgUrl}) => {
  
  return (
    <View style={styles.storeWrapper}>
      <View style={styles.innerWrapper}>
        <View style={styles.imageWrapper}>
          <ImageBackground 
            source={StoreImg}
            style={{width: 100, height: 100}}
            // resizeMode="contain"
          >
            <View style={{flex: 1, flexDirection: "row", position: 'absolute', top: 70, left: 50, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
              <Ionicons name="star" size={14} color="white"/>
              <Text style={{color: "white", fontSize: 12}}> {StoreRating}</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.textWrapper}>
          <View style={styles.detailsWrapper}>
            <Text>{StoreName}</Text>
            <Text style={styles.detailsButton}>자세히 보기</Text>
          </View>
          <View style={styles.operationTextWrapper}>
            <Text style={{fontSize: 10, color: "grey", paddingBottom: 14}}>영업시간   {StoreHours}</Text>
            <Text style={{fontSize: 10, color: "grey"}}>주소   {StoreAddress}</Text>
          </View>
        </View> 
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  storeWrapper: {
    flex: 1,
    flexDirection: "column",
    marginVertical: 10
  },
  innerWrapper: {
    // flex: 2,
    flexDirection: "row",
    paddingHorizontal: 10
  },
  textWrapper: {
    flex: 1
  },
  detailsWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15
  },
  detailsButton: {
    backgroundColor: "#F0F0F0",
    // lineHeight: 10
    height: 30,
    width: 90,
    textAlignVertical: "center",
    textAlign: "center",
    borderRadius: 10,
    // opacity: 0.5
  },
  operationTextWrapper: {
    // alignItems: "space-between",
    justifyContent: "space-between",
    paddingHorizontal: 20
  }
});

