import { Canvas } from '../../Canvas';
import { ThirdPersonCameraScene } from './ThirdPersonCameraScene';

class Application {

    public main(): void {
        const canvas: Canvas = new Canvas(Canvas.WIDTH, Canvas.HEIGHT, new ThirdPersonCameraScene());
        canvas.init();
    }

}

new Application().main();
