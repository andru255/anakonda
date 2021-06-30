export default class ScoreService {
  private storage;
  private keyName;
  constructor(keyName) {
    this.keyName = keyName;
  }

  getHighScores() {
    return this.getCurrentStorage();
  }

  saveScore(value) {
    const currentData = this.getCurrentStorage();
    currentData.push(value);
    const sorted = currentData.sort((a, b) => (a > b ? -1 : 1));
    const data: any[] = [];
    for (let index = 0; index < 3; index++) {
      data.push(sorted[index]);
    }
    localStorage.setItem(this.keyName, JSON.stringify(currentData));
  }

  private getCurrentStorage() {
    let storage =
      localStorage.getItem(this.keyName) == null
        ? "[0,0,0]"
        : localStorage.getItem(this.keyName);
    return JSON.parse(String(storage));
  }
}
