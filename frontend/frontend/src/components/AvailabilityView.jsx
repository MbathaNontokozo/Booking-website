import React from "react";

export default function AvailabilityView({ slots = [], selected, onSelect }) {
  const displaySlots =
    slots.length > 0
      ? slots
      : ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

  return (
    <div className="p-6 bg-pink-50 border-2 border-pink-200 rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <label className="text-lg font-bold text-pink-600">
          Available Time Slots
        </label>
        <div className="text-sm text-pink-400 font-semibold">
          Select your preferred time
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {displaySlots.map((time) => {
          const isSelected = selected === time;
          return (
            <button
              key={time}
              className={`px-4 py-3 rounded-lg text-sm font-bold border-2 transition-all duration-200 ${
                isSelected
                  ? "bg-pink-600 text-white border-pink-700 shadow-lg scale-105"
                  : "bg-white text-pink-600 border-pink-300 hover:bg-pink-100 hover:scale-105"
              }`}
              onClick={() => onSelect && onSelect(time)}
            >
              {time}
            </button>
          );
        })}
      </div>
    </div>
  );
}
