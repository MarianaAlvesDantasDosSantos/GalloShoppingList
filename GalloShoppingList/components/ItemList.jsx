import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ItemList({item}) {
  return (
    <View style={styles.itemList}>
      <Text style={styles.itemToBuy}>{item?.name}</Text>
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
    }
})