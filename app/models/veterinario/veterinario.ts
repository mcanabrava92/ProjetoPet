import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Modelo Veterinário.
 */
export const VeterinarioModel = types.model("Veterinario").props({
  id: types.identifierNumber,
  nome: types.maybe(types.string),
  especialidade: types.maybe(types.string),
  status: types.maybe(types.string),
  imagem: types.maybe(types.string),
})

type VeterinarioType = Instance<typeof VeterinarioModel>
export interface Veterinario extends VeterinarioType {}
type VeterinarioSnapshotType = SnapshotOut<typeof VeterinarioModel>
export interface VeterinarioSnapshot extends VeterinarioSnapshotType {}
export const createVeterinarioDefaultModel = () => types.optional(VeterinarioModel, {})
