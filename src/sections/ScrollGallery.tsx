// ScrollGallery.tsx
import { useEffect, useRef, useCallback } from "react";
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

  const initScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const imgGroup = container.querySelector(".img-group") as HTMLElement;
    if (!imgGroup) return;

    // 从 DOM 实际宽度计算位移量，适配任意纵横比混排
    const scrollWidth = imgGroup.scrollWidth;
    const viewportWidth = window.innerWidth;
    const translateAmount = Math.max(0, scrollWidth - viewportWidth + 40);

    if (translateAmount <= 0) return;

    const controls1 = scroll(
      animate(".img-group", {
        transform: ["none", `translateX(-${translateAmount}px)`],
      }),
      { target: container }
    );

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
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 等所有图片加载完成后再计算宽度（不同纵横比图片宽度不同）
    const images = container.querySelectorAll("img");
    let loadedCount = 0;
    let cleanup: (() => void) | undefined;

    const tryInit = () => {
      loadedCount++;
      if (loadedCount >= images.length) {
        cleanup = initScroll();
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        tryInit();
      } else {
        img.addEventListener("load", tryInit, { once: true });
        img.addEventListener("error", tryInit, { once: true });
      }
    });

    // 兜底：如果没有图片也初始化
    if (images.length === 0) {
      cleanup = initScroll();
    }

    return () => {
      cleanup?.();
    };
  }, [items.length, initScroll]);

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
