# AISA
AISA is a Software 3D Engine written in TypeScript 2.5.2
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
- Flat Shading
- Perspective Correct Texture Mapping
- Spherical Environment Mapping
- Near Plane & Viewport Clipping
- Lens Flare
### Backlog
- Skybox
- Multitexturing
- MDL / MD2 Modells
- View Frustum Culling & Space Partitioning
- 3D Portal Engine
- Camera
- Vertex shading (Flat, Gouraud, Phong)
- Light Sources
- Material
- Shadows (Projection Shadows, Shadow Mapping)
- Pixel Shaders (Bump Mapping, Parallax Mapping)
