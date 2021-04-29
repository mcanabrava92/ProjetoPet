import React from "react"
import { View, Image, ViewStyle, TextStyle, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper } from "../../components"
import { color, spacing, typography } from "../../theme"
const meuPetShopLogo = require("./logo_meu_pet_shop.png")

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const CONTENT: TextStyle = {
  ...TEXT,
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[5],
}
const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const FOOTER: ViewStyle = { backgroundColor: "#20162D", marginBottom: 64 }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}
const MY_STYLES = StyleSheet.create({
  logo: {
    alignSelf: "center",
    width: 200,
    height: 147,
  },
  menuItem: {
    alignItems: "center",
    backgroundColor: "#fff",
    flexGrow: 1,
    margin: 4,
    padding: 20
  },
  menuItemText: {
    color: "#5D2555"
  }
})

export const HomeScreen = observer(function HomeScreen() {
  const navigation = useNavigation()
  const menu = {
    data: [
      { id: "1", screen: "veterinarioList", title: "Listar Veterinarios" },
      { id: "2", screen: "tosadorList", title: "Listar Tosadores" },
      { id: "3", screen: "clienteList", title: "Listar Clientes" },
      { id: "4", screen: "petList", title: "Listar Pets" }
    ]
  }

  return (
    <View testID="HomeScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header headerTx="homeScreen.poweredBy" style={HEADER} titleStyle={HEADER_TITLE} />
        <Image source={meuPetShopLogo} style={MY_STYLES.logo} />
        <Text style={CONTENT}>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
        totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </Text>
        <SafeAreaView>
          <FlatList 
            data={menu.data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity style={MY_STYLES.menuItem} onPress={() => navigation.navigate(item.screen)}>
                  <Text style={MY_STYLES.menuItemText}>{item.title}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </SafeAreaView>
      </Screen>
    </View>
  )
})
