class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numVamp = 0;
    let currVamp = this;

    while(currVamp.creator){
      numVamp++;
      currVamp = currVamp.creator;
    }
    return numVamp;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal);
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {

    if (this.name === name){
      return this;
    }
    else if (this.offspring){

      let match = null;
      for (let i of this.offspring){
        if (match != null){break;}
        match = i.vampireWithName(name);
      }
      return match;

    }

    return null;

  }

  // Returns the total number of vampires that exist
  get totalDescendents() {

    if (!this.offspring){
      return 0;
    }
    else {
      let total = 0;
      for (let i of this.offspring){
        total += 1 + i.totalDescendents;
      }
      return total;

    }


  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let vamps = [];

    if (this.yearConverted > 1980){
      vamps.push(this);
    }

    for (let i of this.offspring){
      let melVamps = i.allMillennialVampires;
      vamps = vamps.concat(melVamps);
    }
    return vamps;

  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let anscestors = [];

    //travel up tree and push ancestors until it reach the root
    let current = this;
    while (current !== null){
      anscestors.push(current);
      current = current.creator;
    }

    //compare current vampire to the ancestors array. Travel up to creator if no match found.
    current = vampire;
    while (current !== null){
      for (let i of anscestors){
        if (i.name === current.name){
          return current;
        }
      }

      current = current.creator;
    }


  }
  //testing
}

module.exports = Vampire;

