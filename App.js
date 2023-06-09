import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View  , FlatList , Modal , ActivityIndicator} from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import colors from './colors';
import TodoList from './components/TodoList';
import AddListModal from './components/AddListModal';
import Fire from './Fire'

export default class  App extends React.Component {

  state = {
    addTodoVisible: false,
    lists : [],
    user  : {},
    loading :true,
  }

  
  componentDidMount() {
    
    firebase = new Fire( (error , user )=>{
      if(error){
         return alert("Ой , что то пошло не так ")
      }

      firebase.getLists(lists => {
        this.setState({lists,user} , ()=>{
          this.setState({loading : false})})
      })
      this.setState({user })
      console.log(user.uid)

    })
  }

  componentWillUnmount(){
        firebase.detach()
  }

  toogleAddTodoModal(){
    this.setState({addTodoVisible : !this.state.addTodoVisible})
  }

  renderList  = list => {
    return <TodoList list={list} updateList={this.updateList}/>
  }

  addList = list => {
    // this.setState({lists: [...this.state.lists,{...list , id : this.state.lists.length + 1 , todos: []}]})
    firebase.addList({
      name : list.name ,
      color  : list.color ,
      todos : [],
      
    })
  }

  updateList = list => {

    firebase.updateList(list)
  }

  render() {
    if(this.state.loading){
      return (
        <View style={styles.container}>
          <ActivityIndicator size={'large'} color={colors.blue}/>
        </View>
      )
    }
    return (

      <>
        <View style={styles.container}>
          <Modal animationType='slide' visible={this.state.addTodoVisible} onRequestClose={()=>this.toogleAddTodoModal()}> 
              <AddListModal addList={this.addList} closeModal={()=>this.toogleAddTodoModal()}/>
          </Modal>
          <View>
            {/* <Text>Пользователь : {this.state.user.uid}</Text> */}
          </View>
        <View style={{flexDirection : "row"}}>
          <View style={styles.divider}/>
            <Text style={styles.title}>
              Todo 
              <Text style={{fontWeight:"300",color:colors.blue}}> Lists</Text>
            </Text>
          <View style={styles.divider}/>
        </View>
        <View style={{marginVertical:48}}>
          <TouchableOpacity    style={styles.addList} onPress={()=>this.toogleAddTodoModal()}>
              <AntDesign name="plus" size={16} color={colors.blue} />
          </TouchableOpacity>
          <Text style={styles.add}> Add list </Text>
        </View>

        <View style={{height:275,paddingLeft:32}}>
          <FlatList 
              data={ this.state.lists }
              keyExtractor={item => item.id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false} 
              renderItem={({item})=> this.renderList(item)}
              keyboardShouldPersistTaps="always"
          />
        </View>
      </View>
        <Text style={styles.me}>© Davidkhan Khodjayev</Text>

      </>
      
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider : {
    backgroundColor : colors.lightBlue,
    height : 1 ,
    flex : 1 ,
    alignSelf : "center",
  },
  title : {
    fontSize : 38 ,
    fontWeight : "800",
    color : colors.black,
    paddingHorizontal : 64,
  },
  addList : {
    borderWidth : 2 ,
    borderColor : colors.lightBlue ,
    borderRadius :4,
    padding : 16 ,
    alignItems :  "center",
    justifyContent : 'center'
  },
  add : {
     color: colors.blue,
     fontWeight : "600",
     fontSize:14,
     marginTop : 8 ,
  },
  me : {
    fontSize : 16,
    fontWeight : '400',
    margin : 25,
    // display : 'none'
  }
});
