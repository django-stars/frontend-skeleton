@Inject('ChatsService', '$stateParams')
export default class ChatDetailController {
  constructor() {
    console.log('ChatDetailController');

    this.chat = this.ChatsService.getItem(this.$stateParams.chatId);
  }
}
