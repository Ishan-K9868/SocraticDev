import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import Badge from '../ui/Badge';

const techStack = {
    frontend: {
        title: 'Frontend',
        icon: '🎨',
        items: [
            { name: 'React 18', desc: 'UI Framework' },
            { name: 'TypeScript', desc: 'Type Safety' },
            { name: 'Tailwind CSS', desc: 'Styling' },
            { name: 'Monaco Editor', desc: 'Code Editing' },
            { name: 'GSAP', desc: 'Animations' },
        ],
        color: 'primary',
    },
    backend: {
        title: 'Backend',
        icon: '⚙️',
        items: [
            { name: 'FastAPI', desc: 'API Server' },
            { name: 'WebSocket', desc: 'Real-time' },
            { name: 'Tree-sitter', desc: 'AST Parsing' },
        ],
        color: 'secondary',
    },
    ai: {
        title: 'AI Layer',
        icon: '🧠',
        items: [
            { name: 'Gemini 2.0 Flash', desc: 'LLM' },
            { name: 'Embeddings API', desc: 'Semantic Search' },
            { name: 'Socratic Prompts', desc: 'Teaching Method' },
        ],
        color: 'accent',
    },
    data: {
        title: 'Data Layer',
        icon: '📊',
        items: [
            { name: 'Neo4j', desc: 'Graph Database' },
            { name: 'Chroma', desc: 'Vector Store' },
            { name: 'Redis', desc: 'Caching' },
        ],
        color: 'success',
    },
};

function TechStackSection() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Set up 3D perspective
        gsap.set('.tech-stack-visual', { perspective: 1200 });

        // Animate header
        gsap.from('.tech-header', {
            opacity: 0,
            y: 40,
            scrollTrigger: {
                trigger: '.tech-header',
                start: 'top 80%',
            },
        });

        // Animate stack layers flipping in
        gsap.from('.stack-layer', {
            rotationX: -90,
            y: 50,
            opacity: 0,
            stagger: 0.15,
            scrollTrigger: {
                trigger: '.tech-stack-visual',
                start: 'top 70%',
                end: 'center center',
                scrub: 1,
            },
            transformOrigin: 'center bottom',
        });

        // Subtle continuous rotation
        gsap.to('.tech-stack-visual', {
            rotationY: 5,
            rotationX: 2,
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        });

    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            id="tech"
            className="section-padding relative overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 section-gradient" />
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />

            <div className="container-custom relative z-10">
                {/* Header */}
                <div className="tech-header text-center max-w-3xl mx-auto mb-16">
                    <Badge variant="secondary" className="mb-4">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        Technology
                    </Badge>

                    <h2 className="font-display text-display-md font-bold mb-6">
                        Built for developers,{' '}
                        <span className="text-gradient-primary">by developers</span>
                    </h2>

                    <p className="text-lg text-[color:var(--color-text-secondary)]">
                        Modern, performant tech stack designed for real-time AI assistance and deep code understanding.
                    </p>
                </div>

                {/* Tech Stack Visualization */}
                <div className="tech-stack-visual max-w-4xl mx-auto">
                    <div className="space-y-4">
                        {Object.entries(techStack).map(([key, layer], index) => (
                            <div
                                key={key}
                                className={`stack-layer p-6 rounded-2xl border bg-[color:var(--color-bg-secondary)]
                          border-[color:var(--color-border)] shadow-card
                          ${index > 0 ? '-mt-2' : ''}`}
                                style={{
                                    transform: `translateZ(${index * 10}px)`,
                                }}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{layer.icon}</span>
                                        <h3 className="font-display text-lg font-semibold">{layer.title}</h3>
                                    </div>
                                    <Badge
                                        variant={
                                            layer.color === 'primary' ? 'primary' :
                                                layer.color === 'secondary' ? 'secondary' :
                                                    layer.color === 'accent' ? 'accent' :
                                                        'success'
                                        }
                                    >
                                        Layer {index + 1}
                                    </Badge>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    {layer.items.map((item) => (
                                        <div
                                            key={item.name}
                                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[color:var(--color-bg-muted)]"
                                        >
                                            <span className="font-medium text-sm">{item.name}</span>
                                            <span className="text-xs text-[color:var(--color-text-muted)]">
                                                {item.desc}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom features */}
                <div className="grid md:grid-cols-3 gap-6 mt-16">
                    {[
                        {
                            icon: (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            ),
                            title: 'Real-time Processing',
                            desc: 'WebSocket connections for instant AI responses under 2 seconds.',
                        },
                        {
                            icon: (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            ),
                            title: 'Enterprise Security',
                            desc: 'Your code never leaves your environment. Self-hosted option available.',
                        },
                        {
                            icon: (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
                                </svg>
                            ),
                            title: '10+ Languages',
                            desc: 'Python, JavaScript, TypeScript, Java, C++, Go, Rust, and more.',
                        },
                    ].map((feature) => (
                        <div
                            key={feature.title}
                            className="p-6 rounded-2xl bg-[color:var(--color-bg-secondary)] border border-[color:var(--color-border)]"
                        >
                            <div className="w-12 h-12 rounded-xl bg-secondary-500/10 flex items-center justify-center text-secondary-500 mb-4">
                                {feature.icon}
                            </div>
                            <h4 className="font-display font-semibold mb-2">{feature.title}</h4>
                            <p className="text-sm text-[color:var(--color-text-secondary)]">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TechStackSection;
