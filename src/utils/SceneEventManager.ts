export default class SceneEventsManager {
    private static instance: SceneEventsManager;
    
    readonly events: Phaser.Events.EventEmitter;

    private constructor() { 
        this.events = new Phaser.Events.EventEmitter();
    }

    public static getInstance(): SceneEventsManager {
        if (!SceneEventsManager.instance) {
            SceneEventsManager.instance = new SceneEventsManager();
        }

        return SceneEventsManager.instance;
    }
}
