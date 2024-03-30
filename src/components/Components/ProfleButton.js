import { Pressable, Text, StyleSheet } from 'react-native';

const ProfileButton = ({ navigation, data }) => {
  return (
    <Pressable
      onPress={() => {
        if (data.user_type == 'seller') {
          navigation.navigate({
            name: 'Seller Profile',
            params: { data },
          });
        } else if (data.user_type == 'buyer') {
          navigation.navigate({
            name: 'Buyer Profile',
            params: { data },
          });
        } else {
          navigation.navigate({
            name: 'Splash',
            params: { data },
          });
        }

        console.log(data.user_type);
      }}
    >
      <Text style={[styles.headerButton]}>Profile</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  headerButton: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
});

export default ProfileButton;
