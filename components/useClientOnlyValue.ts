// This function is web-only as native doesn't currently support server (or build-time) rendering.
export function useClientOnlyValue<S, C>(servers: S, clients: C): S | C {
  return clients;
}
//dsfih
