export class DifficultyChooser {
	canvasContext: CanvasRenderingContext2D;
	onDifficultyChosen: Function;
	isDifficultyChosen: boolean = false;

	constructor(ctx: CanvasRenderingContext2D, onDifficultyChosen: Function){
		this.canvasContext = ctx;
		this.onDifficultyChosen = onDifficultyChosen;
	}

	onTap(event) {
		if (event.center.x > )
	}

	draw() {
		let centerX = this.canvasContext.canvas.width / 2;
		let centerY = this.canvasContext.canvas.height / 2;
		let size = this.canvasContext.canvas.width * 0.2;
		let miniOffsetY = this.canvasContext.canvas.height * 0.05;
		let offsetY = this.canvasContext.canvas.height * 0.15;
		let margin = 10;

		if (!(this.canvasContext.fillStyle === "white")) {
			this.canvasContext.fillStyle = "white";
		}
		if (!(this.canvasContext.font === "14px Courier")) {
			this.canvasContext.fillStyle = "14px Courier";
		}
		if (this.canvasContext.textAlign != "center") {
			this.canvasContext.textAlign = "center";
		}

		let yPosition = centerY - (size / 2) + offsetY;
		let miniYPosition = centerY - (size / 2) + miniOffsetY;
 		let this.easyX = centerX - (size * 1.5) - margin;
		let mediumX = centerX - (size * 0.5);
		let difficultX = centerX + (size * 0.5) + margin;
		this.canvasContext.fillText("Select difficulty: ", centerX, miniYPosition);

		this.canvasContext.fillRect(difficultX, yPosition, size, size);
		this.canvasContext.fillRect(this.easyX, yPosition, size, size);
		this.canvasContext.fillRect(mediumX, yPosition, size, size);

		this.canvasContext.fillStyle = "black";
		this.canvasContext.fillText("Nub", this.easyX + margin, yPosition + margin);
		this.canvasContext.fillText("Pro", mediumX + margin, yPosition + margin);
		this.canvasContext.fillText("God", difficultX + margin, yPosition + margin);
	}
}