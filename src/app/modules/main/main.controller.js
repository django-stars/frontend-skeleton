@Inject()
export default class MainController {
  constructor() {
    console.log('MainController');

    this.items = [
      {
        name: 'Status',
        state: 'dash'
      },
      {
        name: 'Chats',
        state: 'chats'
      },
      {
        name: 'Account',
        state: 'account'
      }
    ]
  }
}
