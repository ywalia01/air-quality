// Color palettes
let GOOD_COLORS = [
  'rgba(127, 255, 212, 0.8)',
  'rgba(47, 221, 163, 0.7)',
  'rgba(16, 236, 163, 1)',
  'rgba(14, 185, 128, 0.5)'
];
let MODERATE_COLORS = [
  'rgba(246, 225, 132, 0.8)',
  'rgba(221, 180, 47, 0,8)',
  'rgba(236, 196, 16, 1)',
  'rgba(185, 182, 14, 0.5)',
];
let BAD_COLORS = [
  'rgba(255, 195, 127, 0.8)',
  'rgba(221, 160, 47, 0.7)',
  'rgba(236, 141, 16, 1)',
  'rgba(185, 111, 14, 0.5)',
];
let UNHEALTHY_COLORS = [
  'rgba(255, 127, 127, 0.8)',
  'rgba(221, 47, 47, 0.7)',
  'rgba(236, 16, 16, 1)',
  'rgba(185, 14, 14, 0.5)'
];
let DANGEROUS_COLORS = [
  'rgba(251, 127, 255, 0.8)',
  'rgba(215, 47, 221, 0.7)',
  'rgba(187, 6, 133, 1)',
  'rgba(122, 6, 107, 0.5)'
];
let HAZARDOUS_COLORS = [
  'rgba(87, 42, 88, 0.8)',
  'rgba(79, 17, 82, 0.7)',
  'rgba(98, 4, 70, 1)',
  'rgba(70, 5, 61, 0.5)',
];

fetch('/api/v1/southSanFranciscoRecord').
  then(res => res.json()).
  then(res => renderPage(res)
  );

function renderPage(dataObj) {
  // Set PM2.5 value
  let particulateMatter = document.getElementById('particulate-matter-data');
  particulateMatter.textContent = dataObj.ParticulateMatter;

  // Set ozone value
  let ozoneData = document.getElementById('ozone-data');
  ozoneData.textContent = dataObj.Ozone;

  // Set area name
  let area = document.getElementById('area');
  area.textContent = dataObj.ReportingArea;

  // Set air quality status
  setStatus(dataObj.ParticulateMatter)
}

function setStatus(particulateMatter) {
  let statusData;
  let colorPalette;

  if (particulateMatter <= 12.0) {
    loadParticles('good_particles.json');
    statusData = 'good';
    colorPalette = GOOD_COLORS;
  } else if (particulateMatter > 12.0 && particulateMatter <= 35.4) {
    loadParticles('moderate_particles.json');
    statusData = 'moderate';
    colorPalette = MODERATE_COLORS;
  } else if (particulateMatter > 35 && particulateMatter <= 55.4) {
    loadParticles('bad_particles.json');
    statusData = 'bad';
    colorPalette = BAD_COLORS;
  } else if (particulateMatter > 55.4 && particulateMatter <= 150.4) {
    loadParticles('unhealthy_particles.json');
    statusData = 'unhealthy';
    colorPalette = UNHEALTHY_COLORS;
  } else if (particulateMatter > 150.4 && particulateMatter <= 250.4) {
    loadParticles('dangerous_particles.json');
    statusData = 'dangerous';
    colorPalette = DANGEROUS_COLORS;
  } else if (particulateMatter > 250.5) {
    loadParticles('hazardous_particles.json');
    statusData = 'hazardous';
    colorPalette = HAZARDOUS_COLORS;
  };
  
  let status = document.getElementById('status');
  status.textContent = statusData;

  // Pick palette for the page
  setColorPalette(colorPalette);
}

function setColorPalette(palette) {
  let circle = document.getElementById('circle');
  let circle2 = document.getElementById('circle2');
  let circle3 = document.getElementById('circle3');
  let circle4 = document.getElementById('circle4');
  let circles = [circle, circle2, circle3, circle4];
  circles.forEach((circle, i) => circle.setAttribute('style', `background-color: ${palette[i]}`));
  let area = document.getElementById('area');
  // Change color of area to match palette
  area.setAttribute('style', `color: ${palette[2]}`)
}

function loadParticles(JSONparticleToLoad) {
  // Loades particles(dust json file)
  particlesJS.load('particles-js', `particles/${JSONparticleToLoad}`)
};