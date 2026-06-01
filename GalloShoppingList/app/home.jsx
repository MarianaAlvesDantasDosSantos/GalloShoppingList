import React , {useState, useEffect, use} from 'react';
import {
  Alert,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ItemList from '../components/ItemList';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
const [textInput, setTextInput] = ('');
const [items, setItems] = useState ([]);

useEffect(() => {
  getItemsFromDevice();
}, []);

useEffect(() => {
  saveItemDevice();
}, [items]);

// Função para salvar a lista no storage  do aparelho 
const saveItemDevice = async () => {
try {
  const itemJson  = JSOM.stringify(items);
  await AsyncStorage.setItem('galloShoppingList', itemJson);
} catch (error) {
  console.log(`Erro: ${error}`);
}
};

// Função para buscar a lista no storage do aparelho
const getItemsFromDevice = async() => {
  try {
    const items = await AsyncStorage.getItem('galloShoppingList');
    if (items != null)
      setItems(JSON.parse(items));
  } catch (error) {
    console.log(`Erro: ${error}`);
  }
};

function addProduto () {
  //console.log(textInput);
  if (textInput == '') {
    Alert.alert(
      'Ocorreu um problema : (',
      'Por favor, informe o nome do produto'
    );
    return;
  }
  const newItem = {
    id: Date.now().toString(),
    name: textInput,
    bought: false
  };
  setItems([...items, newItem]);
  setTextInput('');
}

  function addProduto() {
    Alert.alert("Adicionar Produto");
  }

function markProduto(itemId) {
const newItems = items.map((item) => {
  if (item.id == itemId) {
    return {...item, bought: true }
  } 
  return item;
});
setItems(newItems);
}

function unmarkProduto(itemId) {
const newItems = items.map((item) => {
  if (item.id == itemId) {
    return {...item, bought: false }
  } 
  return item;
});
setItems(newItems);
}

function removeProduto(itemId) {
alert.alert('Excluir Produto?',
'Confirma a exclusão deste Produto?',
[
  {
     text: 'Sim', onPress: () => {
      const newItems = items.filter(item => item.id != itemId);
      setItems(newItems);
     }
  },
  {
    text: 'Cancelar', style:'cancel'
  }
]
);
}

function removeAll() {
alert.alert('Limpar Lista?',
'Confirma a exclusão de todos os produtos?',
[
  {
     text: 'Sim', onPress: () => { setItems([]); }
  },
  {
    text: 'Cancelar', style:'cancel'
  }
]
);
}

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <ImageBackground
        source={require('../assets/background.jpg')}
        resizeMode='repeat'
        style={{ flex: 1, justifyContent: 'flex-start' }}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Lista de Compras</Text>
          <Ionicons name='trash' size={32} color="#fff" onPress={removeAll}/>
        </View>

        {/* Lista de Produtos */}
        <FlatList
        contentContainerStyle={{padding: 20, color:'#fff'}}
        data={Items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) =>
          <ItemList 
        item={item}
        markItem={markProduto}
        unmarkItem={unmarkProduto}
        removeItem={removeProduto}
         />
      }
        />

        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput
              color="#fff"
              fontSize={18}
              placeholder='Digite o nome do produto...'
              placeholderTextColor="#aeaeae"
              value={textInput}
              onChangeText={(text) => setTextInput(text)}
            />
          </View>
          <TouchableOpacity style={styles.iconContainer} onPress={addProduto}>
            <Ionicons name="add" size={36} color="#fff" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    padding: 25,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000000c0',
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#000000c0',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    paddingBottom: 40,
  },
  inputContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    elevation: 40,
    flex: 1,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
  },
  iconContainer: {
    borderRadius: 25,
    height: 50,
    width: 50,
    backgroundColor: '#000',
    elevation: 40,
    justifyContent: 'center',
    alignItems: 'center',
  }
})