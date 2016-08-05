@Inject()
export default class AccountController {
  constructor() {
    console.log('AccountController');

    this.settings = {
      enableFriends: true
    };
  }
}
