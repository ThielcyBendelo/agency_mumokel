const messagingService = {
  sendMessage: async (messageData) => {
    console.log("Envoi du message...", messageData);
    return { success: true };
  },
  getMessages: async () => []
};
export default messagingService;
