"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type CrtSceneProps = {
  postsCount: number;
  categoriesCount: number;
  tagsCount: number;
};

function createScreenTexture({
  postsCount,
  categoriesCount,
  tagsCount,
}: CrtSceneProps): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 768;
  const context = canvas.getContext("2d");

  if (!context) {
    return new THREE.CanvasTexture(canvas);
  }

  context.fillStyle = "#07100a";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "rgba(137, 255, 178, 0.08)";
  for (let y = 0; y < canvas.height; y += 8) {
    context.fillRect(0, y, canvas.width, 2);
  }

  context.font = '700 42px "Fusion Pixel 12px Mono", monospace';
  context.fillStyle = "#89ffb2";
  context.fillText("EFFECTIVE-GARBANZO OS", 72, 120);
  context.font = '28px "Fusion Pixel 12px Mono", monospace';
  context.fillStyle = "#f5f5f0";
  context.fillText("> BOOTING CRT TERMINAL", 72, 190);
  context.fillText("> ROUTES: POSTS / TAGS / ABOUT", 72, 240);
  context.fillText("> DISPLAY: CRT READING MODE", 72, 290);

  context.strokeStyle = "#89ffb2";
  context.lineWidth = 2;
  context.strokeRect(72, 360, 260, 150);
  context.strokeRect(382, 360, 260, 150);
  context.strokeRect(692, 360, 260, 150);

  context.font = '700 58px "Fusion Pixel 12px Mono", monospace';
  context.fillStyle = "#f5f5f0";
  context.fillText(String(postsCount).padStart(2, "0"), 116, 440);
  context.fillText(String(categoriesCount).padStart(2, "0"), 426, 440);
  context.fillText(String(tagsCount).padStart(2, "0"), 736, 440);

  context.font = '22px "Fusion Pixel 12px Mono", monospace';
  context.fillStyle = "#a3a3a3";
  context.fillText("POSTS", 116, 480);
  context.fillText("CATS", 426, 480);
  context.fillText("TAGS", 736, 480);

  context.fillStyle = "#89ffb2";
  context.fillRect(72, 610, 18, 32);
  context.fillStyle = "#f5f5f0";
  context.fillText("READY FOR READING_", 104, 636);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

export function CrtScene(props: CrtSceneProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#050505");

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 1.2, 8.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight("#ffffff", 0.55);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight("#ffffff", 2.4);
    keyLight.position.set(2.8, 5, 3.5);
    scene.add(keyLight);

    const screenLight = new THREE.PointLight("#89ffb2", 2.4, 8);
    screenLight.position.set(0, 0.6, 2.4);
    scene.add(screenLight);

    const group = new THREE.Group();
    scene.add(group);

    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: "#181818",
      roughness: 0.72,
      metalness: 0.08,
    });
    const darkMaterial = new THREE.MeshStandardMaterial({
      color: "#070707",
      roughness: 0.86,
      metalness: 0.1,
    });
    const greenMaterial = new THREE.MeshStandardMaterial({
      color: "#89ffb2",
      emissive: "#174e2a",
      emissiveIntensity: 0.8,
      roughness: 0.35,
    });

    const body = new THREE.Mesh(new THREE.BoxGeometry(5.4, 3.8, 2.4), bodyMaterial);
    body.position.set(0, 0.45, 0);
    group.add(body);

    const bezel = new THREE.Mesh(new THREE.BoxGeometry(4.5, 2.8, 0.24), darkMaterial);
    bezel.position.set(-0.32, 0.68, 1.22);
    group.add(bezel);

    const screenTexture = createScreenTexture(props);
    const screenMaterial = new THREE.MeshBasicMaterial({
      map: screenTexture,
      toneMapped: false,
    });
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(3.75, 2.25), screenMaterial);
    screen.position.set(-0.32, 0.68, 1.35);
    group.add(screen);

    const sidePanel = new THREE.Mesh(new THREE.BoxGeometry(0.72, 2.62, 0.26), darkMaterial);
    sidePanel.position.set(2.16, 0.68, 1.36);
    group.add(sidePanel);

    for (let index = 0; index < 3; index += 1) {
      const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.13, 28), bodyMaterial);
      knob.rotation.x = Math.PI / 2;
      knob.position.set(2.16, 1.35 - index * 0.48, 1.55);
      group.add(knob);
    }

    for (let index = 0; index < 4; index += 1) {
      const button = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.16, 0.12), index === 0 ? greenMaterial : bodyMaterial);
      button.position.set(2.16, -0.35 - index * 0.25, 1.56);
      group.add(button);
    }

    const base = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.28, 1.8), bodyMaterial);
    base.position.set(0, -1.74, -0.2);
    group.add(base);

    const foot = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.22, 1.15), darkMaterial);
    foot.position.set(0, -2.02, 0.1);
    group.add(foot);

    const starsGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(160 * 3);
    for (let index = 0; index < starPositions.length; index += 3) {
      starPositions[index] = (Math.random() - 0.5) * 12;
      starPositions[index + 1] = (Math.random() - 0.5) * 8;
      starPositions[index + 2] = -2 - Math.random() * 7;
    }
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const stars = new THREE.Points(
      starsGeometry,
      new THREE.PointsMaterial({ color: "#f5f5f0", size: 0.025 }),
    );
    scene.add(stars);

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    let animationFrame = 0;
    const render = () => {
      if (!prefersReducedMotion) {
        const elapsed = performance.now() * 0.001;
        group.rotation.y = Math.sin(elapsed * 0.45) * 0.12;
        group.rotation.x = Math.sin(elapsed * 0.32) * 0.035;
        stars.rotation.y = elapsed * 0.015;
        screenLight.intensity = 2 + Math.sin(elapsed * 2.2) * 0.24;
      }
      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      host.removeChild(renderer.domElement);
      screenTexture.dispose();
      screenMaterial.dispose();
      body.geometry.dispose();
      bezel.geometry.dispose();
      bodyMaterial.dispose();
      darkMaterial.dispose();
      greenMaterial.dispose();
      starsGeometry.dispose();
      renderer.dispose();
    };
  }, [props]);

  return (
    <div
      ref={hostRef}
      className="h-full min-h-[320px] w-full"
      role="img"
      aria-label="Three.js 渲染的老式 CRT 显示屏博客终端场景"
    />
  );
}
