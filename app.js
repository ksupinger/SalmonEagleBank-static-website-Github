const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('nav');
menuButton.addEventListener('click',()=>{const expanded=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!expanded));nav.classList.toggle('open',!expanded)});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false')}));
const concepts={machine:{title:'A controller made for the machine.',description:'An illustrative concept for a dedicated controller that coordinates the signals and behavior of a specific machine. The design would begin with the actual application and operating requirements.',items:['Which inputs and outputs need to be coordinated?','What operating sequences should the controller manage?','What power, interface, and enclosure constraints apply?']},sensor:{title:'Turn measurements into useful information.',description:'An illustrative concept for electronics that gather readings from sensors and make them useful to the wider system. Sensor selection and controller requirements would depend on the application.',items:['What needs to be measured, and how often?','What should happen when a reading changes?','How should readings reach the operator or another system?']},connected:{title:'Create a connection with a purpose.',description:'An illustrative concept for custom electronics that help devices share information. The right interfaces and communication approach would be defined around the system requirements.',items:['Which devices need to exchange information?','What data needs to move between them?','What are the power, environment, and connectivity constraints?']}};
const dialog=document.querySelector('#project-dialog');
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{const concept=concepts[button.dataset.project];document.querySelector('#dialog-title').textContent=concept.title;document.querySelector('#dialog-description').textContent=concept.description;document.querySelector('#dialog-list').replaceChildren(...concept.items.map(text=>{const item=document.createElement('li');item.textContent=text;return item}));dialog.showModal()}));
document.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
document.querySelector('#dialog-contact').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const bounds=dialog.getBoundingClientRect();if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)dialog.close()}});
document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const button = event.currentTarget.querySelector('button[type=submit]');
  if (button.disabled) return;
  const fields = new FormData(event.currentTarget);
  const name = fields.get('name').trim();
  const email = fields.get('email').trim();
  const company = fields.get('company').trim();
  const message = fields.get('message').trim();
  if (!name || !message) {
    document.querySelector('#form-status').textContent = 'Enter your name and a message.';
    return;
  }
  const subject = 'Inquiry from BlueOceanIOT web site';
  const body = [
    'Name: ' + name,
    'Email: ' + email,
    ...(company ? ['Company: ' + company] : []),
    '',
    message.replace(/\r?\n/g, '\r\n'),
    '',
    'Thank you for your inquiry, we will respond as soon as possible. We appreciate your time',
  ].join('\r\n');
  const recipient = 'kevin@blueoceaniot.com';
  const draftUrl = 'mailto:' + recipient + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  document.querySelector('#form-status').textContent = 'Review and send the inquiry in your email app.';
  button.disabled = true;
  window.location.href = draftUrl;
});
document.querySelector('#year').textContent=new Date().getFullYear();
