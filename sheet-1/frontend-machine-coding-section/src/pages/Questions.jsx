import { useState } from "react";
import AddQuestionForm from "../components/AddQuestionForm.jsx";
import QuestionCard from "../components/QuestionCard.jsx";
import SearchAndFilter from "../components/SearchAndFilter.jsx";

const Questions = () => {
  const [showForm, setShowForm] = useState(false);
  const [questions, setQuestions] = useState(() => {
    return JSON.parse(localStorage.getItem("questionData")) || [];
  });
  const [editQuestion, setEditQuestion] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const addQuestion = (data) => {
    const question = { id:Date.now(), ...data };
    const savedQuestions =
      JSON.parse(localStorage.getItem("questionData")) || [];
    const updatedQuestions = [...savedQuestions, question];
    setQuestions(updatedQuestions);
    localStorage.setItem("questionData", JSON.stringify(updatedQuestions));
    setShowForm(false);
  };

  const changeQuestionStatus = (id) => {
    let updateStatus = questions.map((q) => {
      return q.id === id &&
        (q.status === "Pending" || q.status === "In Progress")
        ? { ...q, status: "Completed" }
        : q;
    });
    setQuestions(updateStatus);
    localStorage.setItem("questionData", JSON.stringify(updateStatus));
  };

  const handleEdit = (item) => {
    setShowForm(true);
    setEditQuestion(item);
  };

  const updateQuestion = (id, data) => {
    const updatedQuestions = questions.map((q) =>
      q.id === id ? { ...q, ...data } : q,
    );
    setQuestions(updatedQuestions);
    localStorage.setItem("questionData", JSON.stringify(updatedQuestions));
    setShowForm(false);
    setEditQuestion(null);
  };

  const handleDelete = (id) => {
    let deleteQuestion = questions.filter((q) => q.id !== id);
    setQuestions(deleteQuestion);
    localStorage.setItem("questionData", JSON.stringify(deleteQuestion));
  };

 const filteredQuestions = questions.filter((q) => {
  const title = (q.title || "").toLowerCase();
  const searchText = search.trim().toLowerCase();
  
  return (
    title.includes(searchText) &&
    (category === "" || q.category === category) &&
    (status === "" || q.status === status) &&
    (difficulty === "" || q.difficulty === difficulty)
  );
});

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setStatus("");
    setDifficulty("");
  };

  return (
    <div className="w-full min-w-0">
      {/* add question button */}
      <button
        onClick={() => setShowForm(true)}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-white mb-4"
      >
        {" "}
        + Add Question
      </button>
      {/* search and filter */}
      <SearchAndFilter
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        status={status}
        setStatus={setStatus}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        clearFilters={clearFilters}
      />
      {/* add question form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <AddQuestionForm
              editQuestion={editQuestion}
              onAddQuestion={addQuestion}
              onUpdateQuestion={updateQuestion}
              onCancel={() => {
                setShowForm(false);
                setEditQuestion(null);
              }}
            />
          </div>
        </div>
      )}

      {/* question card */}
      <p className="text-sm text-slate-500">
        Showing {filteredQuestions.length} questions
      </p>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((item) => (
            <QuestionCard
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={changeQuestionStatus}
            />
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center xl:col-span-2">
            <p className="font-medium text-slate-700">No questions found</p>
            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;
