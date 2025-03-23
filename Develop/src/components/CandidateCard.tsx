// import
import { FunctionComponent } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

// Define the CandidateCardProps interface
interface CandidateCardProps {
  candidate: Candidate;
   
}

// Define the CandidateCard component
const CandidateCard: FunctionComponent<CandidateCardProps> = ({ candidate }) => {
  return (
    <div className="candidate-card">
      <img 
        src={candidate.avatar_url} 
        alt={`${candidate.login}'s avatar`} 
        className="rounded" 
      />
      <h2>{candidate.name || candidate.login}</h2>
      <p><strong>Location:</strong> {candidate.location || 'N/A'}</p>
      <p><strong>Email:</strong> {candidate.email || 'N/A'}</p>
      <p><strong>Company:</strong> {candidate.company || 'N/A'}</p>
      <p><strong>Bio:</strong> {candidate.bio}</p>
      <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">View Profile</a>
    </div>
  );
};

// Export the CandidateCard component
export default CandidateCard;