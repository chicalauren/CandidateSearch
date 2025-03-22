// imports
import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import CandidateCard from './CanidateCard';

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
    // Necessary code to fetch and display candidates
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {
        const saved = localStorage.getItem('savedCandidates');
        return saved ? JSON.parse(saved) : [];
    });

    // Fetch candidates from the API
    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const data: Candidate[] = await searchGithub();
                console.log(data); // Log data to check its structure
                setCandidates(data);
            } catch (error) {
                console.error("Error fetching candidates:", error);
            }
        };

        fetchCandidates();
    }, []);

    // Save a candidate to the savedCandidates array
    const saveCandidate = () => {
        if (currentIndex < candidates.length) {
            const candidateToSave = candidates[currentIndex];
            const updatedSavedCandidates = [...savedCandidates, candidateToSave];
            setSavedCandidates(updatedSavedCandidates);
            localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    // Move to the next candidate
    const nextCandidate = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, candidates.length - 1));
    };

    // Get the current candidate
    const currentCandidate = candidates[currentIndex];

    // Display the candidate search interface
    return (
        <div>
            <h1>Candidate Search</h1>
            {candidates.length === 0 ? (
                <p>Loading candidates...</p>
            ) : currentCandidate ? (
              // Display the CandidateCard component
              <CandidateCard
                    candidate={currentCandidate}
                    onSave={saveCandidate}
                    onNext={nextCandidate}
                />
            ) : (
                <p>No more candidates available.</p>
            )}
            {/* Display the Save Candidate and Next Candidate buttons */}
            <button 
                onClick={saveCandidate} 
                disabled={currentIndex >= candidates.length} 
            >
              {/*Save the current candidate*/}
                Save Candidate
            </button>
            {/* Move to the next candidate */}
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
