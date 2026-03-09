"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, GitBranch, Github, Star, TrendingUp, Users } from "lucide-react";

interface GHRepo {
  id: number; name: string; stargazers_count: number;
  language: string | null; html_url: string; fork: boolean;
}
interface GHUser { public_repos: number; followers: number; following: number; }

const LANG_COLORS: Record<string, string> = {
  Python: "#3776ab", JavaScript: "#f7df1e", TypeScript: "#3178c6",
  Java: "#b07219", C: "#555555", HTML: "#e34c26", CSS: "#563d7c", Kotlin: "#a97bff",
};

export default function GitHubStats() {
  const [repos, setRepos] = useState<GHRepo[]>([]);
  const [user, setUser] = useState<GHUser | null>(null);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    Promise.all([
      fetch("https://api.github.com/users/pun33th45").then(r => r.json()).catch(() => null),
      fetch("https://api.github.com/users/pun33th45/repos?per_page=100&sort=updated").then(r => r.json()).catch(() => []),
    ]).then(([u, r]) => {
      if (u && !u.message) setUser(u);
      if (Array.isArray(r)) setRepos(r.filter((x: GHRepo) => !x.fork));
      setLoading(false);
    });
  }, []);

  const totalStars = repos.reduce((a, r) => a + r.stargazers_count, 0);
  const langs = repos.reduce((a: Record<string, number>, r) => {
    if (r.language) a[r.language] = (a[r.language] || 0) + 1;
    return a;
  }, {});
  const sortedLangs = Object.entries(langs).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const maxL = sortedLangs[0]?.[1] || 1;
  const topRepos = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6);

  const statCards = [
    { icon: GitBranch, label: "Public Repos", value: user?.public_repos ?? repos.length, color: "#00d4ff" },
    { icon: Star,      label: "Total Stars",  value: totalStars, color: "#f7df1e" },
    { icon: Users,     label: "Followers",    value: user?.followers ?? 0, color: "#9b5de5" },
    { icon: TrendingUp,label: "Projects",     value: "16+", color: "#00ff88" },
  ];

  return (
    <section id="github" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-15" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-neon-cyan/20" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/12 text-white/50 text-xs font-mono mb-4">
            <Github size={11} /> DEVELOPER ANALYTICS
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-black text-white mb-3">
            GitHub <span className="gradient-text">Intelligence</span>
          </h2>
          <p className="text-white/40 text-base max-w-lg mx-auto">
            Real-time open-source activity and contribution analytics
          </p>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3">
            <div className="w-8 h-8 border-2 border-neon-cyan/20 border-t-neon-cyan rounded-full animate-spin" />
            <span className="text-white/30 text-xs font-mono">Fetching GitHub data...</span>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Stat cards row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {statCards.map((s, i) => (
                <motion.div key={s.label}
                  initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.08 }}
                  className="glass rounded-2xl p-5 border border-white/8 hover:border-white/15 transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: `${s.color}12`, border: `1px solid ${s.color}25` }}>
                      <s.icon size={16} style={{ color: s.color }} />
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: s.color }} />
                  </div>
                  <div className="text-2xl font-black font-display gradient-text">{s.value}</div>
                  <div className="text-xs text-white/35 font-mono mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Main content grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left: Language + GitHub Stats card */}
              <div className="space-y-5">
                {/* GitHub readme stats image */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 }}
                  className="glass rounded-2xl border border-white/8 overflow-hidden"
                >
                  <div className="px-5 pt-4 pb-2">
                    <div className="text-xs font-mono text-white/30 tracking-wider">ACTIVITY STATS</div>
                  </div>
                  <img
                    src="https://github-readme-stats.vercel.app/api?username=pun33th45&show_icons=true&theme=transparent&bg_color=00000000&border_color=00000000&title_color=00d4ff&icon_color=9b5de5&text_color=6b7280&hide_border=true"
                    alt="GitHub activity stats for pun33th45"
                    className="w-full px-3 pb-3"
                  />
                </motion.div>

                {/* Language distribution */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 }}
                  className="glass rounded-2xl p-5 border border-white/8"
                >
                  <div className="text-xs font-mono text-white/30 tracking-wider mb-4">LANGUAGE DISTRIBUTION</div>
                  <div className="space-y-3">
                    {sortedLangs.map(([lang, count], i) => (
                      <div key={lang}>
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ background: LANG_COLORS[lang] || "#00d4ff" }} />
                            <span className="text-white/65">{lang}</span>
                          </div>
                          <span className="text-white/30 font-mono">{Math.round((count / repos.length) * 100)}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: `linear-gradient(90deg, ${LANG_COLORS[lang] || "#00d4ff"}, ${LANG_COLORS[lang] || "#00d4ff"}80)` }}
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${(count / maxL) * 100}%` } : {}}
                            transition={{ duration: 1, delay: 0.5 + i * 0.05, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right: Top repos */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.35 }}
                  className="glass rounded-2xl p-5 border border-white/8 h-full"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="text-xs font-mono text-white/30 tracking-wider">TOP REPOSITORIES</div>
                    <a href="https://github.com/pun33th45" target="_blank" rel="noopener noreferrer"
                      className="text-xs font-mono text-white/30 hover:text-neon-cyan transition-colors flex items-center gap-1">
                      View all <ExternalLink size={10} />
                    </a>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {topRepos.map((repo, i) => (
                      <motion.a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.4 + i * 0.06 }}
                        whileHover={{ y: -2 }}
                        className="block p-4 rounded-xl border border-white/8 bg-white/2 hover:bg-white/5 hover:border-neon-cyan/20 transition-all group"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-sm font-medium text-white/80 group-hover:text-neon-cyan transition-colors line-clamp-1 flex-1 mr-2">
                            {repo.name.replace(/-/g, " ").replace(/_/g, " ")}
                          </span>
                          <ExternalLink size={11} className="text-white/20 group-hover:text-white/50 transition-colors shrink-0 mt-0.5" />
                        </div>
                        <div className="flex items-center gap-3">
                          {repo.language && (
                            <div className="flex items-center gap-1.5">
                              <div className="w-2 h-2 rounded-full" style={{ background: LANG_COLORS[repo.language] || "#00d4ff" }} />
                              <span className="text-white/35 text-[10px] font-mono">{repo.language}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1 ml-auto">
                            <Star size={10} className="text-white/25" />
                            <span className="text-white/30 text-[10px] font-mono">{repo.stargazers_count}</span>
                          </div>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
