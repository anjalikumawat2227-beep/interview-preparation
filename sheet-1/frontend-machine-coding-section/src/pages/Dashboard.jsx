
import { useState } from "react";

const Dashboard = () => {
   const [questions] = useState(() => {
    return JSON.parse(localStorage.getItem("questionData")) || [];
  });

  const totalQuestions = questions.length;

  const completedQuestions = questions.filter(
    (q) => q.status === "Completed"
  ).length;

  const overallProgress =
    totalQuestions > 0
      ? Math.round((completedQuestions / totalQuestions) * 100)
      : 0;

  const categories = [
    {
      name: "DSA",
      description: "Problem solving",
      color: "bg-violet-500",
      light: "bg-violet-50",
      text: "text-violet-600",
      icon: "🧩",
    },
    {
      name: "Interview",
      description: "Interview preparation",
      color: "bg-blue-500",
      light: "bg-blue-50",
      text: "text-blue-600",
      icon: "💬",
    },
    {
      name: "Technical",
      description: "Technical concepts",
      color: "bg-emerald-500",
      light: "bg-emerald-50",
      text: "text-emerald-600",
      icon: "💻",
    },
  ];

  const categoryStats = categories.map((category) => {
    const categoryQuestions = questions.filter(
      (q) => q.category === category.name
    );

    const completed = categoryQuestions.filter(
      (q) => q.status === "Completed"
    ).length;

    const total = categoryQuestions.length;

    const progress =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      ...category,
      total,
      completed,
      progress,
    };
  });

  const summaryCards = [
    {
      title: "Total Questions",
      value: totalQuestions,
      icon: "📚",
      style: "bg-indigo-50 text-indigo-600",
      note: "Across all categories",
    },
    {
      title: "Completed DSA",
      value: categoryStats[0].completed,
      icon: "🧩",
      style: "bg-violet-50 text-violet-600",
      note: `${categoryStats[0].total} total DSA problems`,
    },
    {
      title: "Completed Interview",
      value: categoryStats[1].completed,
      icon: "💬",
      style: "bg-blue-50 text-blue-600",
      note: `${categoryStats[1].total} total questions`,
    },
    {
      title: "Completed Technical",
      value: categoryStats[2].completed,
      icon: "💻",
      style: "bg-emerald-50 text-emerald-600",
      note: `${categoryStats[2].total} total questions`,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 pb-4">

      {/* Heading */}
      <div>
        <p className="text-sm font-medium text-indigo-600">
          YOUR LEARNING OVERVIEW
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-800 sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Track your interview preparation and progress.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-slate-500">
                {card.title}
              </p>
              <span className={`rounded-xl p-3 text-xl ${card.style}`}>
                {card.icon}
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-bold text-slate-800">
              {card.value}
            </h2>

            <p className="mt-2 text-xs text-slate-500">
              {card.note}
            </p>
          </div>
        ))}
      </div>
        {/* Remaining Questions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            title: "Pending",
            status: "Pending",
            color: "text-amber-600",
            bg: "bg-amber-50",
          },
          {
            title: "In Progress",
            status: "In Progress",
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            title: "Completed",
            status: "Completed",
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
        ].map((item) => {
          const count = questions.filter(
            (q) => q.status === item.status
          ).length;

          return (
            <div
              key={item.status}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className={`rounded-xl p-3 ${item.bg}`}>
                <span className={`text-xl font-bold ${item.color}`}>
                  {count}
                </span>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500">
                  Questions
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall Progress */}
      <section className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-5 text-white shadow-sm sm:p-7">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-indigo-100">
              OVERALL COMPLETION
            </p>

            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              {overallProgress}%
            </h2>

            <p className="mt-2 text-sm text-indigo-100">
              {completedQuestions} of {totalQuestions} questions completed
            </p>
          </div>

          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-white/30 bg-white/10 sm:h-28 sm:w-28">
            <div className="text-center">
              <p className="text-2xl font-bold">
                {overallProgress}%
              </p>
              <p className="text-xs text-indigo-100">Progress</p>
            </div>
          </div>
        </div>

        <div
          className="mt-6 h-3 overflow-hidden rounded-full bg-white/20"
          role="progressbar"
          aria-label="Overall completion"
          aria-valuenow={overallProgress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-white transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </section>

    

    </div>
  );
};

export default Dashboard;