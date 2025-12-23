const fs = require('fs');
const path = require('path');

const services = [
  'babysitting', 'cleaning', 'gardening', 'petcare', 'tutoring', 'eldercare',
  'laundry', 'property_management', 'electrician', 'plumbing', 'air_conditioning',
  'gas_technician', 'drywall', 'carpentry', 'home_organization', 'event_entertainment',
  'private_chef', 'painting', 'waterproofing', 'contractor', 'aluminum', 'glass_works', 'locksmith'
];

const template = (serviceName) => `import React from 'react';

const ${capitalize(serviceName)}Form = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
  return (
    <div className="service-details-form">
      <h3>פרטי שירות ${serviceName}</h3>
      <p>טופס זמני - יושלם בקרוב</p>
    </div>
  );
};

export default ${capitalize(serviceName)}Form;
`;

function capitalize(str) {
  return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

services.forEach(service => {
  const dir = path.join(__dirname, 'src', 'components', 'services', service);
  const fileName = `${capitalize(service)}Form.jsx`;
  const filePath = path.join(dir, fileName);
  
  fs.writeFileSync(filePath, template(service));
  console.log(`✅ Créé: ${filePath}`);
});

console.log('\n🎉 23 formulaires créés !');