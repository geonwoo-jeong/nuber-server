import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetChatResponse } from "../../../types/graph";
import User from "../../../entities/User";
import Chat from "../../../entities/Chat";

const resolvers: Resolvers = {
 Query: {
   GetChat: privateResolver(
     async(
       _,
       args,
       { req }
     ): Promise<GetChatResponse> => {
      const user : User = req.user;
      try {
        const chat = await Chat.findOne({
          id: args.chatId
        })
        if (chat) {
          if (chat.passengerId === user.id || chat.driverId === user.id) {
            return {
              ok: true,
              error: null,
              chat
            }
          } else {
            return {
              ok: false,
              error: "Not Authorized",
              chat: null
            }
          }
        } else {
          return {
            ok: false,
            error: "Not found",
            chat: null
          }
        }
      } catch(error) {
        return {
          ok: false,
          error: error.message,
          chat: null
       }
      }
     }
   )
 }
}

export default resolvers;