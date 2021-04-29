import React, { useState, useEffect } from "react"
import { TextStyle, View, ViewStyle, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { BulletItem, Button, Header, Screen, TextField, Wallpaper } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"
import DatePicker from 'react-native-datepicker'
import RadioGroup from 'react-native-radio-buttons-group'


const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}
const LIST_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  padding: 10,
}
const CONTAINER_ADD: ViewStyle = {
  ...LIST_CONTAINER,
  alignItems: "center",
  flexDirection: "column",
  padding: 10,
  alignSelf: "center",
  alignContent: "center",
}
const BUTTON_SAVE: ViewStyle = {
  backgroundColor: "green",
  alignSelf: "center",
  width: 110,
  marginTop: 20
}
const TEXT_FIELD: ViewStyle = {
  width: 300,
}
const TEXT_FIELD_CONTENT: TextStyle = {
  fontSize: 16,
  fontWeight: "bold",
  color: "#5D2555",
  padding: 8,
}

export const ClienteFormEditScreen = observer(function ClienteFormEditScreen() {
  const navigation = useNavigation()
  
  const goBack = () => navigation.goBack()

  const { clienteStore, veterinarioStore } = useStores()
  let radioButtonsData = []
  veterinarioStore.veterinarios.forEach((element, index) => {
    radioButtonsData[index] = {
      id: `${element.id}`,
      label: element.nome,
      value: `${element.id}`,
      color: "#FFF",
      labelStyle: {color: "white"}
    }
  });
  console.log(clienteStore.cliente)
  const [clienteId, setSelecionarClienteId] = useState(0);
  const [dataNascimento, setSelecionarDataNascimento] = useState("");
  const [nomeSelecionado, setSelecionarNome] = useState("");
  const [status, setSelecionarStatus] = useState("");
  const [veterinarioRadioGroup, setSelecionarVeterinarioId] = useState(radioButtonsData);
  
  let cliente = null

  useEffect(() => {
    
    cliente=clienteStore.getClientePorId(clienteStore.cliente)
    setSelecionarClienteId(clienteStore.cliente)
    setSelecionarNome (cliente.nome)
    setSelecionarDataNascimento (cliente.dataNascimento)
    setSelecionarStatus (cliente.status)
    console.log (veterinarioRadioGroup)
    
    let arr = []
    veterinarioRadioGroup.forEach(element => {
      element.selected=(parseInt(element.value)===cliente.veterinarioId)
      arr.push(element)
    })
    setSelecionarVeterinarioId(arr)
  }, [])


  function adicionarNovoCliente() {
    const veterinarioSelecionado = veterinarioRadioGroup.find((item) => {
      return (item.selected)
    })
    if (veterinarioSelecionado) {
      console.log(dataNascimento)
      clienteStore.saveCliente({
        id:clienteId,
        nome: nomeSelecionado,
        dataNascimento,
        status,
        veterinarioId: parseInt(veterinarioSelecionado.value)
      })
      navigation.navigate("home")
      navigation.navigate("clienteList")
      }
      else {
        Alert.alert(
          "Atenção",
          "Olá antes de cadastrar o Cliente é necessário cadastrar um Veterinário",
          [
            { text: "OK", onPress: () => navigation.navigate('home') }
          ]
        );
      }
    }


  return (
    <View testID="ClienteListScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerText="Alterar Cliente"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <View style={CONTAINER_ADD}>
          <TextField
            value={nomeSelecionado}
            onChangeText={setSelecionarNome}
            inputStyle={TEXT_FIELD_CONTENT}
            style={TEXT_FIELD}
            placeholder="Nome"/>
          <DatePicker
            format="DD/MM/YYYY"
            mode="date"
            placeholder="Data de Nascimento"
            style={{width: 200, backgroundColor: "white"}}
            date={dataNascimento}
            onDateChange={setSelecionarDataNascimento}></DatePicker>
          <TextField
            value={status}
            onChangeText={setSelecionarStatus}
            inputStyle={TEXT_FIELD_CONTENT}
            style={TEXT_FIELD}
            placeholder="Status"/>
          <RadioGroup 
            radioButtons={veterinarioRadioGroup} 
            onPress={setSelecionarVeterinarioId} 
          />
          <Button
            style={BUTTON_SAVE}
            text="Alterar Cliente"
            onPress={() => { adicionarNovoCliente() }}></Button>
        </View>
      </Screen>
    </View>
  )
})
