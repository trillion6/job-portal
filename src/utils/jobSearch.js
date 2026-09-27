export const filterJobs = (jobs, filters, searchTerm, searchLocation) => {
  let results = [...jobs];

  // 1. Only show Active and Approved jobs (for public view)
  results = results.filter(job => job.status === 'Active' && job.moderationStatus === 'Approved');

  // 2. Search Keyword (Title, Company, Skills, Description)
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    results = results.filter(job => 
      job.title.toLowerCase().includes(term) ||
      job.company.toLowerCase().includes(term) ||
      (job.skills && job.skills.some(s => s.toLowerCase().includes(term))) ||
      (job.description && job.description.toLowerCase().includes(term))
    );
  }

  // 3. Search Location
  if (searchLocation) {
    const loc = searchLocation.toLowerCase();
    results = results.filter(job => 
      job.location.toLowerCase().includes(loc) ||
      (loc === 'remote' && job.remote)
    );
  }

  // 4. Panel Filters
  if (filters.location && filters.location.length > 0 && !filters.location.includes('All')) {
    results = results.filter(job => 
      filters.location.includes(job.location) || 
      (filters.location.includes('Remote') && job.remote)
    );
  }

  if (filters.jobType && filters.jobType.length > 0 && !filters.jobType.includes('All')) {
    results = results.filter(job => filters.jobType.includes(job.jobType));
  }

  if (filters.experience && filters.experience.length > 0 && !filters.experience.includes('All')) {
    results = results.filter(job => filters.experience.includes(job.experience));
  }

  if (filters.category && filters.category.length > 0 && !filters.category.includes('All')) {
    results = results.filter(job => filters.category.includes(job.category));
  }
  
  if (filters.workMode && filters.workMode.length > 0 && !filters.workMode.includes('All')) {
    results = results.filter(job => {
      if (filters.workMode.includes('Remote') && job.remote) return true;
      if (filters.workMode.includes('On-site') && !job.remote) return true;
      return false;
    });
  }

  if (filters.salary && filters.salary.length > 0 && !filters.salary.includes('All')) {
    results = results.filter(job => {
      // Very simple string matching for demo purposes
      return filters.salary.some(sal => {
        if (sal === '0-5 LPA') return job.salary.includes('2-4') || job.salary.includes('3-5') || job.salary.includes('4-6') || job.salary.includes('4-7');
        if (sal === '5-10 LPA') return job.salary.includes('5-8') || job.salary.includes('6-9') || job.salary.includes('6-10') || job.salary.includes('8-12') || job.salary.includes('5-10');
        if (sal === '10-15 LPA') return job.salary.includes('10-15') || job.salary.includes('12-18') || job.salary.includes('8-14');
        if (sal === '15+ LPA') return job.salary.includes('15-20') || job.salary.includes('18-25') || job.salary.includes('25-35') || job.salary.includes('15-22') || job.salary.includes('16-24') || job.salary.includes('20-30');
        return true;
      });
    });
  }

  // Score relevance for 'relevance' sort if searchTerm is present
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    results.forEach(job => {
      let score = 0;
      if (job.title.toLowerCase() === term) score += 100;
      else if (job.title.toLowerCase().includes(term)) score += 50;
      
      if (job.company.toLowerCase() === term) score += 40;
      else if (job.company.toLowerCase().includes(term)) score += 20;
      
      if (job.skills && job.skills.some(s => s.toLowerCase() === term)) score += 30;
      else if (job.skills && job.skills.some(s => s.toLowerCase().includes(term))) score += 15;
      
      job._relevanceScore = score;
    });
  }

  return results;
};

export const sortJobs = (jobs, sortOption, searchTerm) => {
  const results = [...jobs];
  
  switch (sortOption) {
    case 'newest':
      results.sort((a, b) => {
        const timeA = a.postedDate.includes('now') ? 0 : a.postedDate.includes('hour') ? 1 : a.postedDate.includes('day') ? 2 : 3;
        const timeB = b.postedDate.includes('now') ? 0 : b.postedDate.includes('hour') ? 1 : b.postedDate.includes('day') ? 2 : 3;
        return timeA - timeB;
      });
      break;
    case 'salaryHigh':
      results.sort((a, b) => {
        const numA = parseInt(a.salary.replace(/[^0-9]/g, '').substring(0,2)) || 0;
        const numB = parseInt(b.salary.replace(/[^0-9]/g, '').substring(0,2)) || 0;
        return numB - numA;
      });
      break;
    case 'salaryLow':
      results.sort((a, b) => {
        const numA = parseInt(a.salary.replace(/[^0-9]/g, '').substring(0,2)) || 0;
        const numB = parseInt(b.salary.replace(/[^0-9]/g, '').substring(0,2)) || 0;
        return numA - numB;
      });
      break;
    case 'alphabetical':
      results.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'relevance':
    default:
      if (searchTerm) {
        results.sort((a, b) => (b._relevanceScore || 0) - (a._relevanceScore || 0));
      } else {
        // Fallback to featured
        results.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      }
      break;
  }
  
  return results;
};

export const getRecommendedJobs = (jobs, profile) => {
  if (!profile || !profile.skills || profile.skills.length === 0) return jobs.slice(0, 4);

  const userSkills = profile.skills.map(s => s.toLowerCase());
  
  const scored = jobs
    .filter(job => job.status === 'Active' && job.moderationStatus === 'Approved')
    .map(job => {
      let score = 0;
      if (job.skills) {
        const jobSkills = job.skills.map(s => s.toLowerCase());
        userSkills.forEach(s => {
          if (jobSkills.includes(s)) score += 10;
        });
      }
      if (job.category === profile.title) score += 5;
      return { ...job, _recScore: score };
    })
    .filter(job => job._recScore > 0);

  scored.sort((a, b) => b._recScore - a._recScore);
  
  // Return top 4, fallback to random active if not enough matches
  if (scored.length >= 4) return scored.slice(0, 4);
  
  const remaining = jobs
    .filter(job => job.status === 'Active' && job.moderationStatus === 'Approved' && !scored.find(s => s.id === job.id))
    .slice(0, 4 - scored.length);
    
  return [...scored, ...remaining];
};
