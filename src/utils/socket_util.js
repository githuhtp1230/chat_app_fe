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
      () => new WebSocket("ws://localhost:8080/api/ws")
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

  subscribe(conversationId, onMessageReceived) {
    if (!this.stompClient || !this.stompClient.connected) {
      console.error("Web socket is not connected");
      return;
    }
    if (this.subscriptions.has(conversationId)) {
      console.log(`Already subscribed to conversation ${conversationId}`);
      return;
    }
    const subscription = this.stompClient.subscribe(
      `/topic/conversations/${conversationId}`,
      (message) => {
        onMessageReceived(JSON.parse(message.body));
      }
    );
    this.subscriptions.set(conversationId, subscription);
    console.log(`subscribe ${conversationId} successfully`);
  }

  sendMessage(conversationId, senderId, content) {
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
      })
    );
  }

  unsubscribe(conversationId) {
    if (!this.stompClient || !this.stompClient.connected) {
      console.error("Web socket is not connected");
      return;
    }
    this.subscriptions.get(conversationId).unsubscribe();
    this.subscriptions.delete(conversationId);
  }
}

export default new SocketUtil();
