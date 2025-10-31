"use client";

import Image from "next/image";

interface TaskCardProps {
  task: {
    name: string;
    description: string;
    image?: string;
  };
  color?: "orange" | "green";
}

export default function TaskCard({ task, color = "orange" }: TaskCardProps) {
  const buttonColor =
    color === "orange"
      ? "bg-orange-400 hover:bg-orange-500"
      : "bg-emerald-500 hover:bg-emerald-600";

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-lg group transition-transform transform hover:-translate-y-1 hover:shadow-2xl">
      {/* Background Image */}{" "}
      <div className="absolute inset-0">
        <Image
          src={"/images/bg_image.jpg"}
          alt={task.name}
          fill
          className="object-cover"
        />{" "}
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors duration-300" />{" "}
      </div>
      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col justify-between h-full text-white">
        <div>
          <h3 className="text-xl font-semibold mb-2">{task.name}</h3>
          <p className="text-sm text-gray-200 line-clamp-3">
            {task.description}
          </p>
        </div>

        <button
          className={`mt-5 w-full ${buttonColor} text-white py-2 rounded-xl text-sm font-medium transition-all duration-200`}
        >
          View Details
        </button>
      </div>
    </div>
  );
}
