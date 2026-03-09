"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, GitBranch, Github, Star, TrendingUp, Users } from "lucide-react";
import Image from "next/image"; // ✅ moved here

interface GHRepo {
  id: number;
  name: string;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  fork: boolean;
}

interface GHUser {
  public_repos: number;
  followers: number;
  following: number;
}

const LANG_COLORS: Record<string, string> = {
  Python: "#3776ab",
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Java: "#b07219",
  C: "#555555",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Kotlin: "#a97bff",
};

export default function GitHubStats() {
  const [repos, setRepos] = useState<GHRepo[]>([]);
  const [user, setUser] = useState<GHUser | null>(null);
  const [loading, setLoading] = useState(true);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // ✅ GitHub stats image URL
  const githubStatsUrl =
    "https://github-readme-stats.vercel.app/api?username=pun33th45&show_icons=true&theme=tokyonight";

  useEffect(() => {
    Promise.all([
      fetch("https://api.github.com/users/pun33th45")
        .then((r) => r.json())
        .catch(() => null),
      fetch("https://api.github.com/users/pun33th45/repos?per_page=100&sort=updated")
        .then((r) => r.json())
        .catch(() => []),
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

  const sortedLangs = Object.entries(langs)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const maxL = sortedLangs[0]?.[1] || 1;

  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);

  const statCards = [
    { icon: GitBranch, label: "Public Repos", value: user?.public_repos ?? repos.length, color: "#00d4ff" },
    { icon: Star, label: "Total Stars", value: totalStars, color: "#f7df1e" },
    { icon: Users, label: "Followers", value: user?.followers ?? 0, color: "#9b5de5" },
    { icon: TrendingUp, label: "Projects", value: "16+", color: "#00ff88" },
  ];

  return (
    <section id="github" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-15" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-neon-cyan/20" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
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

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {statCards.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.08 }}
                  className="glass rounded-2xl p-5 border border-white/8 hover:border-white/15 transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: `${s.color}12`, border: `1px solid ${s.color}25` }}
                    >
                      <s.icon size={16} style={{ color: s.color }} />
                    </div>
                  </div>

                  <div className="text-2xl font-black font-display gradient-text">
                    {s.value}
                  </div>

                  <div className="text-xs text-white/35 font-mono mt-1">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* GitHub Stats Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="glass rounded-2xl border border-white/8 overflow-hidden p-4"
            >
              <div className="text-xs font-mono text-white/30 mb-3">
                ACTIVITY STATS
              </div>

              <Image
                src={githubStatsUrl}
                alt="GitHub Stats"
                width={500}
                height={300}
              />
            </motion.div>

          </div>
        )}
      </div>
    </section>
  );
}