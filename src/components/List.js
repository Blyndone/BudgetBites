import * as  React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, Button, FlatList, StatusBar } from 'react-native'

import { Searchbar } from 'react-native-paper';
const DATA = [


{
    img: "img location",
    name: "Name",
    desc: "Description",
    price: "Price"
},
{
    "img": "img/burger.jpg",
    "name": "Classic Burger",
    "desc": "Juicy beef patty with lettuce, tomato, and special sauce in a sesame seed bun.",
    "price": "$8.99"
},
{
    "img": "img/pizza.jpg",
    "name": "Margherita Pizza",
    "desc": "Thin crust pizza topped with fresh mozzarella, tomatoes, and basil.",
    "price": "$12.99"
},
{
    "img": "img/sushi.jpg",
    "name": "Sushi Platter",
    "desc": "Assorted sushi rolls with fresh fish, avocado, and soy sauce.",
    "price": "$16.99"
},
{
    "img": "img/pasta.jpg",
    "name": "Spaghetti Bolognese",
    "desc": "Al dente spaghetti with hearty meat sauce and grated Parmesan cheese.",
    "price": "$10.99"
},
{
    "img": "img/salad.jpg",
    "name": "Greek Salad",
    "desc": "Crisp lettuce, tomatoes, cucumbers, olives, and feta cheese with Greek dressing.",
    "price": "$7.99"
},
{
    "img": "img/tacos.jpg",
    "name": "Street Tacos",
    "desc": "Soft corn tortillas filled with seasoned grilled meat, onions, and cilantro.",
    "price": "$9.99"
},
{
    "img": "img/pancakes.jpg",
    "name": "Blueberry Pancakes",
    "desc": "Fluffy pancakes filled with blueberries and drizzled with maple syrup.",
    "price": "$6.99"
},
{
    "img": "img/ramen.jpg",
    "name": "Shoyu Ramen",
    "desc": "Japanese noodle soup with soy-flavored broth, ramen noodles, and toppings.",
    "price": "$11.99"
}
]





const Item = (props) => {
    const { img, name, desc, price } = props
    return (

        <View style={styles.item}>
        <Image  
                source={require('../../assets/OIG1.png')}
                style={{
                    width: 50, 
                    height: 50,
                }} />
        
        <Text style={styles.instance}>{name}</Text>
        <Text style={styles.instance}>{desc}</Text>
        <Text style={styles.instance}>{price}</Text>
        
    </View>

)

}

const List = () => {
    const renderItem = ({item}) => (
        <Item
            img = 'xxx'
            name = {item.name}
            desc = {item.desc}
            price = {item.price}
            />
            )
        const [searchQuery, setSearchQuery] = React.useState('');
            
            
            return (
        <SafeAreaView style={ styles.container}>
            <Text style = {{
                fontWeight: 'bold'
            }} > List of Items</Text>


          
            <Searchbar
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
            />
            <FlatList
            data = {DATA}
            renderItem={renderItem}
            keyExtractor={(item) =>item.index} />

        

        </SafeAreaView>


    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'teal',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: StatusBar.currentHeight || 0
    },
    item:{
        flex: 1,
        padding: 5,
        marginVertical: 8,
        marginHorizontal: 16,
        height: 100,
        width: 360,
        flexDirection: 'row',
        // justifyContent: 'flex-end',
        alignItems: 'center',
        borderWidth: 5,
        backgroundColor: '#fca503',
        
        
        
       

    },
    titleText:{
        fontSize: 50,
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
        fontFamily: 'Helvetica'
    },
    button:{
        color:'#f194ff',
        backgroundColor: '#f194ff'
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
      instance:{
        textAlign:'auto',
        flexBasis:120,
        flexGrow: 1
      }




})

export default List
