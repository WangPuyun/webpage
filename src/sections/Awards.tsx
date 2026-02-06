import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Medal, Award, Star } from 'lucide-react';
import ScrollGallery from "./ScrollGallery";
import "./ScrollGallery.css";

gsap.registerPlugin(ScrollTrigger);

const awards = [
  {
    title: '国家奖学金',
    level: '国家级',
    period: '硕士期间',
    description: '研究生国家奖学金，表彰优秀学术表现',
    icon: Trophy,
    color: 'from-yellow-400 to-orange-500',
  },
  {
    title: '福州大学研究生中期奖学金一等奖',
    level: '校级',
    period: '2025年',
    description: '研究生中期考核优秀，获得一等奖学金',
    icon: Medal,
    color: 'from-neon-green to-emerald-500',
  },
  {
    title: '福建省机械设计创新大赛二等奖',
    level: '省级',
    period: '本科期间',
    description: '机械设计创新大赛省级二等奖',
    icon: Award,
    color: 'from-neon-cyan to-blue-500',
  },
  {
    title: '福州大学本科生校级综合奖学金三等奖',
    level: '校级',
    period: '本科期间',
    description: '本科阶段综合表现优秀',
    icon: Star,
    color: 'from-neon-purple to-violet-500',
  },
];

const galleryItems = [
  { src: "/images/cert-1.jpg", label: "#武汉" },
  { src: "/images/cert-2.png", label: "#长沙" },
  { src: "/images/cert-2.png", label: "#杭州" },
  { src: "/images/cert-2.png", label: "#上海" },
  { src: "/images/cert-2.png", label: "#阿那亚" },
  { src: "/images/cert-1.jpg", label: "#武汉" },
  { src: "/images/cert-1.jpg", label: "#武汉" },
  { src: "/images/cert-1.jpg", label: "#武汉" },
];


export default function Awards() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.awards-title',
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

      // Cards stagger animation
      gsap.fromTo(
        '.award-card',
        { y: 60, opacity: 0, rotateY: -15 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: cardsRef.current,
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
      id="awards"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-x-clip"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-dark-bg" />

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-neon-green/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-neon-purple/5 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="awards-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            获奖<span className="text-gradient">情况</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            本科与硕士期间获得的荣誉与认可
          </p>
        </div>

        {/* Awards Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 gap-6 perspective-1000"
        >
          {awards.map((award, index) => (
            <div
              key={index}
              className="award-card group relative glass rounded-2xl p-6 hover:border-white/20 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Spotlight effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent" />
              </div>

              {/* Glow border */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${award.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}
              />

              <div className="relative flex items-start gap-5">
                {/* Icon */}
                <div
                  className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${award.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <award.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-gradient transition-colors">
                      {award.title}
                    </h3>
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded-full bg-gradient-to-r ${award.color} text-white`}
                    >
                      {award.level}
                    </span>
                  </div>
                  <p className="text-neon-green text-sm font-medium mb-2">
                    {award.period}
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {award.description}
                  </p>
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                <div
                  className={`w-full h-full bg-gradient-to-bl ${award.color}`}
                  style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '4+', label: '获奖总数' },
            { value: '1', label: '国家级' },
            { value: '1', label: '省级' },
            { value: '2', label: '校级' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center glass rounded-xl p-4 hover:border-neon-green/30 transition-colors"
            >
              <p className="text-3xl md:text-4xl font-bold text-gradient mb-1">
                {stat.value}
              </p>
              <p className="text-white/50 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
        {/* Certificates */}
        <div>
          <ScrollGallery items={galleryItems} />
        </div>
        
      </div>
    </section>
  );
}
