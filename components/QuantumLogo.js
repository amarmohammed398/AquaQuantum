import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import Svg, { Line } from 'react-native-svg';

const COLORS = ['#5B86E5', '#36D1DC', '#7E57C2', '#90CAF9', '#9575CD'];
const NUM_PARTICLES = 6;

function useCircularParticle(radius, speed, offsetAngle = 0, updatePosition) {
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const angleRef = useRef(offsetAngle);

  useEffect(() => {
    let animationFrame;
    const animate = () => {
      angleRef.current += speed;

      const x = radius * Math.cos(angleRef.current);
      const y = radius * Math.sin(angleRef.current);
      position.setValue({ x, y });
      updatePosition({ x, y });

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return position;
}

const QuantumLogo = () => {
  const [positions, setPositions] = useState(Array(NUM_PARTICLES).fill({ x: 0, y: 0 }));

  const particles = Array.from({ length: NUM_PARTICLES }, (_, i) => {
    const radius = 12 + (i % 2) * 6;
    const speed = 0.02 + i * 0.002;
    const offset = (i * Math.PI * 2) / NUM_PARTICLES;

    const updatePosition = (pos) => {
      setPositions((prev) => {
        const copy = [...prev];
        copy[i] = pos;
        return copy;
      });
    };

    return {
      position: useCircularParticle(radius, speed, offset, updatePosition),
      color: COLORS[i % COLORS.length],
    };
  });

  return (
    <View style={styles.logoSection}>
      <View style={styles.particleLogo}>
        <Svg style={StyleSheet.absoluteFill}>
          {positions.map((start, i) =>
            positions.map((end, j) => {
              if (i >= j) return null;
              return (
                <Line
                  key={`${i}-${j}`}
                  x1={start.x + 30}
                  y1={start.y + 30}
                  x2={end.x + 30}
                  y2={end.y + 30}
                  stroke="#B39DDB"
                  strokeWidth="0.5"
                  opacity={0.4}
                />
              );
            })
          )}
        </Svg>

        {particles.map((p, idx) => (
          <Animated.View
            key={idx}
            style={[
              styles.particle,
              {
                backgroundColor: p.color,
                transform: [
                  { translateX: p.position.x },
                  { translateY: p.position.y },
                ],
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  particleLogo: {
    width: 60,
    height: 60,
    position: 'relative',
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  particle: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    opacity: 0.85,
    shadowColor: '#5B86E5',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
});

export default QuantumLogo;
