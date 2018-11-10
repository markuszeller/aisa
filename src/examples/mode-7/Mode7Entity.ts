import { Vector2f } from '../../math/index';
import { Texture } from '../../texture/index';

export abstract class Mode7Entity {

    public position: Vector2f;
    public height: number;

    public constructor(position: Vector2f, height: number = 0) {
        this.position = position;
        this.height = height;
    }

    public abstract getTexture(): Texture;

}
