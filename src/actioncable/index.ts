// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `rails generate channel` command.

import { createConsumer } from "@rails/actioncable"

const webSocketPath = process.env.REACT_APP_WEBSOCKET_PATH || 'ws://localhost:3000/cable';
export const consumer = createConsumer(webSocketPath);

export interface CreateMixin {
  connected?(): void;
  disconnected?(): void;
  received?(obj: any): void;
  [key: string]: any;
}

export interface CreateProps {
  [pname: string]: any
}

export const createSubscription = (props: CreateProps, callbacks: CreateMixin) => {
  return consumer.subscriptions.create(props, callbacks)
}