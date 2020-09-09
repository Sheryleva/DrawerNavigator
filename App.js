import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from "react-navigation-stack"
import { Ionicons } from '@expo/vector-icons';


const Header =({name, openDrawer})=> (
  <View style={styles.header}>
    <TouchableOpacity onPress={()=>openDrawer()}>
      <Ionicons name="ios-menu" size={32} />
    </TouchableOpacity>
    <Text>{name}</Text>
    <Text style={{width:50}}></Text>
  </View>
)
const Home = ({navigation}) => (
  <View style={styles.container}>
    <Header name="Home" openDrawer={navigation.openDrawer}/>
    <Text style={{padding:20}}>
      Welcome to the Home Screen!
    </Text>
  </View>
)

const Profile = ({navigation}) => (
  <View style={styles.container1}>
    <Header name="Profile" openDrawer={navigation.openDrawer}/>
    <Text style={{padding:20}}>
      Welcome to the Profile Screen!
    </Text>
  </View>
)

const Settings = ({navigation}) => (
  <View style={styles.container2}>
    <Header name="Settings" openDrawer={navigation.openDrawer}/>
    <Text style={{padding:20}}>
    Welcome to the Settings Screen!    
    </Text>
  </View>
)

function Item({ item, navigate }) {
  return (
    <TouchableOpacity style={styles.listItem} onPress={()=>navigate(item.name)}>
      <Ionicons name={item.icon} size={32} />
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );
}

class Sidebar extends React.Component {
  state = {
      routes:[
          {
              name:"Home",
              icon:"ios-home"
          },
          {
              name:"Profile",
              icon:"ios-contact"
          },
          {
              name:"Settings",
              icon:"ios-settings"
          },
      ]
  }

  
  render(){
      return (
          <View style={styles.container}>
              <Text style={{fontWeight:"bold",fontSize:16,marginTop:10}}>Sheryl's App</Text>
              <View style={styles.sidebarDivider}></View>
              <FlatList
                  style={{width:"100%",marginLeft:30}}
                  data={this.state.routes}
                  renderItem={({ item }) => <Item  item={item} navigate={this.props.navigation.navigate}/>}
                  keyExtractor={item => item.name}
              />
          </View>
      )
  }
}

const Drawer = createDrawerNavigator(
  {
    Home:{ screen: Home},
    Profile:{ screen: Profile},
    Settings:{ screen: Settings}

  },
  {
    initialRouteName: "Home",
    unmountInactiveRoutes: true,
    headerMode: "none",
    contentComponent: props => <Sidebar {...props} />
  }
)

const AppNavigator = createStackNavigator(
  {
    Drawer : {screen: Drawer},
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none",
    unmountInactiveRoutes: true
  }
)

const AppContainer = createAppContainer(AppNavigator);



export default class App extends React.Component {
  render(){

    return (
      <AppContainer />
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffc1cc",
    paddingTop:40,
    alignItems:"center",
    flex:1

  },
  container1: {
    backgroundColor: "#99e6b3",
    paddingTop:40,
    alignItems:"center",
    flex:1

  },
  container2: {
    backgroundColor: "#e12c2c",
    paddingTop:40,
    alignItems:"center",
    flex:1

  },
  listItem:{
      height:60,
      alignItems:"center",
      flexDirection:"row",
  },
  title:{
      fontSize:18,
      marginLeft:20
  },
  header:{
    width:"100%",
    height:60,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal:20
  },
  profileImg:{
    width:80,
    height:80,
    borderRadius:40,
    marginTop:20
  },
  sidebarDivider:{
    height:1,
    width:"100%",
    backgroundColor:"lightgray",
    marginVertical:10
  }
});