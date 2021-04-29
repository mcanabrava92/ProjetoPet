import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ClienteModel } from "../cliente/cliente"
import { withEnvironment } from "../extensions/with-environment"

export const ClienteStoreModel = types
  .model("ClienteStore")
  .props({
    clientes: types.optional(types.array(ClienteModel), []),
    cliente: types.optional(types.number, 0),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    setClienteId: (id: number) => {
      self.cliente = id;
    },
    saveClientes: (clientes: any) => {
      self.clientes.replace(clientes)
    },
    saveCliente: (cliente: any) => {
      if (self.clientes.length === 0) {
        self.clientes.push(cliente)
      } else {
        const findIndex = self.clientes.findIndex((item) => {
          return (item.id === cliente.id)
        })
        console.log(findIndex)
        if (findIndex >= 0) {
          self.clientes.splice(findIndex, 1, cliente)
        } else {
          self.clientes.push(cliente)
        }
      }
    },
    deleteCliente: (id: Number) => {
      console.log("Id: " + id)
      const findIndex = self.clientes.findIndex((item) => {
        return (item.id === id)
      })
      if (findIndex >= 0) {
        self.clientes.splice(findIndex, 1)
      }
    },
    getClientePorId: (id: Number) => {
      let cliente = null;
      if (id) {
        cliente = self.clientes.find((item) => {
          return (item.id === id)
        })
      }
      return cliente;
    },
  }))
  .actions((self) => ({
    mockClientes: async () => {
      if (self.clientes.length === 0) {
        const clientes = [
          ClienteModel.create({ id: 1, nome: "Cliente 1", status: "Ativo", dataNascimento: '26/04/2021', veterinarioId: 1 })
        ]
        self.saveClientes(clientes)
      }
    },
  }))

type ClienteStoreType = Instance<typeof ClienteModel>
export interface ClienteStore extends ClienteStoreType {}
type ClienteStoreSnapshotType = SnapshotOut<typeof ClienteModel>
export interface ClienteStoreSnapshot extends ClienteStoreSnapshotType {}
export const createClienteStoreDefaultModel = () => types.optional(ClienteModel, {})
