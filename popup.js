// Job roles and their required skills
const jobRoles = {
    'Frontend Developer': ['HTML', 'CSS', 'JavaScript', 'React', 'Vue', 'Angular', 'Responsive Design', 'Version Control', 'Web Performance'],
    'Backend Developer': ['Python', 'Java', 'Node.js', 'SQL', 'NoSQL', 'RESTful APIs', 'Server Management', 'Authentication', 'Data Structures'],
    'Data Scientist': ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'Data Visualization', 'Big Data', 'Data Mining', 'Predictive Modeling'],
    'DevOps Engineer': ['Linux', 'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Infrastructure as Code', 'Monitoring', 'Scripting', 'Network Security'],
    'UX Designer': ['User Research', 'Wireframing', 'Prototyping', 'UI Design', 'Usability Testing', 'Information Architecture', 'Adobe XD', 'Sketch', 'Figma']
  };
  
  document.addEventListener('DOMContentLoaded', function() {
    const currentSkillInput = document.getElementById('currentSkill');
    const addCurrentSkillButton = document.getElementById('addCurrentSkill');
    const currentSkillsList = document.getElementById('currentSkillsList');
    const jobRoleSelect = document.getElementById('jobRoleSelect');
    const analyzeButton = document.getElementById('analyzeButton');
    const results = document.getElementById('results');
    const matchingSkills = document.getElementById('matchingSkills');
    const skillsToLearn = document.getElementById('skillsToLearn');
  
    let currentSkills = new Set();
  
    // Populate job role select
    for (let role in jobRoles) {
      let option = document.createElement('option');
      option.value = role;
      option.textContent = role;
      jobRoleSelect.appendChild(option);
    }
  
    function addSkill(skill) {
      skill = skill.trim();
      if (skill && !currentSkills.has(skill)) {
        currentSkills.add(skill);
        const li = document.createElement('li');
        li.innerHTML = `${skill} <i class="fas fa-times delete-skill"></i>`;
        currentSkillsList.appendChild(li);
        
        li.querySelector('.delete-skill').addEventListener('click', function() {
          currentSkills.delete(skill);
          li.remove();
        });
  
        return true;
      }
      return false;
    }
  
    currentSkillInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (addSkill(this.value)) {
          this.value = '';
        } else {
          shake(this);
        }
      }
    });
  
    addCurrentSkillButton.addEventListener('click', function() {
      if (addSkill(currentSkillInput.value)) {
        currentSkillInput.value = '';
      } else {
        shake(currentSkillInput);
      }
    });
  
    analyzeButton.addEventListener('click', function() {
      const selectedRole = jobRoleSelect.value;
      if (!selectedRole) {
        shake(jobRoleSelect);
        return;
      }
  
      const requiredSkills = new Set(jobRoles[selectedRole]);
      const matching = new Set([...currentSkills].filter(x => requiredSkills.has(x)));
      const toLearn = new Set([...requiredSkills].filter(x => !currentSkills.has(x)));
  
      matchingSkills.innerHTML = [...matching].map(skill => `<span class="skill-tag">${skill}</span>`).join(' ') || 'None';
      skillsToLearn.innerHTML = [...toLearn].map(skill => `<span class="skill-tag">${skill}</span>`).join(' ') || 'None';
  
      results.classList.remove('hidden');
      results.scrollIntoView({ behavior: 'smooth' });
    });
  
    function shake(element) {
      element.classList.add('shake');
      setTimeout(() => element.classList.remove('shake'), 500);
    }
  });