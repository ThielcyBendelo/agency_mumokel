import React from 'react';

export default function ProjectCard({
  title,
  image,
  description,
  client,
  result,
  testimonial,
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <img
        src={image}
        alt={title}
        className="h-40 w-full object-cover rounded"
      />
      <h2 className="text-xl font-semibold mt-4 mb-2">{title}</h2>
      <p className="text-gray-700 mb-2">{description}</p>
      <p className="text-sm text-gray-500 mb-1">
        <strong>Client :</strong> {client}
      </p>
      <p className="text-sm text-green-600 mb-1">
        <strong>Résultat :</strong> {result}
      </p>
      <blockquote className="italic text-gray-600 border-l-4 border-blue-400 pl-2 mt-2">
        “{testimonial}”
      </blockquote>
    </div>
  );
}
