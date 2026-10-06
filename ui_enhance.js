const fs = require('fs');

let hero = fs.readFileSync('components/Hero.jsx', 'utf8');

// Badges improvement
// Icon 1
hero = hero.replace(
  '<div className="w-8 h-8 rounded-full border border-[#f5b800]/40 bg-[#f5b800]/20 flex items-center justify-center text-[#fed215] text-[12px] mb-1">',
  '<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#f5b800] bg-[#fff8e1] flex items-center justify-center text-[#b87e00] text-[13px] sm:text-[15px] mb-1.5 shadow-sm transition-transform hover:scale-110 duration-300">'
);
// Icon 2
hero = hero.replace(
  '<div className="w-8 h-8 rounded-full border border-[#f5b800]/40 bg-[#f5b800]/20 flex items-center justify-center text-[#fed215] text-[12px] mb-1">',
  '<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#f5b800] bg-[#fff8e1] flex items-center justify-center text-[#b87e00] text-[13px] sm:text-[15px] mb-1.5 shadow-sm transition-transform hover:scale-110 duration-300">'
);
// Icon 3
hero = hero.replace(
  '<div className="w-8 h-8 rounded-full border border-[#f5b800]/40 bg-[#f5b800]/20 flex items-center justify-center text-[#fed215] text-[12px] mb-1">',
  '<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#f5b800] bg-[#fff8e1] flex items-center justify-center text-[#b87e00] text-[13px] sm:text-[15px] mb-1.5 shadow-sm transition-transform hover:scale-110 duration-300">'
);

// Quick Specs Strip improvements
hero = hero.replace(
  'rounded-2xl bg-white border border-gray-200 text-xs sm:text-sm shadow-sm w-full',
  'rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 text-xs sm:text-sm shadow-[0_4px_20px_rgba(0,0,0,0.06)] w-full'
);
hero = hero.replace(
  /text-\[#666666\] sm:text-gray-500 text-\[9\.5px\] sm:text-\[10\.5px\] uppercase block mb-0\.5/g,
  'text-gray-500 font-bold tracking-wider text-[10px] sm:text-[11px] uppercase block mb-1'
);

// Price blink fix (blink-price was changing color to yellow, now it's just opacity so text-gray-900 will stay black)
hero = hero.replace(
  'text-[14.5px] sm:text-[19px]',
  'text-[15.5px] sm:text-[20px]' // slightly larger font for price
);

hero = hero.replace(
  'text-gray-900 font-bold text-[12px] sm:text-[14px]',
  'text-gray-900 font-black text-[13px] sm:text-[15px]' // slightly larger font for Typology
);
hero = hero.replace(
  'text-emerald-600 font-bold text-[12px] sm:text-[14px]',
  'text-emerald-600 font-black text-[13px] sm:text-[15px]' // slightly larger font for Status
);

// Tweak Borders in Quick Specs to be slightly darker gray
hero = hero.replace(
  'border-l border-gray-200 pl-2 sm:pl-4 lg:pl-5',
  'border-l border-gray-200 pl-3 sm:pl-5 lg:pl-6'
);
hero = hero.replace(
  'border-l border-gray-200 pl-2 sm:pl-4 lg:pl-5',
  'border-l border-gray-200 pl-3 sm:pl-5 lg:pl-6'
);

fs.writeFileSync('components/Hero.jsx', hero);
console.log('UI Improvements applied.');
