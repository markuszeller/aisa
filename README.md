# AISA
AISA is a Software 3D Engine written in TypeScript 2.6.2
### Demo
https://jdiemke.github.io/AISA/
### How to get
Type the following command into your shell:
```bash
> git clone https://github.com/jdiemke/AISA.git
```
This will create a copy of the repository in your current working directory. Move into the project's folder and install the dependecies:
```bash
> cd AISA
> npm install
```
### How to build
Type the following command into your shell:
```bash
> npm run build
```
Move into the project's `dist/` folder and open `index.html`.
### How to serve
Type the following command into your shell:
```bash
> npm run serve
```
And open `http://localhost:8080/webpack-dev-server/` in your favourite web browser.
### Features
- Speed-Up Techniques
    - Backface Culling
    - View Frustum Culling
    - Bounding Volumes
        - Sphere
- Flat Shading
- Shadows
    - Projection Shadows
- Perspective Correct Texture Mapping
- Spherical Environment Mapping
- Near Plane & Viewport Clipping
- Lens Flare
- Billboarding
- Soft Particles
- Wavefront OBJ
- Camera
    - Controllable First Person Camera
    - Key Frame Animated Camera
### Backlog
- Configurable Clipping Regions (Sprites / Geometry)
- Procedural Textures
- Render To Texture
    - Compositing
    - Transitions (Alpha Fade)
    - Flashing
- Refactoring
    - Split Framebuffer.ts into multiple classes
    - Scenes / Effects / Core 3D Engine
- Bounding Volume Hierachies
- Bounding Volumes
    - Axis-Aligned Bounding Boxes (AABB)
    - Oriented Bounding Boxes (OBB)
- Quaternions
    - Spherical Linear Interpolation (SLERP)
- Perspective Projection Matrix
- Light Sources
    - Directional
    - Point Light
    - Spot Light
    - Ambient / Diffuse / Specular Color Components
- Transparency
- Water Relfection / Refraction
- Fog
- Particles Collision
- Planar Reflections
- Skybox
- Gouraud Shading
- Multitexturing
- MDL / MD2 Modells
- Material
- Shadow Mapping
- Pixel Shaders (Bump Mapping, Parallax Mapping)
### References
- https://hacks.mozilla.org/2011/12/faster-canvas-pixel-manipulation-with-typed-arrays/
- http://www.ecere.com/3dbhole/
- https://www.davrous.com/2013/06/21/tutorial-part-4-learning-how-to-write-a-3d-software-engine-in-c-ts-or-js-rasterization-z-buffering/
- http://joshbeam.com/articles/triangle_rasterization/
- http://forum.devmaster.net/t/advanced-rasterization/6145
