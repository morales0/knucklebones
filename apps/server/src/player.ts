export class Player {
  username: string;
  room: string | null = null;

  constructor(username: string) {
    this.username = username;
  }
}
