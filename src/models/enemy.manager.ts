import { BallVsWildPage } from  "../pages/ball-vs-wild/ball-vs-wild";
import { EnemyProducer, ItemProducer } from "./enemy.producer";
import { Enemy, ImageUnit } from "./unit";

export class EnemyManager {
	static readonly EASY_INDEX: number = 0;
	static readonly MODERATE_INDEX: number = 1;
	static readonly DIFFICULT_INDEX: number = 2;

	page: BallVsWildPage;
	enemyGenerators: EnemyProducer[];
	itemGenerators: ItemProducer[];
	totalGameTimeSeconds: number = 0;
	itemsHit: number = 0;
	enemiesHit: number = 0;
	timesHit: number = 0;
	timesKilled: number = 0;
	shotsFired: number = 0;

	constructor(page: BallVsWildPage, easySpawnRate: number, mediumSpawnRate: number, hardSpawnRate: number, healthSpawnRate: number) {
		this.page = page;
		let easyBee = new EnemyProducer(10, Math.max(20, page.canvasContext.canvas.width * 0.15), 100, easySpawnRate, page.hero,
                        page.spritesImg, BallVsWildPage.MEDIUM_BEE["leftDimensions"], BallVsWildPage.MEDIUM_BEE["rightDimensions"], page.canvasContext, BallVsWildPage.MEDIUM_BEE["name"]);
        let moderateBee = new EnemyProducer(25, Math.max(10, page.canvasContext.canvas.width * 0.09), 175, mediumSpawnRate, page.hero,
                        page.spritesImg, BallVsWildPage.SMALL_BEE["leftDimensions"], BallVsWildPage.SMALL_BEE["rightDimensions"], page.canvasContext, BallVsWildPage.SMALL_BEE["name"]);
        let difficultBee = new EnemyProducer(30, Math.max(40, page.canvasContext.canvas.width * 0.22), 70, hardSpawnRate, page.hero,
                        page.spritesImg, BallVsWildPage.LARGE_BEE["leftDimensions"], BallVsWildPage.LARGE_BEE["rightDimensions"], page.canvasContext, BallVsWildPage.LARGE_BEE["name"]);
        let healthGenerator = new ItemProducer(page.spritesImg, BallVsWildPage.HEALTH_ITEM["srcDimensions"], 30, 250, healthSpawnRate, page.canvasContext);
		this.enemyGenerators = [easyBee, moderateBee, difficultBee];
	    this.itemGenerators = [healthGenerator];
	}

	update(dtMilliseconds: number){
		// let accuracy = (this.shotsFired > 0) ? (this.itemsHit + this.enemiesHit) / this.shotsFired : 0; // 1 is best, 0 worst
		// let safety = (this.timesKilled > 0) ? this.timesHit / (this.timesKilled * 3) : 1; // > 1 is better
		// let shotsPerMinute = (this.totalGameTimeSeconds > 0) ? this.shotsFired / (this.totalGameTimeSeconds / 60) : 0;

		// let safetyDrop = ((safety / 500) * 2500);
		// let accuracyDrop = (accuracy / 0.8) * 1500;
		// let rapidFireDrop = ((shotsPerMinute / 60) / 4) * 2500;
		// let timeDrop = (this.totalGameTimeSeconds / (10 * 60)) * 3500;

		// let minSpawnRate = Math.max(0, 1500 - (accuracy * (shotsPerMinute / 120) * 500));
		// let maxSpawnRate = Math.max(1000 / BallVsWildPage.FPS, 10000 - safetyDrop - accuracyDrop - rapidFireDrop - timeDrop);
		// let scale = Math.random() + 1;

		for (var i = 0; i < this.enemyGenerators.length; i++){
	    	let enemy = <Enemy>this.enemyGenerators[i].tick(dtMilliseconds);
	  		if (enemy != null){
	    		this.page.enemies.push(enemy);
	    		// this.enemyGenerators[i].minSpawnRate = minSpawnRate * scale;
	    		// this.enemyGenerators[i].spawnRateMilliseconds = maxSpawnRate * scale;
	    		// console.log('enemy spawn rate: [' + minSpawnRate + ', ' + maxSpawnRate + ']');
	  		}
	    }
	    for (var i = 0; i < this.itemGenerators.length; i++){
	  		let item = <ImageUnit>this.itemGenerators[i].tick(dtMilliseconds);
	      	if (item != null){
	        	this.page.items.push(item);
	        	// this.itemGenerators[i].minSpawnRate = minSpawnRate * scale;
	        	// this.itemGenerators[i].spawnRateMilliseconds = maxSpawnRate * scale;
	        	// console.log('item spawn rate: [' + minSpawnRate + ', ' + maxSpawnRate + ']');
	      	}
	    }
	    this.totalGameTimeSeconds += dtMilliseconds / 1000;
	}

	onHitByEnemy() {
		this.timesHit += 1;
	}
	onEnemyStrike() {
		this.enemiesHit += 1;
	}
	onItemStrike() {
		this.itemsHit += 1;
	}
	onShoot() {
		this.shotsFired += 1;
	}
	onDeath() {
		this.timesKilled += 1;
	}
}