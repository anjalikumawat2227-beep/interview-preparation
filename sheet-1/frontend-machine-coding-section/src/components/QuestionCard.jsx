
const QuestionCard = ({ item, onStatusChange, onEdit, onDelete }) => {
  const statusStyles = {
    Pending: "bg-amber-100 text-amber-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Completed: "bg-emerald-100 text-emerald-700",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition hover:shadow-md sm:p-6">
      {/* Card Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-bold capitalize text-slate-800">
            {item.title}
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            ID: {item.id}
          </p>
        </div>

        <span
          className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${
            statusStyles[item.status] ||
            "bg-slate-100 text-slate-600"
          }`}
        >
          {item.status}
        </span>
      </div>

      {/* Question Details */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-500">
            Category
          </p>
          <p className="mt-1 font-semibold text-slate-800">
            {item.category}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-500">
            Difficulty
          </p>
          <p className="mt-1 font-semibold text-slate-800">
            {item.difficulty}
          </p>
        </div>
      </div>

      {/* Card Actions */}
      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={() => onEdit(item)}
          className="rounded-lg border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(item.id)}
          className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
        >
          Delete
        </button>

       <button
  type="button"
  onClick={() => onStatusChange(item.id)}
  disabled={item.status === "Completed"}
  className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
>
  {item.status === "Completed"
    ? "Completed"
    : "Mark as Completed"}
</button>
      </div>
    </div>
  );
};

export default QuestionCard;