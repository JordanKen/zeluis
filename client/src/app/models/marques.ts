export class Marque{
  id: number;
  name: string;
  avatar: File;

  clear(){
    this.id = undefined;
    this.name = undefined;
    this.avatar = undefined;
  }
}
