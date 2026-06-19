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

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function ScreenFrameShell3D({
  isScrolling,
  isClicking,
  isRouting,
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
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 2000);
    camera.position.set(0, 0, 1000);

    const group = new THREE.Group();
    scene.add(group);

    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0xd8d0bb,
      metalness: 0.04,
      roughness: 0.68,
    });
    const rearBodyMaterial = new THREE.MeshStandardMaterial({
      color: 0xb8ae98,
      metalness: 0.02,
      roughness: 0.78,
    });
    const bevelMaterial = new THREE.MeshStandardMaterial({
      color: 0x151712,
      metalness: 0.08,
      roughness: 0.48,
    });
    const trimMaterial = new THREE.MeshStandardMaterial({
      color: 0xc9c0aa,
      metalness: 0.02,
      roughness: 0.7,
    });
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd7fff1,
      transparent: true,
      opacity: 0.2,
      metalness: 0,
      roughness: 0.04,
      transmission: 0.18,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
    });
    const topVentMaterial = new THREE.MeshStandardMaterial({
      color: 0x353026,
      metalness: 0.05,
      roughness: 0.7,
    });

    const knobMaterial = new THREE.MeshStandardMaterial({
      color: 0xeee7d2,
      metalness: 0.08,
      roughness: 0.52,
    });

    const knobs: THREE.Mesh[] = [];

    const ledMaterials = [
      new THREE.MeshStandardMaterial({ color: 0x263018, emissive: 0x000000, roughness: 0.22 }),
      new THREE.MeshStandardMaterial({ color: 0x263018, emissive: 0x000000, roughness: 0.22 }),
      new THREE.MeshStandardMaterial({ color: 0x2d2515, emissive: 0x000000, roughness: 0.22 }),
    ];
    let leds: THREE.Mesh[] = [];
    let glass: THREE.Mesh | undefined;

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(-2.8, 4, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.75);
    rimLight.position.set(3, -1.5, 3);
    scene.add(rimLight);

    scene.add(new THREE.AmbientLight(0xffffff, 1.9));

    const startedAt = performance.now();
    let frameId = 0;

    const disposeObject = (object: THREE.Object3D, disposeMaterials = false) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        if (disposeMaterials) {
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      }
    };

    const rebuildModel = (width: number, height: number) => {
      group.traverse((object) => disposeObject(object));
      group.clear();
      knobs.length = 0;
      leds = [];
      glass = undefined;

      const edgeGap = clamp(Math.min(width, height) * 0.026, 14, 34);
      const bodyWidth = Math.max(360, width - edgeGap * 2);
      const bodyHeight = Math.max(300, height - edgeGap * 2);
      const bodyYOffset = -clamp(height * 0.012, 4, 18);
      const cornerRadius = clamp(Math.min(bodyWidth, bodyHeight) * 0.055, 24, 56);
      const controlWidth = clamp(bodyWidth * 0.13, 84, 188);
      const sidePadding = clamp(bodyWidth * 0.046, 24, 78);
      const topPadding = clamp(bodyHeight * 0.085, 28, 82);
      const bottomPadding = clamp(bodyHeight * 0.16, 58, 142);
      const screenWidth = Math.max(260, bodyWidth - controlWidth - sidePadding * 2.35);
      const screenHeight = Math.max(210, bodyHeight - topPadding - bottomPadding);
      const screenCenterX = -controlWidth * 0.52 - sidePadding * 0.08;
      const screenCenterY = bodyYOffset + (bottomPadding - topPadding) / 2;
      const controlCenterX = bodyWidth / 2 - sidePadding - controlWidth / 2;

      const rearShell = new THREE.Mesh(
        roundedPanelGeometry(bodyWidth * 0.88, bodyHeight * 0.88, cornerRadius * 1.08, clamp(bodyWidth * 0.055, 54, 112)),
        rearBodyMaterial,
      );
      rearShell.position.set(bodyWidth * 0.045, bodyYOffset + bodyHeight * 0.015, -118);
      group.add(rearShell);

      const rearHighlight = new THREE.Mesh(
        roundedPanelGeometry(bodyWidth * 0.78, bodyHeight * 0.76, cornerRadius * 0.92, 18),
        trimMaterial,
      );
      rearHighlight.position.set(bodyWidth * 0.08, bodyYOffset + bodyHeight * 0.02, -78);
      group.add(rearHighlight);

      const body = new THREE.Mesh(
        roundedPanelGeometry(bodyWidth, bodyHeight, cornerRadius, clamp(bodyWidth * 0.035, 38, 76)),
        bodyMaterial,
      );
      body.position.set(0, bodyYOffset, -50);
      group.add(body);

      const screenFrame = new THREE.Mesh(
        roundedPanelGeometry(screenWidth + 50, screenHeight + 50, clamp(screenHeight * 0.055, 18, 42), 32),
        bevelMaterial,
      );
      screenFrame.position.set(screenCenterX, screenCenterY, -10);
      group.add(screenFrame);

      const screenInset = new THREE.Mesh(
        roundedPanelGeometry(screenWidth + 14, screenHeight + 14, clamp(screenHeight * 0.048, 16, 36), 12),
        topVentMaterial,
      );
      screenInset.position.set(screenCenterX, screenCenterY, 4);
      group.add(screenInset);

      glass = new THREE.Mesh(
        roundedPanelGeometry(screenWidth, screenHeight, clamp(screenHeight * 0.044, 14, 32), 4),
        glassMaterial,
      );
      glass.position.set(screenCenterX, screenCenterY, 18);
      group.add(glass);

      const controlPanel = new THREE.Mesh(
        roundedPanelGeometry(controlWidth, screenHeight * 0.95, clamp(controlWidth * 0.18, 16, 28), 18),
        trimMaterial,
      );
      controlPanel.position.set(controlCenterX, screenCenterY, 2);
      group.add(controlPanel);

      const sideSlotCount = 8;
      for (let i = 0; i < sideSlotCount; i += 1) {
        const slot = new THREE.Mesh(new THREE.BoxGeometry(controlWidth * 0.56, 5, 8), topVentMaterial);
        slot.position.set(controlCenterX, screenCenterY + screenHeight * 0.26 - i * clamp(screenHeight * 0.047, 13, 22), 25);
        group.add(slot);
      }

      const ventCount = clamp(Math.round(bodyWidth / 95), 8, 18);
      for (let i = 0; i < ventCount; i += 1) {
        const vent = new THREE.Mesh(new THREE.BoxGeometry(clamp(bodyWidth * 0.032, 34, 58), 6, 10), topVentMaterial);
        vent.position.set((i - (ventCount - 1) / 2) * clamp(bodyWidth * 0.048, 46, 74), bodyYOffset + bodyHeight / 2 - topPadding * 0.45, 22);
        group.add(vent);
      }

      const lowerLip = new THREE.Mesh(new THREE.BoxGeometry(screenWidth * 0.76, clamp(bodyHeight * 0.018, 12, 22), 18), trimMaterial);
      lowerLip.position.set(screenCenterX - screenWidth * 0.04, screenCenterY - screenHeight / 2 - bottomPadding * 0.38, 14);
      group.add(lowerLip);

      for (let i = 0; i < 3; i += 1) {
        const knobRadius = clamp(controlWidth * 0.13, 15, 28);
        const knob = new THREE.Mesh(new THREE.CylinderGeometry(knobRadius, knobRadius, 18, 36), knobMaterial);
        knob.rotation.x = Math.PI / 2;
        knob.position.set(controlCenterX, screenCenterY - screenHeight * 0.18 - i * knobRadius * 2.7, 34);
        knobs.push(knob);
        group.add(knob);
      }

      leds = ledMaterials.map((material, index) => {
        const led = new THREE.Mesh(new THREE.SphereGeometry(clamp(controlWidth * 0.048, 6, 10), 24, 16), material);
        led.position.set(
          controlCenterX - controlWidth * 0.24 + index * controlWidth * 0.24,
          screenCenterY - screenHeight * 0.42,
          36,
        );
        group.add(led);
        return led;
      });

      const badge = new THREE.Mesh(
        roundedPanelGeometry(clamp(bodyWidth * 0.13, 78, 150), clamp(bodyHeight * 0.038, 18, 30), 7, 5),
        rearBodyMaterial,
      );
      badge.position.set(screenCenterX - screenWidth * 0.36, screenCenterY - screenHeight / 2 - bottomPadding * 0.39, 32);
      group.add(badge);

      const baseStem = new THREE.Mesh(
        roundedPanelGeometry(clamp(bodyWidth * 0.12, 92, 180), clamp(bodyHeight * 0.06, 30, 58), 14, 18),
        rearBodyMaterial,
      );
      baseStem.position.set(0, bodyYOffset - bodyHeight / 2 + clamp(bodyHeight * 0.03, 12, 26), -72);
      group.add(baseStem);

      const base = new THREE.Mesh(
        roundedPanelGeometry(clamp(bodyWidth * 0.34, 220, 520), clamp(bodyHeight * 0.045, 24, 44), 18, 22),
        trimMaterial,
      );
      base.position.set(0, bodyYOffset - bodyHeight / 2 + clamp(bodyHeight * 0.008, 4, 12), -58);
      group.add(base);

      const shadow = new THREE.Mesh(
        new THREE.PlaneGeometry(bodyWidth * 0.72, clamp(bodyHeight * 0.075, 32, 72)),
        new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.1 }),
      );
      shadow.position.set(bodyWidth * 0.04, bodyYOffset - bodyHeight / 2 + 2, -140);
      group.add(shadow);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);

      renderer.setSize(width, height, false);
      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();
      rebuildModel(width, height);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const render = () => {
      const elapsed = (performance.now() - startedAt) / 1000;
      const { isScrolling: scrolling, isClicking: clicking, isRouting: routing } = stateRef.current;

      group.rotation.z = Math.sin(elapsed * 0.32) * 0.0012;
      if (glass) {
        glass.scale.set(1 + Math.sin(elapsed * 0.5) * 0.0015, 1, 1);
      }

      knobs.forEach((knob, index) => {
        knob.rotation.z = elapsed * (0.08 + index * 0.025);
      });

      const ledStates = [scrolling, clicking, routing];
      ledMaterials.forEach((material, index) => {
        const active = ledStates[index];
        const flicker = index === 1 ? Math.sin(elapsed * 42) > -0.15 : Math.sin(elapsed * 5 + index) > -0.35;
        const intensity = active && flicker ? 0.9 : 0.08;
        material.color.setHex(active ? (index === 2 ? 0xffc04d : 0x80ff6a) : index === 2 ? 0x2d2515 : 0x263018);
        material.emissive.setHex(active ? (index === 2 ? 0xff9d00 : 0x40ff22) : 0x000000);
        material.emissiveIntensity = intensity;
        leds[index]?.scale.setScalar(active ? 1.18 : 1);
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
        disposeObject(object, true);
      });
    };
  }, []);

  return <canvas ref={canvasRef} className="screen-frame-shell-3d" aria-hidden="true" />;
}
