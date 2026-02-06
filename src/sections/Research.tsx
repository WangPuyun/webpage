import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Lightbulb, ExternalLink, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Paper {
  title: string;
  authors: string;
  journal: string;
  year: string;
  abstract: string;
  link: string;
  github?: string;
  type: 'paper';
}

interface Patent {
  title: string;
  inventors: string;
  number: string;
  date: string;
  abstract: string;
  link: string;
  type: 'patent';
}

type ResearchItem = Paper | Patent;

const papers: Paper[] = [
  {
    title: '基于深度学习的计算成像方法研究',
    authors: '王雨晨, 等',
    journal: '光学学报',
    year: '2025',
    abstract:
      '提出了一种新型的深度学习计算成像方法，通过神经网络优化成像过程，显著提升了成像质量和速度。实验结果表明，该方法在多种场景下均优于传统方法。',
    link: 'https://example.com/paper1',
    github: 'https://github.com/example/repo1',
    type: 'paper',
  },
  {
    title: '仿生视觉信息处理在机器人导航中的应用',
    authors: '王雨晨, 等',
    journal: '机器人',
    year: '2024',
    abstract:
      '受生物视觉系统启发，设计了一种仿生视觉信息处理框架，应用于机器人自主导航任务。该方法能够有效处理复杂环境下的视觉信息，提高导航精度。',
    link: 'https://example.com/paper2',
    type: 'paper',
  },
];

const patents: Patent[] = [
  {
    title: '一种基于神经网络的智能视觉检测系统',
    inventors: '王雨晨, 等',
    number: 'CN2024XXXXXXXX',
    date: '2024年',
    abstract:
      '本发明公开了一种基于神经网络的智能视觉检测系统，能够实现高精度的目标检测和识别，广泛应用于工业检测、安防监控等领域。',
    link: 'https://example.com/patent1',
    type: 'patent',
  },
];

function isPaper(item: ResearchItem): item is Paper {
  return item.type === 'paper';
}

export default function Research() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<'papers' | 'patents'>('papers');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.research-title',
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
        '.research-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.research-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentItems: ResearchItem[] = activeTab === 'papers' ? papers : patents;

  return (
    <section
      id="research"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-card to-dark-bg" />

      {/* Decorative elements */}
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-neon-cyan/5 blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 rounded-full bg-neon-purple/5 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="research-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            科研<span className="text-gradient">成果</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            发表的学术论文与申请的专利
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('papers')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'papers'
                ? 'bg-neon-green text-dark-bg shadow-glow'
                : 'glass text-white/70 hover:text-white hover:border-white/20'
            }`}
          >
            <FileText className="w-4 h-4" />
            学术论文
          </button>
          <button
            onClick={() => setActiveTab('patents')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'patents'
                ? 'bg-neon-purple text-white shadow-glow-purple'
                : 'glass text-white/70 hover:text-white hover:border-white/20'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            专利
          </button>
        </div>

        {/* Content Grid */}
        <div className="research-grid grid gap-6">
          {currentItems.map((item, index) => (
            <div
              key={index}
              className="research-card group glass rounded-2xl p-6 md:p-8 hover:border-white/20 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-gradient transition-colors mb-3">
                    {item.title}
                  </h3>

                  {/* Meta info */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-neon-cyan text-sm">
                      {isPaper(item) ? item.journal : item.number}
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="text-white/50 text-sm">
                      {isPaper(item) ? item.year : item.date}
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="text-white/50 text-sm">
                      {isPaper(item) ? item.authors : item.inventors}
                    </span>
                  </div>

                  {/* Abstract */}
                  <p className="text-white/60 text-sm leading-relaxed line-clamp-3">
                    {item.abstract}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  {isPaper(item) && item.github && (
                    <a
                      href={item.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full glass text-white/70 hover:text-white hover:border-neon-green/50 transition-all"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm">代码</span>
                    </a>
                  )}
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-neon-green/10 border border-neon-green/30 text-neon-green hover:bg-neon-green/20 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm">查看</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 flex justify-center gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-gradient">{papers.length}</p>
            <p className="text-white/50 text-sm mt-1">学术论文</p>
          </div>
          <div className="w-px bg-white/10" />
          <div className="text-center">
            <p className="text-3xl font-bold text-gradient">{patents.length}</p>
            <p className="text-white/50 text-sm mt-1">专利</p>
          </div>
        </div>
      </div>
    </section>
  );
}
