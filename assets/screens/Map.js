import React, {useRef, useMemo, useCallback, useState} from 'react';
import { StyleSheet, View, Dimensions, Image, Text, Button, TouchableHighlight, FlatList, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Alert } from 'react-native-maps';
import { mapStyle } from './mapStyle';
import { MARKERS_DATA } from '../data';
import { useMap } from './useMap';
import { StoreMini } from '../components/StoreMini'
import { BottomSheets } from '../components/BottomSheets/BottomSheet'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from 'react-native/Libraries/NewAppScreen';
// import { TouchableOpacity } from 'react-native-web';


const Tab = createBottomTabNavigator();

export function MyTabs() {

  function Home() {
    console.log("IT IS HOME");
    return (
      <View></View>
    );
  }
  
  function Profile({varat}) {
    console.log("IT IS PROFILE");
    return (
      <View></View>
    );
  }

  return (
    <View style={styles.bottomNav}>
    {/* <NavigationContainer> */}
      <Tab.Navigator
      initialRouteName="Main"
      // barStyle={{ marginLeft:10, marginRight:10 }}
      screenOptions={{
        tabBarActiveTintColor: '#ffa031',
        tabBarStyle:{
          padding: 5,
          // margin: 10,
          backgroundColor:'white',
          position:'absolute',
          height:80,
          width: Dimensions.get('window').width,
          // bottom: 0,
        },
        tabBarLabelStyle: {
          fontSize: 10
        }
      }}
      
    >
      <Tab.Screen
        name="Activity"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: 'Activity',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="동네모임"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: '동네모임',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Main"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: 'Main',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="border-all" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="동네피드"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: '동네피드',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart-circle-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          // tabBarShowLabel: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle-outline" color={color} size={size} />
          ),
        }}
      />

    </Tab.Navigator>
    {/* </NavigationContainer> */}
    </View>
  );
}




// ############################# MAIN SCREEN #####################

export function MapScreen({navigation}) {

  const bottomFullListRef = useRef(null);

  const openFullList = () => {
    bottomFullListRef.current?.present();
  }
  const closeFullList = useCallback(() => {
    bottomFullListRef.current?.dismiss();
  }, []);

  const [selectedStoreData, setSelectedStoreData] = useState(null);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['30%', '80%'], []);

  const openModal = (item) => {
    setSelectedStoreData(item);
    bottomSheetModalRef.current.present();
  }
  const handleClosePress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const {
    mapRef,
  } = useMap();
  return (
    <BottomSheetModalProvider>
    <View style={styles.container}>
      <MapView
      ref={mapRef}
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        initialRegion={{
          latitude: 37.560373,
          longitude: 126.981955,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        }}
        mapType="standard"
      >
        {MARKERS_DATA.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            onPress={()=> openModal(marker)}
          >
            <Image source={ marker.img } style={{ height: 32, width:32}}/>
            
          </Marker>
          
        ))}
        
      </MapView>
      {/* Search */}
      <View style={{flex: 1, flexDirection: "row", position: 'absolute', top: 0, left: 0, right: 0, bottom: "70%", justifyContent: 'center', alignItems: 'center', marginHorizontal: 30}}>
        <View style={styles.searchButtonWrapper}>
          <Ionicons name="chevron-back-outline" size={20} color="black"/>
        </View>
        <View style={styles.searchText}>
          <Text style={{color: "grey", fontSize: 12}}> Search</Text>
        </View>
      </View>
      {/* <BottomSheets onPressElement={handleNavigateToPoint}/> */}
      <View style={styles.expandButton}>
        <View>
          <TouchableHighlight onPress={openFullList} underlayColor="grey">
            <Ionicons name="caret-up-outline" size={32} color="black"/>
          </TouchableHighlight>
        </View>
          
          <BottomSheetModal
            ref={bottomFullListRef}
            index={1}
            snapPoints={snapPoints}
            style={styles.bottomListWrapper}
            enablePanDownToClose={true}
          >         
            
            <View style={styles.bottomPopUp}>
            <Button title="Close" onPress={() => closeFullList()} />
              <FlatList
                keyExtractor={(item) => item.id}
                data={MARKERS_DATA}
                renderItem={({ item }) => (
                  <TouchableOpacity key={item.id} onPress={() => navigation.navigate('Details', {
                    item: item,
                  })}>
                    <StoreMini 
                      StoreName={item.name}
                      StoreId={item.id}
                      StoreHours={item.hours}
                      StoreAddress={item.address}
                      StoreRating={item.rating}
                      StoreImg={item.storeImg}
                      StoreLargeImg={item.largeImg}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
          </BottomSheetModal>
      </View>
      <MyTabs />
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomSheetWrapper}
        enablePanDownToClose={true}
      > 
        <Button title="Close" onPress={() => handleClosePress()} color="purple"/>
        <View style={styles.IconWrapper}>
          <View style={styles.IconDesign}>
            <Ionicons name="options-outline" size={32} color="black"/>
          </View>
        </View>
        <View style={styles.bottomPopUp}>
          { selectedStoreData ? (
            <TouchableOpacity key={selectedStoreData.id} onPress={() => navigation.navigate('Details', {
              item: selectedStoreData,
            })}>
              <StoreMini 
              StoreName={selectedStoreData.name}
              StoreId={selectedStoreData.id}
              StoreHours={selectedStoreData.hours}
              StoreAddress={selectedStoreData.address}
              StoreRating={selectedStoreData.rating}
              StoreImg={selectedStoreData.storeImg}
              StoreLargeImg={selectedStoreData.largeImg}
            />
            </TouchableOpacity>
          ):null}
          
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}







const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapStyle: {
    flex: 18,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height-60,
  },
  bottomNav: {
    flex: 2,
    width: Dimensions.get('window').width,
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  bottomSheet: {
    flex: 4
  },
  bottomSheetWrapper: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomListWrapper: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 24,
    backgroundColor: 'white',
  },
  bottomeCloseButton: {
    width: 32,
    height: 32,
    backgroundColor: 'grey'
  },
  bottomPopUp: {
    flex: 1,
    justifyContent: 'space-between'
  },
  bottomList: {
    flex: 10
  },
  expandButton: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20
  },
  IconWrapper: {
    marginTop: 5,
    width: Dimensions.get('window').width,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 30,
  },
  IconDesign: {
    backgroundColor: "#F2F2F2",
    marginBottom: 5,
    borderRadius: 5,
  },
  searchButtonWrapper: {
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  searchText: {
    flex: 1,
    marginLeft: 10,
    paddingLeft: 10,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#F2F2F2",
    borderWidth: 2,
    borderColor: "#E1E1E1",
    justifyContent: "center"
  },
});