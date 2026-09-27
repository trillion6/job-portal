import React from 'react';

const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  const skeletons = Array(count).fill(0);

  if (type === 'table') {
    return (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              {Array(4).fill(0).map((_, i) => (
                <th key={i}><div className="placeholder-glow"><span className="placeholder col-8 bg-secondary opacity-25 rounded"></span></div></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {skeletons.map((_, i) => (
              <tr key={i}>
                {Array(4).fill(0).map((_, j) => (
                  <td key={j}><div className="placeholder-glow"><span className="placeholder col-10 bg-secondary opacity-25 rounded"></span></div></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Default 'card'
  return (
    <>
      {skeletons.map((_, i) => (
        <div key={i} className="minimal-card p-4 mb-4" aria-hidden="true">
          <div className="d-flex align-items-center mb-3 placeholder-glow">
            <div className="placeholder col-1 bg-secondary opacity-25 rounded-circle me-3" style={{ width: '48px', height: '48px' }}></div>
            <div className="w-100">
              <span className="placeholder col-4 bg-secondary opacity-25 rounded d-block mb-1"></span>
              <span className="placeholder col-2 bg-secondary opacity-25 rounded d-block"></span>
            </div>
          </div>
          <div className="placeholder-glow">
            <span className="placeholder col-12 bg-secondary opacity-25 rounded d-block mb-2"></span>
            <span className="placeholder col-8 bg-secondary opacity-25 rounded d-block mb-4"></span>
            <span className="placeholder col-2 bg-secondary opacity-25 rounded py-2"></span>
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;
