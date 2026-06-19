"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type CrtSceneProps = {
  postsCount: number;
  categoriesCount: number;
  tagsCount: number;
  featuredPosts: Array<{
    title: string;
    category: string;
    date: string;
  }>;
  categories: Array<{
    name: string;
    count: number;
  }>;
};

function drawWrappedText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number,
) {
  const characters = Array.from(text);
  let line = "";
  let lineIndex = 0;

  for (const character of characters) {
    const testLine = `${line}${character}`;
    if (context.measureText(testLine).width > maxWidth && line) {
      context.fillText(line, x, y + lineIndex * lineHeight);
      line = character;
      lineIndex += 1;

      if (lineIndex >= maxLines) {
        return;
      }
    } else {
      line = testLine;
    }
  }

  if (line && lineIndex < maxLines) {
    context.fillText(line, x, y + lineIndex * lineHeight);
  }
}

function createScreenTexture({
  postsCount,
  categoriesCount,
  tagsCount,
  featuredPosts,
  categories,
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
  const gradient = context.createRadialGradient(500, 300, 60, 500, 300, 620);
  gradient.addColorStop(0, "rgba(137, 255, 178, 0.2)");
  gradient.addColorStop(1, "rgba(5, 5, 5, 0.9)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "rgba(137, 255, 178, 0.08)";
  for (let y = 0; y < canvas.height; y += 8) {
    context.fillRect(0, y, canvas.width, 2);
  }

  for (let index = 0; index < 70; index += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    context.fillStyle = `rgba(245, 245, 240, ${Math.random() * 0.16})`;
    context.fillRect(x, y, 2, 2);
  }

  context.font = '700 42px "Fusion Pixel 12px Mono", monospace';
  context.fillStyle = "#89ffb2";
  context.fillText("EFFECTIVE-GARBANZO OS", 64, 86);
  context.font = '28px "Fusion Pixel 12px Mono", monospace';
  context.fillStyle = "#f5f5f0";
  context.fillText("> CHANNEL: BLOG DEVICE FRAME", 64, 138);
  context.fillText("> ROUTES: POSTS / CATEGORIES / TAGS / ABOUT", 64, 184);

  context.strokeStyle = "#89ffb2";
  context.lineWidth = 2;
  context.strokeRect(64, 228, 260, 128);
  context.strokeRect(382, 228, 260, 128);
  context.strokeRect(700, 228, 260, 128);

  context.font = '700 58px "Fusion Pixel 12px Mono", monospace';
  context.fillStyle = "#f5f5f0";
  context.fillText(String(postsCount).padStart(2, "0"), 108, 304);
  context.fillText(String(categoriesCount).padStart(2, "0"), 426, 304);
  context.fillText(String(tagsCount).padStart(2, "0"), 744, 304);

  context.font = '22px "Fusion Pixel 12px Mono", monospace';
  context.fillStyle = "#a3a3a3";
  context.fillText("POSTS", 108, 334);
  context.fillText("CATS", 426, 334);
  context.fillText("TAGS", 744, 334);

  context.strokeStyle = "rgba(137, 255, 178, 0.72)";
  context.strokeRect(64, 404, 576, 224);
  context.strokeRect(684, 404, 276, 224);

  context.font = '700 25px "Fusion Pixel 12px Mono", monospace';
  context.fillStyle = "#89ffb2";
  context.fillText("LATEST_POSTS", 88, 446);
  context.fillText("CHANNELS", 708, 446);

  context.font = '22px "Fusion Pixel 12px Mono", monospace';
  featuredPosts.slice(0, 3).forEach((post, index) => {
    const y = 494 + index * 46;
    context.fillStyle = "#a3a3a3";
    context.fillText(`0${index + 1}`, 88, y);
    context.fillStyle = "#f5f5f0";
    drawWrappedText(context, post.title, 136, y, 382, 24, 1);
    context.fillStyle = "#89ffb2";
    context.fillText(post.category.toUpperCase(), 520, y);
  });

  context.font = '21px "Fusion Pixel 12px Mono", monospace';
  categories.slice(0, 4).forEach((category, index) => {
    context.fillStyle = index === 0 ? "#f5f5f0" : "#a3a3a3";
    context.fillText(`> ${category.name} [${category.count}]`, 708, 492 + index * 36);
  });

  context.fillStyle = "#89ffb2";
  context.fillRect(64, 684, 18, 32);
  context.fillStyle = "#f5f5f0";
  context.fillText("READY FOR READING_", 96, 710);

  context.strokeStyle = "rgba(255, 70, 70, 0.28)";
  context.beginPath();
  context.moveTo(58, 146);
  context.lineTo(962, 144);
  context.stroke();
  context.strokeStyle = "rgba(70, 120, 255, 0.24)";
  context.beginPath();
  context.moveTo(58, 150);
  context.lineTo(962, 148);
  context.stroke();

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

    const glass = new THREE.Mesh(
      new THREE.PlaneGeometry(3.82, 2.32, 20, 12),
      new THREE.MeshPhysicalMaterial({
        color: "#dfffea",
        transparent: true,
        opacity: 0.13,
        roughness: 0.08,
        metalness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0.15,
      }),
    );
    glass.position.set(-0.32, 0.68, 1.39);
    group.add(glass);

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

    for (let index = 0; index < 8; index += 1) {
      const vent = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.035, 0.035), darkMaterial);
      vent.position.set(-2.18 + index * 0.16, -0.92, 1.55);
      group.add(vent);
    }

    const cartridgeSlot = new THREE.Mesh(new THREE.BoxGeometry(1.28, 0.11, 0.08), darkMaterial);
    cartridgeSlot.position.set(0.9, -1.13, 1.56);
    group.add(cartridgeSlot);

    const sticker = new THREE.Mesh(
      new THREE.PlaneGeometry(0.82, 0.28),
      new THREE.MeshBasicMaterial({ color: "#f0e4bf" }),
    );
    sticker.position.set(-1.72, -1.1, 1.565);
    sticker.rotation.z = -0.08;
    group.add(sticker);

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
