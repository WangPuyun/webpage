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
    technologies: ['PyTorch', 'OpenCV', 'CUDA', 'STM32'],
    icon: Target,
    color: 'from-neon-green to-emerald-500',
    videos: [withBase("/videos/object_tracking.mp4")],
  },
  {
    title: 'STM32智能桌面宠物',
    category: '兴趣爱好',
    description:
      '基于 STM32 复现智能桌面宠物项目，实现语音识别控制OLED表情显示及舵机动作，并通过蓝牙模块实现远程运动控制，构建具有良好交互体验的嵌入式系统。',
    technologies: ['STM32','C语言', 'ROS', 'SolidWorks'],
    icon: Cpu,
    color: 'from-neon-cyan to-blue-500',
    videos: [withBase("/videos/smart_desktop_pet.mp4")],
  },
  {
    title: '基于多旋翼无人机机器视觉的水面浮标检测系统',
    category: '本科毕业设计',
    description:
      '针对夜间低可见度场景，引入可见光-红外图像融合技术，集成TIF/TGFuse/SwinFusion三种算法，将融合图像作为YOLOv5s输入。相比纯可见光检测，融合后夜间mAP@0.5从72%提升至95.8%，漏检率降低60%，实现日夜连续稳定作业。',
    technologies: ['PyQT', 'PyTorch', 'STM32'],
    icon: Code2,
    color: 'from-neon-purple to-violet-500',
    videos: [withBase("/videos/graduation_design.mp4")],
  },
  {
    title: '融合BP神经网络的嵌入式火灾智能预警系统设计',
    category: '毕业设计辅导',
    description:
      '针对传统阈值式STM32报警系统难适应复杂工况的局限，提出智能算法架构：STM32采集环境数据，上位机基于BP神经网络对实时数据做火灾预测，验证集准确率97.25%、召回率99.3%、F1达0.9463，实现从"规则驱动"到"数据驱动"的火灾判别范式升级。',
    technologies: ['PyQT', 'BP神经网络', 'PyTorch', 'STM32'],
    icon: Code2,
    color: 'from-neon-purple to-violet-500',
    images: [withBase("/images/Intelligent_fire_alarm_system.png"),withBase("/images/Intelligent_fire_alarm_system_workflow.png"),withBase("/images/Intelligent_fire_alarm_system_effect.png")],
  },
  {
    title: '基于机器视觉的零件拣选系统',
    category: '毕业设计辅导',
    description:
      '基于MATLAB开发零件实时拣选系统，以标准硬币为参照物标定尺寸，构建灰度化→高斯滤波→Canny边缘检测→孔洞填充→轮廓提取的图像处理流水线，实现零件最小外接矩形拟合与尺寸测量，单帧检测耗时约350ms。',
    technologies: ['高斯滤波', '边缘检测', '空洞填充', '视觉测量'],
    icon: Briefcase,
    color: 'from-orange-400 to-red-500',
    videos: [withBase("/videos/Parts_picking_system.mp4")],
  },
  {
    title: '并联SCARA机器人运动控制系统设计（项目负责人）',
    category: '本科课设',
    description:
      '负责基于STM32的下位机开发，实现五连杆并联SCARA的运动学逆解、梯形加减速粗插补与关节空间逐点比较精插补算法，支持G代码解析与多段直线/圆弧连续插补，并设计光电开关自动回零机制，完成整机绘图验证。课设成绩94分（满绩）',
    technologies: ['STM32', '插补算法', '运动学编程', '步进电机控制', 'C#上位机开发'],
    icon: Target,
    color: 'from-neon-green to-emerald-500',
    videos: [withBase("/videos/SCARA.mp4")],
  },
  {
    title: '新冠疫情下智能配送餐车的设计与实现（项目负责人）',
    category: '本科生科研训练计划',
    description:
      '主持设计三节式麦克纳姆轮配送车，基于SolidWorks/Adams完成两轮迭代的虚拟样机仿真与实体搭建；搭建并部署基于YOLOv5的门牌号识别模型，3000张样本训练后准确率达95%，经TensorRT加速推理耗时从50ms降至4ms。',
    technologies: ['SolidWorks','Adams仿真', 'YOLO'],
    icon: Cpu,
    color: 'from-neon-cyan to-blue-500',
    images: [withBase("/images/餐车模型及其爆炸图.jpg"),withBase("/images/Adams仿真图.jpg"),withBase("/images/实体样机调试 图.jpg")],
  },
  {
    title: '3R副并联Delta机器人的概念设计与样机搭建',
    category: '本科课设',
    description:
      '基于 MATLAB 编写3R型Delta机器人运动学正逆解程序，完成工作空间验证与关节尺寸设计；通过引入关节约束消除逆解多解并计算关节位移；利用旋量理论推导空间自由度并与Kutzbach-Grübler公式对比验证。课设成绩 97分，成果入选学院展览。',
    technologies: ['SolidWorks','MATLAB仿真', '机器人运动空间解算'],
    icon: Cpu,
    color: 'from-neon-cyan to-blue-500',
    images: [withBase("/images/delta.gif"),withBase("/images/delta_structure.gif"),withBase("/images/delta_GroupPhoto.jpg")],
  },
  {
    title: '仿生多足虫',
    category: '机械设计创新大赛',
    description:
      '基于仿生学设计 “舵机+摆动臂” 仿生虫机器人，模拟虫类上下蠕动与左右摆动实现复杂地形运动；集成 摄像头与红外传感器 实现环境信息采集与地形适应，完成整机结构设计与搭建，项目获 省赛二等奖。',
    technologies: ['SolidWorks','arduino'],
    icon: Cpu,
    color: 'from-neon-cyan to-blue-500',
    videos: [withBase("/videos/worm.mp4")],
  },
  {
    title: '志愿者服务',
    category: '',
    description:
      '',
    technologies: [],
    icon: Cpu,
    color: 'from-neon-cyan to-blue-500',
    images: [withBase("/images/volunteer1.jpg"),withBase("/images/volunteer2.jpg")],
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
              { value: '10+', label: '项目经历' },
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
