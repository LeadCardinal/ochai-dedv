import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  TrendingUp,
  Search,
  MousePointer,
  Eye,
  Trophy,
  Zap,
  BarChart3,
  Server,
  DollarSign,
  ShieldCheck,
  Clock,
  Activity,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";

const CaseStudyHsvDrone = () => {
  // Data for HSV Drone - Short timeline, immediate success
  const hsvData = [
    { month: "Nov 25", clicks: 0, impressions: 0, position: 50 }, // Pre-launch/indexing
    { month: "Dec 1", clicks: 2, impressions: 50, position: 45 },
    { month: "Dec 15", clicks: 5, impressions: 200, position: 15 },
    { month: "Dec 30", clicks: 8, impressions: 450, position: 9.0 },
    { month: "Jan 26", clicks: 12, impressions: 800, position: 9.0 },
  ];

  // Comparison Data (Bonsai vs HSV)
  const bonsaiData = [
    { label: "Jan", value: 32.0 },
    { label: "Mar", value: 29.8 },
    { label: "May", value: 30.5 },
    { label: "Jul", value: 36.4 },
    { label: "Sep", value: 37.1 },
    { label: "Nov", value: 21.3 },
    { label: "Jan", value: 22.1 },
  ];

  const hsvComparisonData = [
    { label: "Nov", value: 50 },
    { label: "Dec", value: 9.0 },
    { label: "Jan", value: 9.0 },
  ];

  // Raw Hourly Data from User (Meta Conversions API)
  const rawHourlyData = [
    { ts: "12/9 18:00", val: 54 },
    { ts: "12/9 20:00", val: 18 },
    { ts: "12/10 7:00", val: 9 },
    { ts: "12/10 18:00", val: 9 },
    { ts: "12/10 19:00", val: 27 },
    { ts: "12/10 21:00", val: 40 },
    { ts: "12/10 22:00", val: 18 },
    { ts: "12/11 0:00", val: 9 },
    { ts: "12/11 3:00", val: 36 },
    { ts: "12/11 5:00", val: 9 },
    { ts: "12/11 17:00", val: 9 },
    { ts: "12/12 17:00", val: 9 },
    { ts: "12/13 22:00", val: 9 },
    { ts: "12/14 23:00", val: 18 },
    { ts: "12/15 0:00", val: 18 },
    { ts: "12/15 19:00", val: 18 },
    { ts: "12/15 20:00", val: 17 },
    { ts: "12/16 11:00", val: 9 },
    { ts: "12/16 12:00", val: 9 },
    { ts: "12/16 18:00", val: 9 },
    { ts: "12/17 20:00", val: 17 },
    { ts: "12/18 5:00", val: 109 }, // PEAK
    { ts: "12/19 0:00", val: 9 },
    { ts: "12/21 16:00", val: 9 },
    { ts: "12/22 13:00", val: 36 },
    { ts: "12/22 17:00", val: 36 },
    { ts: "12/23 3:00", val: 9 },
    { ts: "12/24 7:00", val: 27 },
    { ts: "12/24 10:00", val: 27 },
    { ts: "12/24 11:00", val: 9 },
    { ts: "12/25 11:00", val: 9 },
    { ts: "12/25 13:00", val: 9 },
    { ts: "12/25 14:00", val: 27 },
    { ts: "12/26 21:00", val: 9 },
    { ts: "12/26 23:00", val: 9 },
    { ts: "12/27 23:00", val: 10 },
    { ts: "12/29 20:00", val: 9 },
    { ts: "12/30 1:00", val: 9 },
    { ts: "12/30 9:00", val: 36 },
    { ts: "12/30 11:00", val: 28 },
    { ts: "12/30 18:00", val: 27 },
    { ts: "12/31 21:00", val: 27 },
    { ts: "1/1 14:00", val: 27 },
    { ts: "1/1 20:00", val: 9 },
    { ts: "1/3 1:00", val: 18 },
    { ts: "1/3 4:00", val: 9 },
    { ts: "1/3 13:00", val: 19 },
    { ts: "1/4 2:00", val: 9 },
    { ts: "1/4 20:00", val: 9 },
    { ts: "1/5 1:00", val: 18 },
    { ts: "1/5 3:00", val: 18 },
    { ts: "1/5 5:00", val: 27 },
    { ts: "1/5 6:00", val: 27 },
    { ts: "1/5 8:00", val: 9 },
    { ts: "1/6 11:00", val: 36 },
    { ts: "1/6 14:00", val: 27 },
  ];

  // Aggregated Daily Data for Visualization
  const analyticsData = [
    { date: "12/9", volume: 72 },
    { date: "12/10", volume: 103 },
    { date: "12/11", volume: 54 },
    { date: "12/12", volume: 9 },
    { date: "12/13", volume: 9 },
    { date: "12/14", volume: 18 },
    { date: "12/15", volume: 53 },
    { date: "12/16", volume: 27 },
    { date: "12/17", volume: 17 },
    { date: "12/18", volume: 109 }, // Peak
    { date: "12/19", volume: 9 },
    { date: "12/21", volume: 9 },
    { date: "12/22", volume: 72 },
    { date: "12/23", volume: 9 },
    { date: "12/24", volume: 63 },
    { date: "12/25", volume: 45 },
    { date: "12/26", volume: 18 },
    { date: "12/27", volume: 10 },
    { date: "12/29", volume: 9 },
    { date: "12/30", volume: 100 },
    { date: "12/31", volume: 27 },
    { date: "1/1", volume: 36 },
    { date: "1/3", volume: 46 },
    { date: "1/4", volume: 18 },
    { date: "1/5", volume: 99 },
    { date: "1/6", volume: 63 },
  ];

  // Heatmap Aggregation (Hour of day vs Event Count)
  const hourlyDistribution = Array(24).fill(0);
  rawHourlyData.forEach((item) => {
    const hour = parseInt(item.ts.split(" ")[1].split(":")[0]);
    hourlyDistribution[hour] += item.val;
  });

  const metrics = [
    {
      label: "Best Position",
      value: "9.0",
      icon: Trophy,
      color: "text-yellow-400",
    },
    {
      label: "Avg Position",
      value: "9.0",
      icon: Search,
      color: "text-blue-400",
    },
    {
      label: "Total Impressions",
      value: "1.5k+",
      icon: Eye,
      color: "text-indigo-400",
    },
    {
      label: "Time to Rank",
      value: "<30 Days",
      icon: Zap,
      color: "text-emerald-400",
    },
  ];

  return (
    <div className="pt-24 pb-12 min-h-screen bg-slate-950 text-white">
      <Helmet>
        <title>Case Study: hsvdrone.com SEO | Page 1 Rankings in 30 Days</title>
        <meta
          name="description"
          content="SEO case study for hsvdrone.com showcasing rapid growth to Google Page 1 rankings (Position 9.0) in less than 30 days."
        />
      </Helmet>

      <div className="container mx-auto px-4">
        {/* Navigation */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Portfolio
          </Link>
        </div>

        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
                hsvdrone.com
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl">
                Rapid-Rank Strategy: Achieving Page 1 Dominance in &lt;30 Days
              </p>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
              <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium text-yellow-400">
                High Velocity SEO
              </span>
            </div>
          </div>

          {/* Achievement Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-2xl p-8 mb-8 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              🚀 Primary Achievement: Page 1 Rankings
            </h2>
            <p className="text-emerald-400 font-medium">
              Top 10 Google Search Results Secured in Record Time
            </p>
          </motion.div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group"
                >
                  <div
                    className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${metric.color}`}
                  >
                    <Icon className="w-16 h-16" />
                  </div>
                  <div className="flex items-center gap-3 mb-2 relative z-10">
                    <div
                      className={`p-2 rounded-lg bg-slate-800 ${metric.color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-slate-400 text-sm font-medium">
                      {metric.label}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-white relative z-10">
                    {metric.value}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </header>

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <ChartCard
            title="Search Position Performance"
            subtitle="Stabilized at Position 9.0 (Page 1)"
            color="blue"
          >
            <div className="h-80">
              <ResponsiveLineChart
                data={hsvData}
                dataKey="position"
                color="#3b82f6"
                maxY={50}
                fill="rgba(59, 130, 246, 0.2)"
                reversed={true} // Lower is better for rank
                targetLine={10}
              />
            </div>
          </ChartCard>

          <div className="space-y-8">
            <ChartCard
              title="Page Ranking Breakdown"
              subtitle="100% Page 1 Dominance for Target Keywords"
              color="emerald"
            >
              <div className="h-full flex items-center justify-center">
                <div className="w-full space-y-4 px-4">
                  <div className="flex items-center gap-4">
                    <span className="w-24 text-sm text-slate-400">
                      Page 1 (Top 10)
                    </span>
                    <div className="flex-1 h-8 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-emerald-500 relative"
                      >
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-900">
                          100%
                        </span>
                      </motion.div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 opacity-50">
                    <span className="w-24 text-sm text-slate-400">Page 2</span>
                    <div className="flex-1 h-8 bg-slate-800 rounded-full"></div>
                  </div>
                  <div className="flex items-center gap-4 opacity-50">
                    <span className="w-24 text-sm text-slate-400">Page 3+</span>
                    <div className="flex-1 h-8 bg-slate-800 rounded-full"></div>
                  </div>
                </div>
              </div>
            </ChartCard>
          </div>
        </div>

        {/* Comparison Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-16"
        >
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Performance Comparison
              </h3>
              <p className="text-slate-400">
                Organic Growth (Bonsai) vs. Rapid Deployment (HSV Drone)
              </p>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                <span className="text-slate-300">reallivebonsai.us</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span className="text-slate-300">hsvdrone.com</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 h-[300px]">
            {/* Left: Bonsai */}
            <div className="relative border border-slate-800 bg-slate-950/50 rounded-xl p-4">
              <div className="absolute top-4 left-4 text-xs font-bold text-indigo-400">
                reallivebonsai.us
              </div>
              <ResponsiveSimpleLine
                data={bonsaiData}
                color="#6366f1"
                maxY={50}
                reversed
              />
              <div className="absolute bottom-4 right-4 text-xs text-slate-400">
                Avg Pos: 30.2
              </div>
            </div>

            {/* Right: HSV */}
            <div className="relative border border-slate-800 bg-slate-950/50 rounded-xl p-4">
              <div className="absolute top-4 left-4 text-xs font-bold text-blue-400">
                hsvdrone.com
              </div>
              <ResponsiveSimpleLine
                data={hsvComparisonData}
                color="#3b82f6"
                maxY={50}
                reversed
              />
              <div className="absolute bottom-4 right-4 text-xs text-slate-400">
                Avg Pos: 9.0
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// --- Reused/Simplified Chart Components ---

const ChartCard = ({ title, subtitle, children, color }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col h-[350px]"
  >
    <div className="mb-4">
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <div className={`text-sm font-medium text-${color}-400`}>{subtitle}</div>
    </div>
    <div className="flex-grow relative w-full">{children}</div>
  </motion.div>
);

const ResponsiveLineChart = ({
  data,
  dataKey,
  color,
  maxY,
  fill,
  targetLine,
  reversed = false,
}) => {
  return (
    <svg
      className="w-full h-full overflow-hidden"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <title>Line chart showing search position performance over time</title>
      {[0, 25, 50, 75, 100].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="100"
          y2={y}
          stroke="#334155"
          strokeWidth="0.5"
          strokeDasharray="2"
          opacity="0.5"
        />
      ))}

      {targetLine && (
        <g>
          <line
            x1="0"
            y1={
              reversed
                ? (targetLine / maxY) * 100
                : 100 - (targetLine / maxY) * 100
            }
            x2="100"
            y2={
              reversed
                ? (targetLine / maxY) * 100
                : 100 - (targetLine / maxY) * 100
            }
            stroke="#10b981"
            strokeWidth="1"
            strokeDasharray="4"
          />
          <text
            x="2"
            y={
              (reversed
                ? (targetLine / maxY) * 100
                : 100 - (targetLine / maxY) * 100) - 2
            }
            fontSize="4"
            fill="#10b981"
          >
            Page 1 Threshold
          </text>
        </g>
      )}

      <motion.path
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        d={(() => {
          let d = "";
          data.forEach((p, i) => {
            const x = (i / (data.length - 1)) * 100;
            let val = p[dataKey];
            if (reversed) val = maxY - val;
            const y = reversed ? (val / maxY) * 100 : 100 - (val / maxY) * 100;
            d += `${i === 0 ? "M" : "L"} ${x} ${y} `;
          });
          d += `L 100 ${reversed ? 0 : 100} L 0 ${reversed ? 0 : 100} Z`;
          return d;
        })()}
        fill={fill}
      />

      <motion.path
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        d={(() => {
          let d = "";
          data.forEach((p, i) => {
            const x = (i / (data.length - 1)) * 100;
            let val = p[dataKey];
            if (reversed) val = maxY - val;
            const y = reversed ? (val / maxY) * 100 : 100 - (val / maxY) * 100;
            d += `${i === 0 ? "M" : "L"} ${x} ${y} `;
          });
          return d;
        })()}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {data.map((p, i) => {
        const x = (i / (data.length - 1)) * 100;
        let val = p[dataKey];
        if (reversed) val = maxY - val;
        const y = reversed ? (val / maxY) * 100 : 100 - (val / maxY) * 100;
        return <circle key={i} cx={x} cy={y} r="2" fill={color} />;
      })}
    </svg>
  );
};

const ResponsiveSimpleLine = ({ data, color, maxY, reversed }) => (
  <svg
    className="w-full h-full overflow-hidden"
    preserveAspectRatio="none"
    viewBox="0 0 100 100"
  >
    <title>Simplified line chart comparing website performance metrics</title>
    <motion.path
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5 }}
      d={(() => {
        let d = "";
        data.forEach((p, i) => {
          const x = (i / (data.length - 1)) * 100;
          let val = p.value;
          const y = (val / maxY) * 100;
          d += `${i === 0 ? "M" : "L"} ${x} ${y} `;
        });
        return d;
      })()}
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {data.map((p, i) => (
      <circle
        key={i}
        cx={(i / (data.length - 1)) * 100}
        cy={(p.value / maxY) * 100}
        r="2"
        fill={color}
      />
    ))}
  </svg>
);

const ResponsiveBarChart = ({ data, dataKey, color }) => {
  const maxVal = Math.max(...data.map((d) => d[dataKey]));
  return (
    <svg
      className="w-full h-full overflow-hidden"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <title>Bar chart displaying data distribution</title>
      {/* Bars */}
      {data.map((d, i) => {
        const barWidth = 80 / data.length;
        const x = (i / data.length) * 100 + 10 / data.length;
        const height = (d[dataKey] / maxVal) * 100;
        const y = 100 - height;

        return (
          <motion.rect
            key={i}
            initial={{ height: 0, y: 100 }}
            whileInView={{ height: `${height}%`, y: `${y}%` }}
            transition={{ duration: 0.5, delay: i * 0.02 }}
            x={`${x}%`}
            y={`${y}%`}
            width={`${barWidth}%`}
            height={`${height}%`}
            fill={color}
            rx="1"
            opacity={0.8}
            className="hover:opacity-100 transition-opacity"
          />
        );
      })}

      {/* Max label */}
      <text x="0" y="5" fill="#94a3b8" fontSize="4">
        Peak: {maxVal}
      </text>
    </svg>
  );
};

export default CaseStudyHsvDrone;
