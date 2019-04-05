import { Framebuffer } from '../../Framebuffer';
import { Matrix4f } from '../../math/Matrix4f';
import { Vector3f } from '../../math/Vector3f';
import { AbstractScene } from '../../scenes/AbstractScene';
import { Texture } from '../../texture/Texture';
import { TextureUtils } from '../../texture/TextureUtils';

export class ParticleTorusScene extends AbstractScene {

    private blurred: Texture;
    private particleTexture2: Texture;
    private noise: Texture;
    private start: number;

    private accumulationBuffer: Uint32Array = new Uint32Array(320 * 200);

    public init(framebuffer: Framebuffer): Promise<any> {
        this.start = Date.now();
        return Promise.all([
            TextureUtils.load(require('../../assets/blurredBackground.png'), false).then(
                (texture: Texture) => this.blurred = texture
            ),
            TextureUtils.load(require('../../assets/spriteBlur.png'), true).then(
                (texture: Texture) => this.particleTexture2 = texture
            ),
            TextureUtils.generateProceduralNoise().then(
                (texture: Texture) => this.noise = texture
            )
        ]);
    }

    public render(framebuffer: Framebuffer): void {
        const time: number = Date.now();

        framebuffer.fastFramebufferCopy(framebuffer.framebuffer, this.blurred.texture);
        this.drawParticleTorus(framebuffer, time, this.particleTexture2, true);


        framebuffer.noise(time, this.noise);
    }

    public computeDepthBlur(
        nearPlane: number,
        focalPlane: number,
        farPlane: number, depth: number): number {

        let f: number;

        if (depth > focalPlane) {
            f = (depth - focalPlane) / (nearPlane - focalPlane);
        } else {
            f = (depth - focalPlane) / (farPlane - focalPlane);
        }
        return Math.min(f, 1.0);
    }

    public drawParticleTorus(framebuffer: Framebuffer, elapsedTime: number, texture: Texture, noClear: boolean = false) {
        if (!noClear) { framebuffer.clearColorBuffer(72 | 56 << 8 | 48 << 16 | 255 << 24); }
        framebuffer.clearDepthBuffer();

        const points: Array<Vector3f> = new Array<Vector3f>();
        const num = 100;
        const radi= 5.3;
        for (let i = 0; i < num; i++) {
            const x = radi * Math.cos((( i) * Math.PI*2 / (num)) * 7);
            const y = (i - num *0.5 )* 0.3;
            const z = radi * Math.sin((( i) * Math.PI*2 / (num)) * 7);

            points.push(new Vector3f(x, y, z));
        }

        const modelViewMartrix = Matrix4f.constructTranslationMatrix(0, 0, -10 - 2*Math.sin(elapsedTime * 0.0002))
            .multiplyMatrix(Matrix4f.constructYRotationMatrix(elapsedTime * 0.0003)
                .multiplyMatrix(Matrix4f.constructXRotationMatrix(elapsedTime * 0.0003)));

        const points2: Array<Vector3f> = new Array<Vector3f>(points.length);
        points.forEach((element) => {

            const transformed = framebuffer.project(modelViewMartrix.multiply(element));

            points2.push(transformed);
        });

        points2.sort(function (a, b) {
            return a.z - b.z;
        });

        points2.forEach((element) => {
            const size = -(2.8 * 292 / (element.z));
            const spriteNum: number = Math.round(this.computeDepthBlur(0, -15, -70, element.z) * 13);

            framebuffer.drawParticle2(
                Math.round(element.x) - Math.round(size / 2),
                Math.round(element.y) - Math.round(size / 2),
                Math.round(size), Math.round(size), texture, 1 / element.z, 1.0, spriteNum, 128);
        });
    }

}
