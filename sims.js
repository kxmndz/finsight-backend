const fs = require("fs");
const crypto = require("crypto");

module.exports = {
  SimStorage: class {
    _data = {};

    constructor(fileName) {
      this._fileName = fileName ?? "sims.json";

      // if there's a file with _fileName, load it
      if (fs.existsSync(this._fileName)) this.loadFromDisk(this._fileName);
      // otherwise, make it (empty obj by default)
      else fs.writeFileSync(this._fileName, "{}");
    }

    fetchAll() {
      return this._data;
    }

    fetch(simId) {
      return this._data[simId];
    }

    saveToDisk(fileName) {
      const path = fileName ?? this._fileName;
      fs.writeFileSync(path, JSON.stringify(this._data));
    }

    loadFromDisk(fileName) {
      const path = fileName ?? this._fileName;
      this._data = JSON.parse(fs.readFileSync(path, "utf8"));
    }

    addNew(sim) {
      const uuid = crypto.randomUUID();
      this._data[uuid] = sim;
      this.saveToDisk(this._fileName);
    }

    getInfo(simId) {
      if (simId in this._data) return this._data[simId];
      else return `Sim ${simId} not found`;
    }

    modify(simId, sim) {
      this._data[simId] = sim;
    }

    removeSim(simId) {
      delete this._data[simId];
    }
  },
};
