
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const AddQuestionForm = ({ editQuestion, onAddQuestion,onUpdateQuestion, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues:{
       title: "",
      category: "",
      difficulty: "",
      status: "Pending",
    }
  });
  
   useEffect(() => {
    if (editQuestion) {
      reset({
        id:editQuestion.id,
        title: editQuestion.title,
        category: editQuestion.category,
        difficulty: editQuestion.difficulty,
        status: editQuestion.status,
      });
    } else {
      reset({
        title: "",
        category: "",
        difficulty: "",
        status: "Pending",
      });
    }
  }, [editQuestion, reset]);


  const addFormData = (data) => {
    if(editQuestion){
      onUpdateQuestion(editQuestion.id,data)
    }else{
      onAddQuestion(data);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Add Question
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Add a question to your interview practice tracker.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(addFormData)}
        className="space-y-5"
      >
        {/* Question title */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Question Title
          </label>

          <input
            type="text"
            placeholder="e.g. Two Sum"
            {...register("title", {
              required: "Enter your question title.",
            })}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

          {errors.title && (
            <p className="mt-1 text-sm text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Category
          </label>

          <select
            defaultValue=""
            {...register("category", {
              required: "Please select a category.",
            })}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="DSA">DSA</option>
            <option value="Git-GitHub">Git-GitHub</option>
            <option value="Technical">Technical</option>
          </select>

          {errors.category && (
            <p className="mt-1 text-sm text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Difficulty */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Difficulty
          </label>

          <select
            defaultValue=""
            {...register("difficulty", {
              required: "Please select a difficulty level.",
            })}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="" disabled>
              Select difficulty
            </option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {errors.difficulty && (
            <p className="mt-1 text-sm text-red-500">
              {errors.difficulty.message}
            </p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Status
          </label>

          <select
            defaultValue="Pending"
            {...register("status", {
              required: "Please select a status.",
            })}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          {errors.status && (
            <p className="mt-1 text-sm text-red-500">
              {errors.status.message}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Add Question
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestionForm;