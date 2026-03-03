import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Cpu, Target, Briefcase } from 'lucide-react';
import { withBase } from "@/utils/asset";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: '基于YOLO的多目标自适应几何中心实时跟踪云台伺服系统',
    category: '硕士项目',
    description:
      '本系统融合YOLO算法与高精度二轴云台，实现多目标“群体感知”视觉追踪：单目标时锁定画面中心；多目标时计算全体目标的虚拟中心点并驱动云台平滑跟随，使群体始终处于最佳视野。其亮点在于检测算法与伺服控制深度融合，为全视角智能监控提供新方案。',
    technologies: ['Python', 'PyTorch', 'OpenCV', 'CUDA'],
    icon: Target,
    color: 'from-neon-green to-emerald-500',
    videos: [withBase("/videos/object_tracking.mp4")],
  },
  {
    title: '工业机器人控制系统',
    category: '毕业设计外包',
    description:
      '为制造企业开发的工业机器人控制系统，实现了精确的轨迹规划和运动控制。系统支持多种机器人型号，具有良好的可扩展性。',
    technologies: ['C++', 'ROS', 'SolidWorks', 'MATLAB'],
    icon: Cpu,
    color: 'from-neon-cyan to-blue-500',
    images: ['project2-1', 'project2-2'],
  },
  {
    title: '智能视觉检测平台',
    category: '毕业设计外包',
    description:
      '基于计算机视觉的产品质量检测平台，能够自动识别产品缺陷。系统集成深度学习模型，检测精度达到99%以上。',
    technologies: ['Python', 'TensorFlow', 'Flask', 'Docker'],
    icon: Code2,
    color: 'from-neon-purple to-violet-500',
    images: ['project3-1', 'project3-2'],
  },
  {
    title: '自动化生产线监控系统',
    category: '毕业设计外包',
    description:
      '为工厂设计的自动化生产线监控系统，实时采集设备数据，进行故障预警和生产优化。系统大幅提升了生产效率。',
    technologies: ['Java', 'Spring Boot', 'MySQL', 'MQTT'],
    icon: Briefcase,
    color: 'from-orange-400 to-red-500',
    images: ['project4-1', 'project4-2'],
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeMedia, setActiveMedia] = useState<Record<number, number>>({});

  // Control video playback based on card hover state
  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([key, video]) => {
      if (!video) return;
      if (hoveredIndex === Number(key)) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [hoveredIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.projects-title',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.project-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-dark-bg" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-green/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-neon-cyan/5 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="projects-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            项目<span className="text-gradient">经历</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            工程项目、竞赛、课程设计与毕业设计
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card group relative glass rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Media area */}
              <div className="relative aspect-video overflow-hidden">
                {(() => {
                  // Combine all media items: videos first, then images
                  const mediaItems: { type: 'video' | 'image'; src: string }[] = [
                    ...(project.videos || []).map((v) => ({ type: 'video' as const, src: v })),
                    ...(project.images || []).map((img) => ({ type: 'image' as const, src: img })),
                  ];
                  const currentIndex = activeMedia[index] || 0;
                  const currentItem = mediaItems[currentIndex];
                  const hasMedia = mediaItems.length > 0 && currentItem &&
                    !currentItem.src.includes('project'); // skip placeholder strings like 'project2-1'

                  if (hasMedia && currentItem.type === 'video') {
                    return (
                      <video
                        ref={(el) => { videoRefs.current[index] = el; }}
                        className="absolute inset-0 w-full h-full object-cover"
                        src={currentItem.src}
                        muted
                        loop
                        playsInline
                      />
                    );
                  } else if (hasMedia && currentItem.type === 'image') {
                    return (
                      <img
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={currentItem.src}
                        alt={project.title}
                        loading="lazy"
                      />
                    );
                  } else {
                    // Fallback: icon placeholder
                    return (
                      <>
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity`}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <project.icon
                              className={`w-16 h-16 mx-auto mb-2 bg-gradient-to-br ${project.color} bg-clip-text`}
                              style={{
                                color: 'transparent',
                                backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                              }}
                            />
                            <p className="text-white/30 text-sm">项目图片</p>
                          </div>
                        </div>
                      </>
                    );
                  }
                })()}

                {/* Media carousel dots (when multiple valid media) */}
                {(() => {
                  const mediaItems = [
                    ...(project.videos || []),
                    ...(project.images || []),
                  ].filter((src) => !src.includes('project'));
                  if (mediaItems.length <= 1) return null;
                  const currentIndex = activeMedia[index] || 0;
                  return (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                      {mediaItems.map((_, i) => (
                        <button
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMedia((prev) => ({ ...prev, [index]: i }));
                          }}
                          className={`w-2 h-2 rounded-full transition-all ${
                            i === currentIndex
                              ? 'bg-white w-4'
                              : 'bg-white/40 hover:bg-white/70'
                          }`}
                        />
                      ))}
                    </div>
                  );
                })()}

                {/* Overlay on hover */}
                <div
                  className={`hidden md:block absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-transparent transition-opacity duration-300 pointer-events-none ${
                    hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Category badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-black/50 backdrop-blur-sm text-white/80 border border-white/10">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white group-hover:text-gradient transition-colors mb-3">
                  {project.title}
                </h3>

                <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 text-xs rounded-md bg-white/5 text-white/60 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>

              {/* Glow effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl -z-10`}
              />
            </div>
          ))}
        </div>

        {/* Summary stats */}
        <div className="mt-16 glass rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '4', label: '外包项目' },
              { value: '3', label: '毕业设计' },
              { value: '2', label: '竞赛项目' },
              { value: '5+', label: '技术栈' },
            ].map((stat, index) => (
              <div key={index}>
                <p className="text-3xl md:text-4xl font-bold text-gradient mb-1">
                  {stat.value}
                </p>
                <p className="text-white/50 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
