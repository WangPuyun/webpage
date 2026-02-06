import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Award, Users, BookOpen } from 'lucide-react';
import { withBase } from "@/utils/asset";

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    period: '2020 - 2024',
    school: '福州大学 211本科',
    major: '机器人工程专业',
    icon: GraduationCap,
  },
  {
    period: '2024 - 2027',
    school: '福州大学 211硕士',
    major: '机械工程专业',
    details: '专业排名 3/164，前 2%',
    icon: GraduationCap,
  },
];

const memberships = [
  { name: 'IEEE学生会员', icon: Users },
  { name: '中国光学工程学会学生会员', icon: Users },

];

const researchAreas = [
  '智能计算机视觉',
  '计算成像',
  '仿生视觉信息处理',
  '机器人视觉算法',
  '机器人编程',
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'circle(0% at 50% 50%)', opacity: 0 },
        {
          clipPath: 'circle(100% at 50% 50%)',
          opacity: 1,
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content animations
      gsap.fromTo(
        '.about-title',
        { x: -50, opacity: 0, rotate: -5 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.about-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
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
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-card to-dark-bg" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-neon-purple/10 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-neon-cyan/10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="about-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-16">
          关于<span className="text-gradient">我</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Visual */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                  {/* 个人照片 */}
                  <img 
                    src={withBase("/images/personal_photo3.jpg")}
                    alt="王普云"
                    className="w-full h-full object-cover"
                  />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent" />
            </div>

          </div>

          {/* Right Column - Content */}
          <div ref={contentRef} className="space-y-8">
            {/* Education */}
            <div className="about-item">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-neon-green" />
                教育背景
              </h3>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="glass rounded-xl p-4 hover:border-neon-green/30 transition-colors"
                  >
                    <p className="text-neon-green text-sm font-medium">{edu.period}</p>
                    <p className="text-white font-semibold mt-1">{edu.school}</p>
                    <p className="text-white/70">{edu.major}</p>
                    {edu.details && (
                      <p className="text-neon-cyan text-sm mt-1">{edu.details}</p>
                    )}
                    {/* CET-6 Badge - only for undergraduate */}
                    {index === 0 && (
                      <div className="mt-3 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-green/10 border border-neon-green/30 text-neon-green text-xs font-medium">
                          <Award className="w-3.5 h-3.5" />
                          CET-6 英语六级
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Memberships */}
            <div className="about-item">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-neon-purple" />
                学术会员
              </h3>
              <div className="flex flex-wrap gap-3">
                {memberships.map((member, index) => (
                  <div
                    key={index}
                    className="glass rounded-full px-4 py-2 flex items-center gap-2"
                  >
                    <member.icon className="w-4 h-4 text-neon-purple" />
                    <span className="text-white/80 text-sm">{member.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Research Areas */}
            <div className="about-item">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-neon-cyan" />
                研究方向
              </h3>
              <div className="flex flex-wrap gap-3">
                {researchAreas.map((area, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-sm hover:bg-neon-cyan/20 transition-colors"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
