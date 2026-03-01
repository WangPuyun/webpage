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

    // 根据屏幕宽度动态计算位移量
    const getTranslateAmount = () => {
      const vw = window.innerWidth;
      if (vw <= 640) return (items.length - 1) * 82; // 移动端：80vw 卡片宽度
      if (vw <= 1024) return (items.length - 1) * 38; // 平板：36vw
      return (items.length - 1) * 30; // 桌面：28vw 卡片宽度
    };

    const translateVw = getTranslateAmount();

    // 核心动画：垂直滚动 → 水平位移
    const controls1 = scroll(
      animate(".img-group", {
        transform: ["none", `translateX(-${translateVw}vw)`],
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
      {/* Gallery Title */}
      <div className="text-center mt-20 mb-4">
        <h3 className="text-2xl md:text-3xl font-bold text-white/80">
          证书<span className="text-gradient">展示</span>
        </h3>
        <p className="text-white/40 text-sm mt-2">横向滚动浏览</p>
      </div>

      <section ref={containerRef} className="img-group-container">
        <div>
          <ul className="img-group">
            {items.map((item, i) => (
              <li key={i} className="img-container">
                <div className="img-wrapper">
                  <img src={item.src} alt={item.label || `证书 ${i + 1}`} />
                </div>
                {item.label && <h3>{item.label}</h3>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 进度条 */}
      <div className="gallery-progress-track">
        <div className="progress" />
      </div>
    </>
  );
}
