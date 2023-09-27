import { AnyAction } from '@reduxjs/toolkit';
import { Socket, io } from 'socket.io-client';
import { AppDispatch, AppThunkAction } from '../redux';

class SocketClient {
  private socket?: Socket;

  connect(
    namespace: string,
    params: Record<string, string> = {}
  ): Promise<void> {
    return new Promise((resolve) => {
      const urlParams = new URLSearchParams(params).toString();
      this.socket = io(
        `${process.env.REACT_APP_API_URL}${namespace}?${urlParams}`,
        { extraHeaders: { 'X-Api-Key': process.env.REACT_APP_API_KEY } }
      );
      this.socket.on('connect', () => {
        resolve();
        console.log('Connected to Socket.io server');
      });
    });
  }

  attachListeners<T>({
    event = 'message',
    dispatch,
    action,
  }: {
    event?: string;
    dispatch: AppDispatch;
    action: (data: T) => AnyAction | AppThunkAction;
  }): void {
    if (!this.socket) {
      throw new Error('Socket.io connection not established.');
    }
    this.socket.on(event, (data: T) => {
      console.log('Data received => ', { event, data });
      dispatch(action(data));
    });
  }

  emitEvent<T>(eventName: string, data: T): void {
    if (!this.socket) {
      throw new Error('Socket.io connection not established.');
    }
    console.log({ eventName, data });

    this.socket.emit(eventName, data);
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

const socket = new SocketClient();

export default socket;
