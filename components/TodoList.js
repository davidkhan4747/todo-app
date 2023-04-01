import React from "react";
import {StyleSheet , Text ,View , TouchableOpacity , Modal} from 'react-native'
import colors from "../colors";
import TodoModal from "./TodoModal";

export default class TodoLists extends React.Component {
    state   =   {
        showListVisible : false
    }

    toggleListModal() {
        this.setState({showListVisible : !this.state.showListVisible})
    }

    deleteList = (index) => {
        let list  = this.props
        console.log(this.props )
        list.splice(index,1)

        this.props.updateList(list)
    }
    render() {
        const list  = this.props.list

        const completedTodos = list.todos.filter(todo => todo.completed).length  
        const remaingCount = list.todos.length  - completedTodos
    
        return (
            <View>
                <Modal animationType="slide" visible={this.state.showListVisible} onRequestClose={() => this.toggleListModal()}>
                   <TodoModal list={list} closeModal={()=> this.toggleListModal()} updateList={this.props.updateList}/>

                </Modal>
                <TouchableOpacity  onLongPress={() => console.log('пока что не работает')} onPress={() => this.toggleListModal()} style={[styles.listContainer , {backgroundColor:list.color}]}>
                    <Text style={styles.listTitle} numberOfLines={1}>
                        {list.name}
                    </Text>
                    <View>
                        <View style={{alignContent:"center"}}>
                            <Text style={styles.count}>{remaingCount}</Text>
                            <Text style={styles.subtitle}> Reaming</Text>
                        </View>
                        <View style={{alignContent:"center"}}>
                            <Text style={styles.completed}>{completedTodos}</Text>
                            <Text style={styles.reaming}> Completed</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            
        )
    }
   
}

const styles = StyleSheet.create({
    listContainer : {
        paddingVertical : 32 , 
        paddingHorizontal : 16 ,
        borderRadius : 6 ,
        marginHorizontal :12 ,
        alignItems :"center",
        width : 200,
    },
    listTitle : {
        fontSize:24,
        fontWeight:"700",
        color: colors.white ,
        marginBottom :18,
    },
    completed :{
        color : colors.white ,
        textAlign : 'center'
    },
    count :{
        fontSize : 48 ,
        color : colors.white ,
        textAlign : 'center',
        fontWeight:"200",

    },
    subtitle : {
        fontSize : 12,
        fontWeight : "700" ,
        color : colors.white,
        textAlign : 'center',
        paddingBottom : 10 ,
        
    },
    reaming :{
        color:colors.white,
        textAlign : 'center',
        paddingBottom : 10 ,

    }
})