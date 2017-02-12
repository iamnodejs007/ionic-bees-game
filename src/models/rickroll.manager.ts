export class RickRollManager {
	static readonly MIN_PAUSE_MILLIS = 500;
	static readonly MAX_PAUSE_MILLIS = 2000;
	static readonly DEFAULT_PATTERN: number[] = [3, 2, 3];
	pattern: number[];
	history: number[] = [];
	millisSinceTap: number = 0;

	constructor(pattern: number[] = RickRollManager.DEFAULT_PATTERN){
		this.pattern = pattern;
	}

	update(dtMilliseconds: number) {
		this.millisSinceTap += dtMilliseconds;
	}

	tap(times: number): boolean {
		let isRickRolled = false;
		

		let isIncrement = ((times === this.history[this.history.length - 1] + 1) &&
							this.millisSinceTap < RickRollManager.MIN_PAUSE_MILLIS);
		console.log("hm " + isIncrement + " " + times + "===" + (this.history[this.history.length - 1] + 1) +
			" " + this.millisSinceTap + " " + RickRollManager.MIN_PAUSE_MILLIS + "\n-- " + JSON.stringify(this.history));
		if ((RickRollManager.MIN_PAUSE_MILLIS < this.millisSinceTap &&
				this.millisSinceTap < RickRollManager.MAX_PAUSE_MILLIS) ||
				isIncrement) {
			if (isIncrement){
				this.history.splice(this.history.length - 1, 1);
			}
			this.history.push(times);
			console.log("making history: " + JSON.stringify(this.history));
			if (JSON.stringify(this.pattern) === JSON.stringify(this.history)) {
				isRickRolled = true;
			} else if (this.history.length > this.pattern.length) {
				this.history = [];
			}
		} else {
			this.history = [];
		}
		this.millisSinceTap = 0;

		return isRickRolled;
	}
}