import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { PetModel } from "../pet/pet"
import { withEnvironment } from "../extensions/with-environment"
import { useStores } from "../index"

export const PetStoreModel = types
  .model("PetStore")
  .props({
    pets: types.optional(types.array(PetModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    savePets: (pets: any) => {
      self.pets.replace(pets)
    },
    savePet: (pet: any) => {
      if (self.pets.length === 0) {
        self.pets.push(pet)
      } else {
        const findIndex = self.pets.findIndex((item) => {
          return (item.id === pet.id)
        })
        if (findIndex >= 0) {
          self.pets.splice(findIndex, 1, pet)
        } else {
          self.pets.push(pet)
        }
      }
    },
    deletePet: (id: Number) => {
      console.log("Id: " + id)
      const findIndex = self.pets.findIndex((item) => {
        return (item.id === id)
      })
      if (findIndex >= 0) {
        self.pets.splice(findIndex, 1)
      }
    },
  }))
  .actions((self) => ({
    mockPets: async () => {
      const { clienteStore } = useStores()
      const cliente = clienteStore.clientes[0]
      if (self.pets.length === 0) {
        const pets = [
          PetModel.create({
            id: 1,
            nome: "Pet 1",
            especie: "Cachorro",
            clienteId: cliente ? cliente.id : null})
        ]
        self.savePets(pets)
      }
    },
  }))

type PetStoreType = Instance<typeof PetModel>
export interface PetStore extends PetStoreType {}
type PetStoreSnapshotType = SnapshotOut<typeof PetModel>
export interface PetStoreSnapshot extends PetStoreSnapshotType {}
export const createPetStoreDefaultModel = () => types.optional(PetModel, {})
