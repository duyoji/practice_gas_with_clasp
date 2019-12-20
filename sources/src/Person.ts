class Animal {
  constructor(protected name: string){
    this.name = name;
  }
}

class Person extends Animal {
  constructor(name: string) {
    super(name);
  }

  public greet() {
    Logger.log(`こんにちは ${this.name}です！`);
  }
}

export default Person;