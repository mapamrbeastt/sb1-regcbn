import React from 'react';
import { Gift } from 'lucide-react';

const TaskBar: React.FC = () => {
  return (
    <div className="bg-blue-700 rounded-lg p-3 flex items-center">
      <Gift className="text-yellow-400 mr-2" />
      <div className="flex-grow">
        <div className="text-white text-sm">Tareas</div>
        <div className="bg-blue-600 h-2 rounded-full mt-1">
          <div className="bg-yellow-400 h-full rounded-full" style={{ width: '60%' }}></div>
        </div>
      </div>
      <div className="text-yellow-400 font-bold ml-2">9</div>
    </div>
  );
};

export default TaskBar;