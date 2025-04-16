"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function AnimatedGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = resolvedTheme === "dark";

    // Set canvas dimensions
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();

    // Animation variables
    let particles: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
      alpha: number;
    }> = [];

    // Create particles
    const createParticles = () => {
      const { width, height } = canvas.getBoundingClientRect();
      particles = [];

      const colors = isDark
        ? [
            "rgba(124, 58, 237, 0.5)",
            "rgba(139, 92, 246, 0.5)",
            "rgba(167, 139, 250, 0.5)",
          ]
        : [
            "rgba(124, 58, 237, 0.3)",
            "rgba(139, 92, 246, 0.3)",
            "rgba(167, 139, 250, 0.3)",
          ];

      for (let i = 0; i < 15; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 100 + 50,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          alpha: Math.random() * 0.5 + 0.2,
        });
      }
    };

    createParticles();

    // Animation loop
    let animationFrameId: number;

    const animate = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      // Draw particles
      particles.forEach((particle) => {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius
        );

        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, "rgba(124, 58, 237, 0)");

        ctx.fillStyle = gradient;
        ctx.globalAlpha = particle.alpha;
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < -particle.radius) particle.x = width + particle.radius;
        if (particle.x > width + particle.radius) particle.x = -particle.radius;
        if (particle.y < -particle.radius)
          particle.y = height + particle.radius;
        if (particle.y > height + particle.radius)
          particle.y = -particle.radius;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    window.addEventListener("resize", () => {
      resizeCanvas();
      createParticles();
    });

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
      style={{ pointerEvents: "none" }}
    />
  );
}
