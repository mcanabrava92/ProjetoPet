import React, { useEffect } from "react"
import { Image, FlatList, TextStyle, View, ViewStyle, ImageStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"

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
  flexDirection: "row",
  padding: 10,
  alignSelf: "center",
}
const IMAGE: ImageStyle = {
  borderRadius: 35,
  height: 65,
  width: 65,
}
const LIST_TEXT: TextStyle = {
  marginLeft: 10,
}
const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}
const BUTTON_ADD: ViewStyle = {
  backgroundColor: "green",
  alignSelf: "stretch",
}
const BUTTON_EDIT: ViewStyle = {
  backgroundColor: "#2196F3",
  alignSelf: "stretch",
  width: 70,
}
const BUTTON_REMOVE: ViewStyle = {
  backgroundColor: "#FA5035",
  alignSelf: "stretch",
  width: 70,
  marginLeft: 10,
}

export const ClienteListScreen = observer(function ClienteListScreen() {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  const { clienteStore, veterinarioStore } = useStores()
  const { clientes } = clienteStore

  useEffect(() => {
    async function fetchData() {
      await clienteStore.mockClientes()
    }
    fetchData()
  }, [])

  function removerCliente(id: Number) {
    clienteStore.deleteCliente(id)
  }

  function getVeterinarioPorId(id: Number) {
    const veterinario = veterinarioStore.getVeterinarioPorId(id)
    let name = 'Nenhum veterinário associado.';
    if (veterinario) {
      name = veterinario.nome
    }
    return name
  }
  
  return (
    
    <View testID="ClienteListScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerText="Lista de Clientes"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <View style={CONTAINER_ADD}>
          <Button
            style={BUTTON_ADD}
            text="Adicionar Cliente"
            onPress={() => navigation.navigate("clienteFormCreate")}></Button>
        </View>
        <FlatList
          contentContainerStyle={FLAT_LIST}
          data={clientes}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={LIST_CONTAINER}>
              <Text style={LIST_TEXT}>
                {item.nome} ({item.status}) {"\n"}
                {item.dataNascimento} {"\n"}
                Veterinário: {"\n"}
                {getVeterinarioPorId(item.veterinarioId)}
              </Text>
              <Button
                style={BUTTON_EDIT}
                onPress={() => {
                  clienteStore.setClienteId(item.id)
                  navigation.navigate("clienteFormEdit")
                }}
                text="Editar"
                >
                  
                </Button>
              <Button
                style={BUTTON_REMOVE}
                onPress={() => { removerCliente(item.id) }}
                text="Remover"></Button>
            </View>
          )}
        />
      </Screen>
    </View>
  )
})
