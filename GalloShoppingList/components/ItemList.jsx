import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {Ionicons} from '@expo/vector-icons';

export default function ItemList({item, markItem, unmarkItem, removeItem}) {
  return (
    <View style={styles.itemList}>
      <View style= {{flex: 1}}>
      <Text style={[styles.itemToBuy, item?.bought ? {textDecorationLine: 'line-through'} : {}]}>{item?.name}</Text>
    </View>
    {!item?.bought ? (
    <TouchableOpacity
    style={styles.actionIcon}
      onPress={() => markItem (item.Id)}
      >
      <Ionicons name='bag-check-outline' size={24} color='#fff'/>
      </TouchableOpacity>
    ) : (
<TouchableOpacity
    style={styles.actionIcon}
      onPress={() => unmarkItem(item.Id)}
      >
      <Ionicons name='bag-remove-outline' size={24} color='#fff'/>
      </TouchableOpacity>
    )}
    <TouchableOpacity
    style={[styles.actionIcon, { backgroundColor: 'darkred' }]}
      onPress={() => removeItem(item.Id)}
      >
      <Ionicons name='trash-bin-outline' size={24} color='#fff'/>
      </TouchableOpacity>
    </View>

  )
}

const styles = StyleSheet.create({
    itemList: {
        padding: 15,
        elevation: 12,
        borderRadius: 7 ,
        backgroundColor: '#000000c0',
        borderWidth: 2,
        borderColor: 'white',
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center'
    },
    itemToBuy:{
        color: '#fff', fontSize: 24,
    },
    actionIcon: {
      height: 40,
      width: 40,
      backgroundColor: '#darkgreen',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
      borderRadius: 20 
    },
})