import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Modelo Veterinário.
 */
export const ClienteModel = types.model("Cliente").props({
  id: types.identifierNumber,
  nome: types.maybe(types.string),
  dataNascimento: types.maybe(types.string),
  status: types.maybe(types.string),
  veterinarioId: types.maybe(types.integer),
})

type ClienteType = Instance<typeof ClienteModel>
export interface Cliente extends ClienteType {}
type ClienteSnapshotType = SnapshotOut<typeof ClienteModel>
export interface ClienteSnapshot extends ClienteSnapshotType {}
export const createClienteDefaultModel = () => types.optional(ClienteModel, {})
