import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import CandidateCard from './CandidateCard'; // Fixed typo

interface Candidate {
  login: string;
  avatar_url: string;
  name: string;
  location: string;
  email: string;
  html_url: string;
  company: string;
}

const CandidateSearch: React.FC = () => {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {
        const saved = localStorage.getItem('savedCandidates');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
              const response = await fetch('https://api.github.com/users?since=83918688', {
                headers: {
                    'Authorization': `token ${import.meta.env.VITE_GITHUB_TOKEN}`, // Use import.meta.env to access the token
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
        
                const data: Candidate[] = await response.json();
                console.log(data);
                setCandidates(data);
            } catch (error) {
                console.error("Error fetching candidates:", error);
            }
        };

        fetchCandidates();
    }, []);

    const saveCandidate = () => {
        if (currentIndex < candidates.length) {
            const candidateToSave = candidates[currentIndex];
            const updatedSavedCandidates = [...savedCandidates, candidateToSave];
            setSavedCandidates(updatedSavedCandidates);
            localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));
            setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, candidates.length - 1)); // Prevent going out of bounds
            alert(`${candidateToSave.name} has been saved!`); // User feedback
        }
    };

    const nextCandidate = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, candidates.length - 1));
    };

    const currentCandidate = candidates[currentIndex];

    return (
        <div>
            <h1>Candidate Search</h1>
            {candidates.length === 0 ? (
                <p>Loading candidates...</p>
            ) : currentIndex >= candidates.length ? (
                <p>No more candidates available.</p>
            ) : (
              <CandidateCard
                    candidate={currentCandidate}
                    onSave={saveCandidate}
                    onNext={nextCandidate}
                />
            )}
            <button 
                onClick={saveCandidate} 
                disabled={currentIndex >= candidates.length} 
            >
                Save Candidate
            </button>
            <button 
                onClick={nextCandidate} 
                disabled={currentIndex >= candidates.length - 1} 
            >
                Next Candidate
            </button>
        </div>
    );
};

// Export the CandidateSearch component
export default CandidateSearch;
