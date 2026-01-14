import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSRS } from './useSRS';
import ThemeToggle from '../../components/ThemeToggle';

function SRSDashboard() {
    const {
        stats,
        getDueCards,
        getDeckProgress,
        cards,
        addCard,
        createCard
    } = useSRS();

    const dueCards = getDueCards();
    const progress = getDeckProgress();
    const totalCards = cards.length;

    const handleAddSampleCards = () => {
        const samples = [
            createCard(
                'What is the time complexity of binary search?',
                'O(log n) - halves search space each iteration',
                { tags: ['algorithms'], type: 'basic' }
            ),
            createCard(
                'What is a closure in JavaScript?',
                'Function with access to outer scope variables after outer function returns',
                { tags: ['javascript'], type: 'basic' }
            ),
            createCard(
                'What does DRY stand for?',
                'Don\'t Repeat Yourself - avoid code duplication',
                { tags: ['principles'], type: 'basic' }
            ),
            createCard(
                'What is the difference between stack and heap memory?',
                'Stack: automatic, small, fast. Heap: manual, large, slower.',
                { tags: ['memory'], type: 'basic' }
            ),
        ];
        samples.forEach(card => addCard(card));
    };

    return (
        <div className="min-h-screen bg-[color:var(--color-bg-primary)]">
            {/* Header */}
            <header className="border-b border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)]">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
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
                                <span className="text-2xl">🧠</span>
                                Spaced Repetition
                            </h1>
                            <p className="text-sm text-[color:var(--color-text-muted)]">
                                Learn smarter with science-backed review schedules
                            </p>
                        </div>
                    </div>
                    <ThemeToggle />
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Total Cards', value: totalCards, icon: '📚', color: 'text-blue-400' },
                        { label: 'Due Today', value: dueCards.length, icon: '📅', color: 'text-orange-400' },
                        { label: 'Current Streak', value: `${stats.currentStreak}d`, icon: '🔥', color: 'text-red-400' },
                        { label: 'Reviewed Today', value: stats.cardsReviewedToday, icon: '✅', color: 'text-green-400' },
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

                {/* Start Review CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8 p-8 rounded-2xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-primary-500/20 text-center"
                >
                    <h2 className="text-2xl font-bold mb-2">
                        {dueCards.length > 0
                            ? `${dueCards.length} cards ready for review`
                            : 'No cards due right now'}
                    </h2>
                    <p className="text-[color:var(--color-text-muted)] mb-6">
                        {dueCards.length > 0
                            ? 'Keep your streak alive! Review now for optimal retention.'
                            : 'Add some cards or wait for your next review session.'}
                    </p>

                    <div className="flex justify-center gap-4">
                        <Link
                            to="/srs/review"
                            className={`px-6 py-3 rounded-xl font-medium transition-all ${dueCards.length > 0
                                    ? 'bg-primary-500 hover:bg-primary-600 text-white'
                                    : 'bg-[color:var(--color-bg-muted)] text-[color:var(--color-text-muted)] cursor-not-allowed'
                                }`}
                        >
                            Start Review
                        </Link>

                        {totalCards === 0 && (
                            <button
                                onClick={handleAddSampleCards}
                                className="px-6 py-3 rounded-xl font-medium bg-secondary-500 hover:bg-secondary-600 text-white transition-all"
                            >
                                Add Sample Cards
                            </button>
                        )}
                    </div>
                </motion.div>

                {/* Deck Progress */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Deck Progress</h3>
                    <div className="grid grid-cols-4 gap-4">
                        {[
                            { label: 'New', count: progress.new, color: 'bg-blue-500' },
                            { label: 'Learning', count: progress.learning, color: 'bg-orange-500' },
                            { label: 'Review', count: progress.review, color: 'bg-green-500' },
                            { label: 'Mastered', count: progress.mastered, color: 'bg-violet-500' },
                        ].map(item => (
                            <div
                                key={item.label}
                                className="p-4 rounded-xl bg-[color:var(--color-bg-secondary)] border border-[color:var(--color-border)]"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                                    <span className="text-sm">{item.label}</span>
                                </div>
                                <div className="text-xl font-bold">{item.count}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* How It Works */}
                <div className="p-6 rounded-xl bg-[color:var(--color-bg-secondary)] border border-[color:var(--color-border)]">
                    <h3 className="text-lg font-semibold mb-4">How Spaced Repetition Works</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="flex gap-3">
                            <div className="text-2xl">1️⃣</div>
                            <div>
                                <div className="font-medium mb-1">Review Cards</div>
                                <div className="text-sm text-[color:var(--color-text-muted)]">
                                    Rate how well you remembered each card
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="text-2xl">2️⃣</div>
                            <div>
                                <div className="font-medium mb-1">SM-2 Algorithm</div>
                                <div className="text-sm text-[color:var(--color-text-muted)]">
                                    Cards are scheduled at optimal intervals
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="text-2xl">3️⃣</div>
                            <div>
                                <div className="font-medium mb-1">Long-term Memory</div>
                                <div className="text-sm text-[color:var(--color-text-muted)]">
                                    Move concepts from short to long-term memory
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default SRSDashboard;
