import { EulerAngleCamera } from '../camera/EulerAngleCamera';
import { Utils } from '../core/Utils';
import { Matrix4f } from '../math/Matrix4f';
import { Vector3f } from '../math/Vector3f';
import { CameraKeyFrame } from './CameraKeyFrame';

export class BlenderCameraAnimator {

    public pos: Vector3f;
    private keyFrames: Array<CameraKeyFrame>;

    // TODO:
    // - should we really loop or better restart??
    // - dont use linear interpolation see bourke
    // - maybe quaternions and slerp for rotation
    // temp solution: no linear for

    public setKeyFrames(keyFrames: Array<CameraKeyFrame>): void {
        this.keyFrames = keyFrames;
    }

    public getViewMatrix(elapsedTime: number): Matrix4f {
        const keyFrameDuration = 2600;

        elapsedTime *= 1.0;

        const first = ((elapsedTime / keyFrameDuration) | 0) % this.keyFrames.length;
        const zero = ((first - 1) + this.keyFrames.length) % this.keyFrames.length;
        const second = (first + 1) % this.keyFrames.length;
        const third = (first + 2) % this.keyFrames.length;
        const fraction = ((elapsedTime / keyFrameDuration) % this.keyFrames.length) - first;

        const mu2 = (1 - Math.cos(fraction * Math.PI)) / 2;
        const position = new Vector3f(
            Utils.CubicInterpolate(this.keyFrames[zero].position.x, this.keyFrames[first].position.x, this.keyFrames[second].position.x, this.keyFrames[third].position.x, fraction),
            Utils.CubicInterpolate(this.keyFrames[zero].position.y, this.keyFrames[first].position.y, this.keyFrames[second].position.y, this.keyFrames[third].position.y, fraction),
            Utils.CubicInterpolate(this.keyFrames[zero].position.z, this.keyFrames[first].position.z, this.keyFrames[second].position.z, this.keyFrames[third].position.z, fraction)
        );
        //let look = this.keyFrames[first].rotation.mul(1 - mu2).add(this.keyFrames[second].rotation.mul(mu2));

        const look = new Vector3f(
            Utils.CubicInterpolate(this.keyFrames[zero].rotation.x, this.keyFrames[first].rotation.x, this.keyFrames[second].rotation.x, this.keyFrames[third].rotation.x, fraction),
            Utils.CubicInterpolate(this.keyFrames[zero].rotation.y, this.keyFrames[first].rotation.y, this.keyFrames[second].rotation.y, this.keyFrames[third].rotation.y, fraction),
            Utils.CubicInterpolate(this.keyFrames[zero].rotation.z, this.keyFrames[first].rotation.z, this.keyFrames[second].rotation.z, this.keyFrames[third].rotation.z, fraction)
        );
        this.pos = position;

        return new EulerAngleCamera(position, look.x, look.y, look.z).getViewMatrix();
    }

}

