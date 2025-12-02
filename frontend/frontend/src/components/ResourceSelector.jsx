export default function ResourceSelector({
    resources = ["Table AB", "Table C", "Room BB"],
    value,
    onChange,
}) {
    return (
        <div className="p-6 bg-pink-50 shadow-lg rounded-2xl border border-pink-300">
            <label className="block text-sm font-bold text-pink-700 mb-3">
                Choose Resource
            </label>
            <select
                className="block w-full rounded-xl border-2 border-pink-400 px-4 py-3 bg-white text-pink-900 font-semibold focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300 cursor-pointer hover:bg-pink-100"
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
            >
                {resources.map((r) => (
                    <option key={r} value={r}>
                        {r}
                    </option>
                ))}
            </select>
        </div>
    );
}
