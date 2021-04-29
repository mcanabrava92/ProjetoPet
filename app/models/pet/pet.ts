import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Modelo Veterinário.
 */
export const PetModel = types.model("Pet").props({
  id: types.identifierNumber,
  nome: types.maybe(types.string),
  especie: types.maybe(types.string),
  clienteId: types.maybe(types.integer),
})

type PetType = Instance<typeof PetModel>
export interface Pet extends PetType {}
type PetSnapshotType = SnapshotOut<typeof PetModel>
export interface PetSnapshot extends PetSnapshotType {}
export const createPetDefaultModel = () => types.optional(PetModel, {})
