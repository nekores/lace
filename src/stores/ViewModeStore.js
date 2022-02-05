import { observable, action } from 'mobx';

class ViewModeStore {
  @observable viewMode = false;

  @observable showSidebar = false;

  @action.bound onConnect() {
    this.connected = true;
  }

  @action.bound onDisConnect() {
    this.connected = false;
  }

  @action.bound toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }
}

export default () => new ViewModeStore();
