import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

class SocketUtil {
  constructor() {
    this.stompClient = null;
    this.subscriptions = new Map();
  }

  connect(onSuccess) {
    if (this.stompClient && this.stompClient.connected) {
      onSuccess();
      return;
    }

    this.stompClient = Stomp.over(
      () => new WebSocket(`wss://${import.meta.env.VITE_IP}/api/ws`)
    );

    this.stompClient.connect(
      {},
      () => {
        onSuccess();
      },
      (error) => {
        console.error("WebSocket error:", error);
      }
    );
  }

  subscribe(prefix, id, callback) {
    if (!this.stompClient || !this.stompClient.connected) {
      console.error("Web socket is not connected");
      return;
    }
    if (this.subscriptions.has(id)) {
      console.log(`Already subscribed to ${id}`);
      return;
    }
    const subscription = this.stompClient.subscribe(
      id != null ? `/topic/${prefix}/${id}` : `/topic/${prefix}`,
      (res) => {
        callback(JSON.parse(res.body));
      }
    );
    this.subscriptions.set(`${prefix}:${id}`, subscription);
  }

  sendMessage(conversationId, senderId, content, isSending = false) {
    if (!this.stompClient || !this.stompClient.connected) {
      console.error("Web socket is not connected");
      return;
    }
    this.stompClient.send(
      "/app/message",
      {},
      JSON.stringify({
        conversationId,
        senderId,
        content,
        isSending,
      })
    );
  }

  sendingMessage(conversationId, senderId) {
    if (!this.stompClient || !this.stompClient.connected) {
      console.error("Web socket is not connected");
      return;
    }
    this.stompClient.send(
      "/app/sending-message",
      {},
      JSON.stringify({
        conversationId,
        senderId,
      })
    );
  }

  sendStatus(isOnline, userId) {
    if (!this.stompClient || !this.stompClient.connected) {
      console.error("Web socket is not connected");
      return;
    }
    this.stompClient.send(
      "/app/status",
      {},
      JSON.stringify({
        isOnline,
        userId,
      })
    );
  }

  unsubscribe(prefix, id) {
    if (!this.stompClient || !this.stompClient.connected) {
      console.error("Web socket is not connected");
      return;
    }
    this.subscriptions.get(`${prefix}:${id}`).unsubscribe();
    this.subscriptions.delete(id);
  }
}

export default new SocketUtil();
