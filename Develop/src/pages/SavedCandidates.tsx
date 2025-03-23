// imports
import React, {useState, useEffect} from 'react';
import {Candidate} from '../interfaces/Candidate.interface';

// Define the SavedCandidates component
const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Define the rejectCandidate function.
    const rejectCandidate = (event: React.MouseEvent<HTMLButtonElement>) => {
        const index = parseInt(event.currentTarget.parentElement?.parentElement?.id || '');
        const updatedSavedCandidates = [...savedCandidates];
        updatedSavedCandidates.splice(index, 1);
        setSavedCandidates(updatedSavedCandidates);
        localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));
    };

  // Load saved candidates from local storage
  useEffect(() => {
      const candidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      setSavedCandidates(candidates);
  }, []);

  // Display the saved candidates
  return (
      <div>
          <h1>Potential Candidates</h1>
          {savedCandidates.length > 0 ? (
            // begin table
              <table className="table">
                {/* begin table head */}
                <thead>
                    <tr>
                        <th scope='col'>Image</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Location</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Company</th>
                        <th scope='col'>Bio</th>
                        <th scope='col'>Reject</th>
                    </tr>
                </thead>

                <tbody>
                  {savedCandidates.map((candidate, index) => (
                      // begin table row
                      <tr key={index}>
                            <td><center><img src={candidate.avatar_url} alt="" /></center></td>
                            <td><center>{candidate.name || "N/A"} ({candidate.login})</center></td>
                            <td><center>{candidate.location || "N/A"}</center></td>
                            <td><center>{candidate.email || "N/A"}</center></td>
                            <td><center>{candidate.company || "N/A"}</center></td>
                            <td><center>{candidate.bio || "N/A"}</center></td>
                            <td><center><button 
                            onClick={rejectCandidate}
                            type="button" className="btn btn-danger">X</button></center></td>
                        </tr>
                  ))}
                </tbody>
              </table>
          ) : (
              <p>No potential candidates have been saved.</p>
          )}
      </div>
  );
};

// Export the SavedCandidates component
export default SavedCandidates;
