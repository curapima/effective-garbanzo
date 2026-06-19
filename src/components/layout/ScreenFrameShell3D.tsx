"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type ScreenFrameShell3DProps = {
  isScrolling: boolean;
  isClicking: boolean;
  isRouting: boolean;
  isArticle: boolean;
};

function roundedRectShape(width: number, height: number, radius: number) {
  const x = -width / 2;
  const y = -height / 2;
  const shape = new THREE.Shape();

  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);

  return shape;
}

function roundedPanelGeometry(width: number, height: number, radius: number, depth: number) {
  return new THREE.ExtrudeGeometry(roundedRectShape(width, height, radius), {
    depth,
    bevelEnabled: true,
    bevelSegments: 8,
    bevelSize: 0.055,
    bevelThickness: 0.055,
  });
}

export function ScreenFrameShell3D({
  isScrolling,
  isClicking,
  isRouting,
  isArticle,
}: ScreenFrameShell3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({ isScrolling, isClicking, isRouting });

  useEffect(() => {
    stateRef.current = { isScrolling, isClicking, isRouting };
  }, [isScrolling, isClicking, isRouting]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0.2, 8.5);

    const group = new THREE.Group();
    group.rotation.x = -0.055;
    group.rotation.y = 0.075;
    group.position.y = isArticle ? -0.02 : 0;
    scene.add(group);

    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0xf4f4f4,
      metalness: 0.04,
      roughness: 0.54,
    });
    const bevelMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f0f0f,
      metalness: 0.08,
      roughness: 0.42,
    });
    const trimMaterial = new THREE.MeshStandardMaterial({
      color: 0xdadada,
      metalness: 0.02,
      roughness: 0.62,
    });
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.18,
      metalness: 0,
      roughness: 0.04,
      transmission: 0.22,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
    });
    const body = new THREE.Mesh(roundedPanelGeometry(7.65, 5.25, 0.34, 0.38), bodyMaterial);
    body.position.z = -0.44;
    group.add(body);

    const backPlate = new THREE.Mesh(roundedPanelGeometry(7.95, 5.56, 0.42, 0.12), trimMaterial);
    backPlate.position.set(0.11, -0.12, -0.68);
    group.add(backPlate);

    const screenFrame = new THREE.Mesh(roundedPanelGeometry(6.95, 4.18, 0.2, 0.22), bevelMaterial);
    screenFrame.position.set(0, 0.27, -0.18);
    group.add(screenFrame);

    const screenInset = new THREE.Mesh(roundedPanelGeometry(6.48, 3.72, 0.16, 0.08), trimMaterial);
    screenInset.position.set(0, 0.27, 0.0);
    group.add(screenInset);

    const glass = new THREE.Mesh(roundedPanelGeometry(6.26, 3.5, 0.14, 0.018), glassMaterial);
    glass.position.set(0, 0.27, 0.12);
    group.add(glass);

    const topVentMaterial = new THREE.MeshStandardMaterial({
      color: 0x1c1c1c,
      metalness: 0.05,
      roughness: 0.7,
    });

    for (let i = 0; i < 10; i += 1) {
      const vent = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.035, 0.04), topVentMaterial);
      vent.position.set(-2.1 + i * 0.47, 2.44, 0.04);
      group.add(vent);
    }

    const lowerLip = new THREE.Mesh(new THREE.BoxGeometry(5.5, 0.12, 0.18), trimMaterial);
    lowerLip.position.set(-0.35, -2.22, 0.0);
    group.add(lowerLip);

    const knobMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.08,
      roughness: 0.36,
    });

    const knobs: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i += 1) {
      const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.16, 32), knobMaterial);
      knob.rotation.x = Math.PI / 2;
      knob.position.set(2.55 + i * 0.44, -2.18, 0.24);
      knobs.push(knob);
      group.add(knob);
    }

    const ledMaterials = [
      new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x000000, roughness: 0.22 }),
      new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x000000, roughness: 0.22 }),
      new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x000000, roughness: 0.22 }),
    ];
    const leds = ledMaterials.map((material, index) => {
      const led = new THREE.Mesh(new THREE.SphereGeometry(0.09, 24, 16), material);
      led.position.set(1.72 + index * 0.27, -2.18, 0.28);
      group.add(led);
      return led;
    });

    const baseStem = new THREE.Mesh(roundedPanelGeometry(1.15, 0.72, 0.16, 0.2), bodyMaterial);
    baseStem.position.set(0, -2.86, -0.36);
    group.add(baseStem);

    const base = new THREE.Mesh(roundedPanelGeometry(3.15, 0.52, 0.2, 0.22), trimMaterial);
    base.position.set(0, -3.24, -0.28);
    group.add(base);

    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(6.2, 0.72),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.08 }),
    );
    shadow.position.set(0.22, -3.46, -0.7);
    group.add(shadow);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(-2.8, 4, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.75);
    rimLight.position.set(3, -1.5, 3);
    scene.add(rimLight);

    scene.add(new THREE.AmbientLight(0xffffff, 1.9));

    const startedAt = performance.now();
    let frameId = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      const scale = Math.min(width / 1180, height / 760);
      group.scale.setScalar(Math.max(0.78, Math.min(1.15, scale * 1.04)));
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const render = () => {
      const elapsed = (performance.now() - startedAt) / 1000;
      const { isScrolling: scrolling, isClicking: clicking, isRouting: routing } = stateRef.current;

      group.rotation.y = 0.075 + Math.sin(elapsed * 0.45) * 0.012;
      group.rotation.x = -0.055 + Math.cos(elapsed * 0.38) * 0.006;
      glass.rotation.z = Math.sin(elapsed * 0.35) * 0.004;

      knobs.forEach((knob, index) => {
        knob.rotation.z = elapsed * (0.08 + index * 0.025);
      });

      const ledStates = [scrolling, clicking, routing];
      ledMaterials.forEach((material, index) => {
        const active = ledStates[index];
        const flicker = index === 1 ? Math.sin(elapsed * 42) > -0.15 : Math.sin(elapsed * 5 + index) > -0.35;
        const intensity = active && flicker ? 0.9 : 0.08;
        material.color.setHex(active ? 0x101010 : 0xffffff);
        material.emissive.setHex(active ? 0x111111 : 0x000000);
        material.emissiveIntensity = intensity;
        leds[index].scale.setScalar(active ? 1.18 : 1);
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
    };
  }, [isArticle]);

  return <canvas ref={canvasRef} className="screen-frame-shell-3d" aria-hidden="true" />;
}
