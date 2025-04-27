import React from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';

export default function TaxDeadlinesCard() {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  
  const deadlines = [
    {
      id: 1,
      name: 'PPh Final UMKM (0.3%)',
      date: `15/${currentMonth < 10 ? '0' + currentMonth : currentMonth}/${currentYear}`,
      daysDue: 15 - now.getDate(),
      status: 'upcoming'
    },
    {
      id: 2,
      name: 'PPh Pasal 21',
      date: `20/${currentMonth < 10 ? '0' + currentMonth : currentMonth}/${currentYear}`,
      daysDue: 20 - now.getDate(),
      status: 'upcoming'
    },
    {
      id: 3,
      name: 'PPN',
      date: `30/${currentMonth < 10 ? '0' + currentMonth : currentMonth}/${currentYear}`,
      daysDue: 30 - now.getDate(),
      status: 'upcoming'
    },
    {
      id: 4,
      name: 'PPh Pasal 23',
      date: `20/${currentMonth < 10 ? '0' + currentMonth : currentMonth}/${currentYear}`,
      daysDue: 20 - now.getDate(),
      status: 'upcoming'
    }
  ];
  
  // Sort deadlines by days due
  const sortedDeadlines = [...deadlines].sort((a, b) => a.daysDue - b.daysDue);
  
  return (
    <div className="card">
      <h2 className="text-lg font-medium mb-4">Batas Waktu Pajak</h2>
      <ul className="space-y-4">
        {sortedDeadlines.map((deadline) => (
          <li key={deadline.id} className="flex items-start gap-3">
            <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${
              deadline.daysDue <= 5 ? 'bg-red-500' : 'bg-yellow-500'
            }`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{deadline.name}</p>
              <div className="flex items-center mt-1">
                <ClockIcon className="mr-1 h-4 w-4 text-gray-400" />
                <p className="text-xs text-gray-500">
                  {deadline.date} ({deadline.daysDue > 0 ? `${deadline.daysDue} hari lagi` : 'Hari ini'})
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}