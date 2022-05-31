import React from 'react';
import { Dimensions, StyleSheet, View, FlatList } from 'react-native';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import { MARKERS_DATA } from '../../data';
import { ListItem } from './listBottom';


const windowHeight = Dimensions.get('window').height;
// const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);
// const sheetRef = useRef<BottomSheet>(null);
// const handleSheetChange = useCallback((index) => {
//   console.log("handleSheetChange", index);
// }, []);

export function BottomSheets({ onPressElement }) {
  return (
    <ScrollBottomSheet
      componentType="FlatList"
      snapPoints={[128, '50%', windowHeight - 200]}
      initialSnapIndex={2}
      renderHandle={() => (
        <View style={styles.header}>
          <View style={styles.panelHandle} />
        </View>
      )}
      data={MARKERS_DATA}
      keyExtractor={(i) => i.id}
      renderItem={({ item }) => (
        <ListItem item={item} onPressElement={onPressElement} />
      )}
      contentContainerStyle={styles.contentContainerStyle}
    />
  );
}



const styles = StyleSheet.create({
  contentContainerStyle: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 20,
    // padding: 30,
  },
  panelHandle: {
    width: 41,
    height: 4,
    backgroundColor: '#E1E1E1',
    borderRadius: 17,
  },
  container2: {
    // flex: 6,
    // height: windowHeight,
  }
});