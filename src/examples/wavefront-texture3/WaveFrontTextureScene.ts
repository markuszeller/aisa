import { CullFace } from '../../CullFace';
import { Framebuffer } from '../../Framebuffer';
import { Matrix4f } from '../../math';
import { WavefrontLoader } from '../../model/wavefront-obj/WavefrontLoader';
import { TexturedMesh } from '../../rendering-pipelines/TexturedMesh';
import { AbstractScene } from '../../scenes/AbstractScene';
import { Texture, TextureUtils } from '../../texture';
import { TexturingRenderingPipeline } from '../../rendering-pipelines/TexturingRenderingPipeline';

export class WaveFrontTextureScene extends AbstractScene {

    private texturedRenderingPipeline: TexturingRenderingPipeline;

    private spikeBallMesh: Array<TexturedMesh>;
    private spikeBallTexture: Texture;
    private backgroundTexture: Texture;

    public init(framebuffer: Framebuffer): Promise<any> {
        this.texturedRenderingPipeline = new TexturingRenderingPipeline(framebuffer);
        this.texturedRenderingPipeline.setCullFace(CullFace.BACK);

        return Promise.all([
            TextureUtils.load(require('../../assets/UVMap.png'), false).then(
                (texture: Texture) => this.spikeBallTexture = texture
            ),
            WavefrontLoader.loadWithTexture(require('../../assets/Geometry Stuff.obj')).then(
                (x: Array<TexturedMesh>) => this.spikeBallMesh = x
            ),
            TextureUtils.load(require('../../assets/flood2.png'), false).then(
                texture => this.backgroundTexture = texture
            ),
        ]);
    }

    public render(framebuffer: Framebuffer, time: number): void {
        const elapsedTime: number = time*0.2;
     
        framebuffer.fastFramebufferCopy(framebuffer.framebuffer, this.backgroundTexture.texture);
        framebuffer.clearDepthBuffer();

        framebuffer.setTexture(this.spikeBallTexture);

        this.texturedRenderingPipeline.setFramebuffer(framebuffer);
        this.texturedRenderingPipeline.setModelViewMatrix(this.getModelViewMatrix(elapsedTime));
        this.texturedRenderingPipeline.drawMeshArray(framebuffer, this.spikeBallMesh);
    }

    private getModelViewMatrix(elapsedTime: number): Matrix4f {
        const camera: Matrix4f = Matrix4f.constructTranslationMatrix(Math.sin(elapsedTime*0.001)*30, Math.cos(elapsedTime*0.0018)*18, -70)
        .multiplyMatrix(
            Matrix4f.constructYRotationMatrix(-elapsedTime * 0.002)
        ).multiplyMatrix(
            Matrix4f.constructXRotationMatrix(-elapsedTime * 0.0018)
        ).multiplyMatrix(
            Matrix4f.constructZRotationMatrix(-elapsedTime * 0.0023)
        ).multiplyMatrix(
            Matrix4f.constructTranslationMatrix(0, 20, 0)
        );

        let scale = (Math.sin(elapsedTime*0.003)*0.5+0.5)*0.24+1;
        return camera.multiplyMatrix(Matrix4f.constructScaleMatrix(8*scale, 8*scale, 8*scale));
    }

}
