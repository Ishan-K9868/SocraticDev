import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAnalytics } from './useAnalytics';
import SkillRadar from './SkillRadar';
import ThemeToggle from '../../components/ThemeToggle';

function AnalyticsDashboard() {
    const { metrics, getActivityRange, getLevel, isLoaded } = useAnalytics();
    const { level, xp, progress } = getLevel();
    const weekActivity = getActivityRange(7);

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[color:var(--color-bg-primary)]">
            {/* Header */}
            <header className="border-b border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)]">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            to="/app"
                            className="text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-primary)] transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                        <div>
                            <h1 className="text-xl font-display font-bold flex items-center gap-2">
                                <span className="text-2xl">📊</span>
                                Learning Analytics
                            </h1>
                            <p className="text-sm text-[color:var(--color-text-muted)]">
                                Track your progress and skill growth
                            </p>
                        </div>
                    </div>
                    <ThemeToggle />
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-8">
                {/* Level & XP */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-primary-500/20"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <div className="text-sm text-[color:var(--color-text-muted)]">Current Level</div>
                            <div className="text-4xl font-bold text-primary-400">Level {level}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-[color:var(--color-text-muted)]">Total XP</div>
                            <div className="text-2xl font-bold">{xp.toLocaleString()}</div>
                        </div>
                    </div>
                    <div className="h-3 bg-[color:var(--color-bg-muted)] rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                        />
                    </div>
                    <div className="text-xs text-[color:var(--color-text-muted)] mt-2 text-right">
                        {progress.toFixed(0)}% to Level {level + 1}
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Challenges', value: metrics.totalChallengesCompleted, icon: '🎯', color: 'text-cyan-400' },
                        { label: 'Flashcards', value: metrics.totalFlashcardsReviewed, icon: '🧠', color: 'text-violet-400' },
                        { label: 'Time Spent', value: `${Math.round(metrics.totalTimeSpent / 60)}h`, icon: '⏱️', color: 'text-orange-400' },
                        { label: 'Avg Score', value: `${metrics.averageScore.toFixed(0)}%`, icon: '📈', color: 'text-green-400' },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-4 rounded-xl bg-[color:var(--color-bg-secondary)] border border-[color:var(--color-border)]"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span>{stat.icon}</span>
                                <span className="text-sm text-[color:var(--color-text-muted)]">{stat.label}</span>
                            </div>
                            <div className={`text-2xl font-bold ${stat.color}`}>
                                {stat.value}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Skill Radar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="p-6 rounded-xl bg-[color:var(--color-bg-secondary)] border border-[color:var(--color-border)]"
                    >
                        <h3 className="text-lg font-semibold mb-4">Skill Breakdown</h3>
                        <SkillRadar skills={metrics.skillScores} />
                    </motion.div>

                    {/* Weekly Activity */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="p-6 rounded-xl bg-[color:var(--color-bg-secondary)] border border-[color:var(--color-border)]"
                    >
                        <h3 className="text-lg font-semibold mb-4">Weekly Activity</h3>
                        <div className="flex items-end justify-between h-40 gap-2">
                            {weekActivity.map((day, i) => {
                                const total = day.challenges + day.flashcards;
                                const maxHeight = 120;
                                const height = total > 0 ? Math.max(20, Math.min(maxHeight, total * 10)) : 8;
                                const dayName = new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' });

                                return (
                                    <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
                                        <motion.div
                                            className="w-full rounded-lg bg-primary-500/20 relative overflow-hidden"
                                            initial={{ height: 0 }}
                                            animate={{ height }}
                                            transition={{ delay: i * 0.05, duration: 0.4 }}
                                        >
                                            <motion.div
                                                className="absolute bottom-0 left-0 right-0 bg-primary-500"
                                                initial={{ height: 0 }}
                                                animate={{ height: `${(day.challenges / (total || 1)) * 100}%` }}
                                                transition={{ delay: i * 0.05 + 0.2, duration: 0.3 }}
                                            />
                                        </motion.div>
                                        <span className="text-xs text-[color:var(--color-text-muted)]">
                                            {dayName}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-[color:var(--color-text-muted)]">
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded bg-primary-500" />
                                Challenges
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded bg-primary-500/30" />
                                Flashcards
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Streak & Recent Activity */}
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                    {/* Streak */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="p-6 rounded-xl bg-[color:var(--color-bg-secondary)] border border-[color:var(--color-border)]"
                    >
                        <h3 className="text-lg font-semibold mb-4">Learning Streak</h3>
                        <div className="flex items-center gap-6">
                            <div className="text-center">
                                <div className="text-5xl mb-2">🔥</div>
                                <div className="text-3xl font-bold text-orange-400">{metrics.currentStreak}</div>
                                <div className="text-sm text-[color:var(--color-text-muted)]">Current</div>
                            </div>
                            <div className="flex-1 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[color:var(--color-text-muted)]">Longest Streak</span>
                                    <span className="font-medium">{metrics.longestStreak} days</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[color:var(--color-text-muted)]">Last Activity</span>
                                    <span className="font-medium">
                                        {metrics.lastActivityDate || 'Never'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="p-6 rounded-xl bg-[color:var(--color-bg-secondary)] border border-[color:var(--color-border)]"
                    >
                        <h3 className="text-lg font-semibold mb-4">Continue Learning</h3>
                        <div className="space-y-3">
                            <Link
                                to="/dojo"
                                className="flex items-center gap-3 p-3 rounded-lg bg-[color:var(--color-bg-muted)] hover:bg-primary-500/10 transition-colors"
                            >
                                <span className="text-xl">🥷</span>
                                <div className="flex-1">
                                    <div className="font-medium">The Dojo</div>
                                    <div className="text-xs text-[color:var(--color-text-muted)]">Practice coding challenges</div>
                                </div>
                                <svg className="w-5 h-5 text-[color:var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <Link
                                to="/srs"
                                className="flex items-center gap-3 p-3 rounded-lg bg-[color:var(--color-bg-muted)] hover:bg-primary-500/10 transition-colors"
                            >
                                <span className="text-xl">🧠</span>
                                <div className="flex-1">
                                    <div className="font-medium">Flashcards</div>
                                    <div className="text-xs text-[color:var(--color-text-muted)]">Review with spaced repetition</div>
                                </div>
                                <svg className="w-5 h-5 text-[color:var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <Link
                                to="/visualizer"
                                className="flex items-center gap-3 p-3 rounded-lg bg-[color:var(--color-bg-muted)] hover:bg-primary-500/10 transition-colors"
                            >
                                <span className="text-xl">🔍</span>
                                <div className="flex-1">
                                    <div className="font-medium">Code Visualizer</div>
                                    <div className="text-xs text-[color:var(--color-text-muted)]">Understand code with graphs</div>
                                </div>
                                <svg className="w-5 h-5 text-[color:var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}

export default AnalyticsDashboard;
