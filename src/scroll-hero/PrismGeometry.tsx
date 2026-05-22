import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Triangular prism geometry — the Δ from the dscope brand mark, in 3D.
 * Built by extruding an equilateral triangle along Z.
 */
export function useTriangularPrismGeometry(size = 1.6, depth = 0.55) {
  return useMemo(() => {
    const h = (Math.sqrt(3) / 2) * size;
    const shape = new THREE.Shape();
    shape.moveTo(0, h * (2 / 3));
    shape.lineTo(-size / 2, -h * (1 / 3));
    shape.lineTo(size / 2, -h * (1 / 3));
    shape.closePath();

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 4,
      curveSegments: 1,
    });
    geo.center();
    geo.computeVertexNormals();
    return geo;
  }, [size, depth]);
}
