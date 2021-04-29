import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { VeterinarioModel } from "../veterinario/veterinario"
import { withEnvironment } from "../extensions/with-environment"

const IMAGE_DEFAULT = "https://rickandmortyapi.com/api/character/avatar/1.jpeg"

export const VeterinarioStoreModel = types
  .model("VeterinarioStore")
  .props({
    veterinarios: types.optional(types.array(VeterinarioModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveVeterinarios: (veterinarios: any) => {
      self.veterinarios.replace(veterinarios)
    },
    saveVeterinario: (veterinario: any) => {
      veterinario.imagem = IMAGE_DEFAULT;
      if (self.veterinarios.length === 0) {
        self.veterinarios.push(veterinario)
      } else {
        const findIndex = self.veterinarios.findIndex((item) => {
          return (item.id === veterinario.id)
        })
        if (findIndex >= 0) {
          self.veterinarios.splice(findIndex, 1, veterinario)
        } else {
          self.veterinarios.push(veterinario)
        }
      }
    },
    deleteVeterinario: (id: Number) => {
      console.log("Id: " + id)
      const findIndex = self.veterinarios.findIndex((item) => {
        return (item.id === id)
      })
      if (findIndex >= 0) {
        self.veterinarios.splice(findIndex, 1)
      }
    },
    getVeterinarioPorId: (id: Number) => {
      const find = self.veterinarios.find((item) => {
        return (item.id === id)
      })
      return find
    },
  }))
  .actions((self) => ({
    mockVeterinarios: async () => {
      if (self.veterinarios.length === 0) {
        const veterinarios = [
          VeterinarioModel.create({ id: 1, nome: "Veterinario 1", status: "Ativo", especialidade: "Clinico Geral", imagem: IMAGE_DEFAULT })
        ]
        self.saveVeterinarios(veterinarios)
      }
    },
  }))

type VeterinarioStoreType = Instance<typeof VeterinarioModel>
export interface VeterinarioStore extends VeterinarioStoreType {}
type VeterinarioStoreSnapshotType = SnapshotOut<typeof VeterinarioModel>
export interface VeterinarioStoreSnapshot extends VeterinarioStoreSnapshotType {}
export const createVeterinarioStoreDefaultModel = () => types.optional(VeterinarioModel, {})
