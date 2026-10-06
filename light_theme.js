const fs = require('fs');

let hero = fs.readFileSync('components/Hero.jsx', 'utf8');

// 1. Change section background
hero = hero.replace('bg-[#212529] text-white', 'bg-[#f8f9fa] text-gray-900');

// 2. Titles and text
hero = hero.replace('text-white font-black tracking-tight', 'text-gray-900 font-black tracking-tight');
hero = hero.replace('text-white/75', 'text-gray-600');
hero = hero.replace('text-white/90', 'text-gray-800');
hero = hero.replace('text-white/30', 'text-gray-300');
hero = hero.replace('text-white/80 font-medium', 'text-gray-700 font-medium');

// 3. Carousel Buttons
hero = hero.replace(
  /'bg-white\/10 text-white\/80 border-white\/10 hover:bg-white\/20 hover:text-white'/g,
  "'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-900'"
);

// 4. Badges area
hero = hero.replace('border-t border-white/10', 'border-t border-gray-200');
hero = hero.replace('border-x border-white/10', 'border-x border-gray-200');
hero = hero.replace(/text-white">22 acres/g, 'text-gray-900">22 acres');
hero = hero.replace(/text-white">12 towers/g, 'text-gray-900">12 towers');
hero = hero.replace(/text-white">G\+29\/30/g, 'text-gray-900">G+29/30');
hero = hero.replace(/text-white\/60/g, 'text-gray-500');

// 5. Quick Specs Strip
hero = hero.replace(
  'bg-white sm:bg-white/5 border border-[#e5e7eb] sm:border-white/30 text-xs sm:text-sm shadow-lg w-full',
  'bg-white border border-gray-200 text-xs sm:text-sm shadow-sm w-full'
);
hero = hero.replace(/text-\[#666666\] sm:text-white\/60/g, 'text-gray-500');
hero = hero.replace(/text-\[#111111\] sm:text-white/g, 'text-gray-900');
hero = hero.replace(/border-\[#e5e7eb\] sm:border-white\/20/g, 'border-gray-200');
hero = hero.replace(/text-emerald-600 sm:text-emerald-400/g, 'text-emerald-600');

// 6. Form Container
hero = hero.replace(
  'bg-white sm:bg-[#212529]/95 backdrop-blur-md sm:backdrop-blur-xl border border-gray-200 sm:border-white/20 shadow-xl sm:shadow-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 relative overflow-hidden',
  'bg-white border border-gray-200 shadow-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 relative overflow-hidden'
);
hero = hero.replace(/text-\[#111111\] sm:text-white/g, 'text-gray-900');
hero = hero.replace(/text-\[#666666\] sm:text-white\/70/g, 'text-gray-600');
hero = hero.replace(/border-gray-200 sm:border-white\/10/g, 'border-gray-200');
hero = hero.replace(/text-\[#b87e00\] sm:text-\[#fed215\]/g, 'text-[#b87e00]');
hero = hero.replace(/text-\[#059669\] sm:text-emerald-400/g, 'text-emerald-600');

fs.writeFileSync('components/Hero.jsx', hero);

// Update LeadForm.jsx for light theme on all screens
let lead = fs.readFileSync('components/LeadForm.jsx', 'utf8');
lead = lead.replace(/text-\[#666666\] sm:text-white\/70/g, 'text-gray-600');
lead = lead.replace(/text-\[#111111\] sm:text-white/g, 'text-gray-900');
fs.writeFileSync('components/LeadForm.jsx', lead);

console.log('Light theme applied.');
