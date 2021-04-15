import { GraphConnection, GraphEdge } from '@src/modules/shared/SharedTypes';
import produce, { castDraft } from 'immer';

export const addEdgeToConnection = <
  T,
  Conn extends GraphConnection<T>,
  Edge extends GraphEdge<T>
>(
  connection: Conn,
  // Note that data that comes from the closure, and not from the base state,
  // will never be drafted, even when the data has become part of the new draft.
  // So, if we mutate this "edge" in produce, we will still be mutating the original one.
  // https://immerjs.github.io/immer/docs/pitfalls
  edge: Edge,
) => {
  // Inserting the new edge to the beginning of the connection
  const newConnection = produce(connection, (draft) => {
    const newEdge = castDraft(edge);
    if (draft.edges) {
      draft.edges.unshift(newEdge);
    } else {
      draft.edges = [newEdge];
    }
  });

  return newConnection;
};
