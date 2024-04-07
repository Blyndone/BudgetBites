import { View, Text } from 'react-native';

import { IconButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const PageSelector = ({ page, setPage, numItems, pageSize }) => {
  return numItems > pageSize ? (
    <View style={[styles.pagefooter]}>
      <IconButton
        icon="arrow-left-bold"
        iconColor={page > 0 ? 'black' : '#00000000'}
        size={30}
        onPress={() => {
          if (page > 0) {
            setPage(page - 1);
          }
        }}
      />
      <Text style={styles.footertitle}> More Items </Text>
      <IconButton
        icon="arrow-right-bold"
        iconColor={(page + 1) * 10 < numItems ? 'black' : '#00000000'}
        size={30}
        onPress={() => {
          {
            if ((page + 1) * 10 < numItems) setPage(page + 1);
          }
        }}
      />
    </View>
  ) : (
    <View></View>
  );
};

const styles = StyleSheet.create({
  pagefooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
  },
  footertitle: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    marginHorizontal: 30,
  },
});

export default PageSelector;
