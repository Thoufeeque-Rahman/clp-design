import { Home } from "lucide-react";

interface HeaderProps {
  selectedClass?: string;
  selectedSubject?: string;
  showContext: boolean;
  onHomeClick: () => void;
}

export default function Header({ 
  selectedClass, 
  selectedSubject, 
  showContext,
  onHomeClick
}: HeaderProps) {
  return (
    <header className="bg-primary text-white p-4 shadow-md relative z-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Learning Platform</h1>
          <div className={`text-sm mt-1 transition-opacity duration-300 ${showContext ? 'opacity-100' : 'opacity-0'}`}>
            <span>{selectedClass}</span> | <span>{selectedSubject}</span>
          </div>
        </div>
        <button 
          onClick={onHomeClick} 
          className={`text-white transition-opacity duration-300 ${showContext ? 'opacity-100' : 'opacity-0'}`}
        >
          <Home className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
