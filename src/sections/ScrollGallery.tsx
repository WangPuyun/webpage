// ScrollGallery.tsx
import { useEffect, useRef } from "react";
import { animate, scroll } from "motion";

interface GalleryItem {
  src: string;
  label: string;
}

interface ScrollGalleryProps {
  items: GalleryItem[];
}

export default function ScrollGallery({ items }: ScrollGalleryProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 核心动画：垂直滚动 → 水平位移
    const controls1 = scroll(
      animate(".img-group", {
        transform: ["none", `translateX(-${(items.length - 1) * 18}vw)`],
      }),
      { target: container }
    );

    // 进度条动画
    const controls2 = scroll(
      animate(".progress", { scaleX: [0, 1] }),
      { target: container }
    );

    return () => {
        if (typeof controls1 === "object" && "stop" in controls1) {
          (controls1 as { stop: () => void }).stop();
        }
        if (typeof controls2 === "object" && "stop" in controls2) {
          (controls2 as { stop: () => void }).stop();
        }
      };
    }, [items.length]);

  return (
    <>
      <section ref={containerRef} className="img-group-container">
        <div>
          <ul className="img-group">
            {items.map((item, i) => (
              <li key={i} className="img-container">
                <img src={item.src} alt={item.label} />
                <h3>{item.label}</h3>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div className="progress" />
    </>
  );
}