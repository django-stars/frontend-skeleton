@Inject('ChatsService')
export default class ChatsController {
  constructor() {
    console.log('ChatsController');

    this.chats = this.ChatsService.getList();
  }

  removeItem(chat) {
    this.ChatsService.removeItem(chat);
  };
}
