import { Socket, io } from 'socket.io-client';

type AttachListenersType = <T>(event: string, callback: (data: T) => void) => void;
type EmitEventType = <T>(eventName: string, data: T) => void;

type SocketConnection = {
  attachListeners: AttachListenersType;
  emitEvent: EmitEventType;
  disconnect: () => void;
};

const connections: Map<string, SocketConnection> = new Map();

const attachListeners = <T>(socket: Socket, event: string, callback: (data: T) => void): void => {
  if (!socket) {
    throw new Error('Socket.io connection not established.');
  }
  socket.on(event, (data: T) => {
    console.log('Data received => ', { event, data });
    callback(data);
  });
};

const emitEvent = <T>(socket: Socket, eventName: string, data: T): void => {
  if (!socket) {
    throw new Error('Socket.io connection not established.');
  }
  console.log({ eventName, data });

  socket.emit(eventName, data);
};

const disconnect = (socket: Socket): void => {
  if (socket) {
    socket.disconnect();
  }
};

const connect = (
  namespace: string,
  params: Record<string, string> = {},
): Promise<SocketConnection> => {
  return new Promise((resolve) => {
    const urlParams = new URLSearchParams(params).toString();
    const newConn = io(`${process.env.REACT_APP_API_URL}${namespace}?${urlParams}`, {
      extraHeaders: { 'X-Api-Key': process.env.REACT_APP_API_KEY },
    });
    newConn.on('connect', () => {
      console.log('Connected to Socket.io server');

      resolve({
        attachListeners: attachListeners.bind(null, newConn) as AttachListenersType,
        emitEvent: emitEvent.bind(null, newConn),
        disconnect: disconnect.bind(null, newConn),
      });
    });
  });
};

const getConnection = async (
  namespace: string,
  params: Record<string, string> = {},
): Promise<SocketConnection> => {
  const connName = namespace + JSON.stringify(params);

  let conn = connections.get(connName);

  if (conn) {
    return conn;
  }

  conn = await connect(namespace, params);
  const originalDisconect = conn.disconnect;
  conn.disconnect = () => {
    originalDisconect.call(null);
    connections.delete(connName);
  };
  connections.set(connName, conn);
  return conn;
};

export const socket = {
  connect,
  getConnection,
};
