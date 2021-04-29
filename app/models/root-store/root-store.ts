import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { VeterinarioStoreModel } from "../veterianario-store/veterinario-store"
import { ClienteStoreModel } from "../cliente-store/cliente-store"
import { PetStoreModel } from "../pet-store/pet-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  veterinarioStore: types.optional(VeterinarioStoreModel, {} as any),
  clienteStore: types.optional(ClienteStoreModel, {} as any),
  petStore: types.optional(PetStoreModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
