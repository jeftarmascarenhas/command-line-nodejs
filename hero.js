class Hero {
  constructor({ id, name, power }) {
    this.id = id ? parseInt(id) : id;
    this.name = name;
    this.power = power;
  }
}

export default Hero;
