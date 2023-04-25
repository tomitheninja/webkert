export class FSUser {
  email: string | null = null;
  photoURL: string | null = null;
  lastLogin: Date | { seconds: number } = new Date();
  createdAt: Date | { seconds: number } = new Date();
  name!: string;
  id!: string;

  constructor(json: Partial<FSUser>) {
    Object.assign(this, json);
    if (!this.name) {
      throw new Error(`User#${this.id} must have a name`);
    }
    if (!this.id) {
      throw new Error('User#null must have an id');
    }
  }
}
