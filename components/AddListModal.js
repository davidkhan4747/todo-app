import { AntDesign } from '@expo/vector-icons';
import React, { Component } from 'react';
import { View , StyleSheet , Text , KeyboardAvoidingView, TouchableOpacity , TextInput} from 'react-native';
import colors from '../colors';
import tempData from '../tempData';
export default class AddListModal extends Component {
    backgrounColors = ["#5CD859" , '#24A6D9', '#595BD9' ,"#8022D9",'#D159D8',"#D85963" , "#D88559"]
    state = {
        name : "",
        color : this.backgrounColors[0]
    }
    createTodo =() => {
        const {name , color} = this.state
        // tempData.push({
        //     name ,
        //     color,
        //     todos:[],
        // })
        const list = {name , color}
        this.props.addList(list)
        this.setState({ name : "" })
        this.props.closeModal()
    }
    renderColors() {
        return this.backgrounColors.map(color =>{
            return (
                <TouchableOpacity
                    key={color}
                    style={[styles.colorSelect , {backgroundColor: color}]}
                    onPress={() => this.setState({color})}


                />
            )
        })
    }
 render(){
  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <TouchableOpacity style={{position : 'absolute' , top:64 , right:32}} onPress={this.props.closeModal}>
            <AntDesign name='close' size={28} color={colors.blue} />
        </TouchableOpacity>

        <View style={{alignSelf : 'stretch' ,marginHorizontal: 32}}>
            <Text style={styles.title}>Создай Todo лист</Text>
            <TextInput 
                style={styles.input} 
                placeholder = "Название ?"
                onChangeText={text => this.setState({name : text})}
                />
            <View style= {{flexDirection : 'row' , justifyContent :'space-between' , marginTop : 12 , padding : 10}}>
                {this.renderColors()}
            </View>
            <TouchableOpacity style={[styles.create , {backgroundColor: this.state.color}]} onPress={this.createTodo}>
                <Text style={{color: colors.white , fontWeight:'600', textAlign:'center'}}> Создать</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
   );
 }
}

const styles = StyleSheet.create({
    container : {
        flex : 1 , 
        justifyContent : 'center',
        alignItems : 'center'
    },
    title : {
        color : colors.black,
        fontSize : 28,
        fontWeight : "800",
        alignSelf : 'center',
        marginBottom  : 16
    },
    input : {
        borderWidth : StyleSheet.hairlineWidth,
        borderColor : colors.lightBlue,
        borderRadius : 6,
        height : 50 , 
        marginTop : 8,
        paddingHorizontal : 16,
        fontSize : 18 ,

    },
    create : {
        marginTop :24 ,
        height : 50 ,
        borderRadius :6,
        alignItems : "center",
        justifyContent   : 'center',

    },
    colorSelect :{
        width : 30,
        height : 30 ,
        borderRadius : 4
    }
})