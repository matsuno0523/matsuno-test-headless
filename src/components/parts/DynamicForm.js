"use client";

export default function DynamicForm({ fields }) {
  // 送信処理（後でAPIを繋ぐ場所）
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(Object.fromEntries(formData));
    alert("送信しました（デモ）");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map((field) => (
        <div key={field.id} className="flex flex-col gap-2">
          <label className="font-bold flex items-center gap-2">
            {field.name}
            {field.hissu === "checked" && (
              <span className="text-red-500 text-sm">必須</span>
            )}
          </label>

          {/* type に応じた出し分け */}
          {field.type === "area" ? (
            <textarea
              name={field.id}
              rows="5"
              className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-500 outline-none"
            />
          ) : field.type === "radio" ? (
            <div className="flex flex-wrap gap-4 p-2">
              {field.value.split(/<br\s*\/?>/).map((val, idx) => (
                <label key={idx} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name={field.id} value={val.trim()} className="w-4 h-4" />
                  {val.trim()}
                </label>
              ))}
            </div>
          ) : (
            <input
              type={field.type === "Email" ? "email" : "text"}
              name={field.id}
              placeholder={field.name}
              className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-500 outline-none"
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition"
      >
        送信する
      </button>
    </form>
  );
}